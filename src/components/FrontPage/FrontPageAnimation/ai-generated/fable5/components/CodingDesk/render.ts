// Per-frame imperative rendering: resolves the hand's anchor positions
// against the current layout, solves a 2-bone IK for the right arm, and
// writes SVG transforms directly (bypassing React for the 60fps parts).

import { Ctx, AnchorName, HandPose } from "./animator";
import { Layout, ASSETS } from "./layouts";

export interface FrameRefs {
  body?: SVGGElement | null;
  armL?: SVGImageElement | null;
  armRU?: SVGImageElement | null;
  armRL?: SVGImageElement | null;
  hand?: SVGImageElement | null;
  mug?: SVGImageElement | null;
  mouse?: SVGImageElement | null;
}

interface Pt {
  x: number;
  y: number;
}

// Bone endpoints inside the arm images, in image pixel coordinates.
const UPPER_ANCHOR: Pt = { x: 14, y: 10 };
const UPPER_TIP: Pt = { x: 52, y: 62 };
const UPPER_BASE_DEG =
  (Math.atan2(UPPER_TIP.y - UPPER_ANCHOR.y, UPPER_TIP.x - UPPER_ANCHOR.x) * 180) / Math.PI;
const UPPER_BONE_LEN = Math.hypot(UPPER_TIP.x - UPPER_ANCHOR.x, UPPER_TIP.y - UPPER_ANCHOR.y);
const LOWER_ANCHOR: Pt = { x: 5, y: 13 };
const LOWER_BONE_LEN = 36;

const MUG_HANDLE: Pt = { x: 7, y: 24 }; // grab point inside coffee_mug.png
const MOUSE_GRIP: Pt = { x: 16, y: 8 }; // where the hand sits on mouse.png

const HAND_IMAGES: Record<
  HandPose,
  { href: string; ax: number; ay: number; w: number; h: number }
> = {
  relaxed: { href: ASSETS.handRelaxed, ax: 20, ay: 12, w: 40, h: 32 },
  relaxed2: { href: ASSETS.handRelaxed2, ax: 12, ay: 14, w: 23, h: 27 },
  grip: { href: ASSETS.handGrip, ax: 11, ay: 16, w: 22, h: 36 },
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function mousePos(ctx: Ctx, L: Layout): Pt {
  return {
    x: L.mouse.x + ctx.mouseOffset * L.mouse.travelX,
    y: L.mouse.y + ctx.mouseOffset * L.mouse.travelY,
  };
}

function resolveAnchor(name: AnchorName, ctx: Ctx, L: Layout, bob: number): Pt {
  switch (name) {
    case "keyboard":
      return { x: L.handRest.x, y: L.handRest.y };
    case "mouse": {
      const m = mousePos(ctx, L);
      return { x: m.x + MOUSE_GRIP.x * L.mouse.s, y: m.y + MOUSE_GRIP.y * L.mouse.s };
    }
    case "mugRest":
      return { x: L.mug.x + MUG_HANDLE.x * L.mug.s, y: L.mug.y + MUG_HANDLE.y * L.mug.s };
    case "mouth":
      return { x: L.mouth.x, y: L.mouth.y - bob };
  }
}

function solveArm(S: Pt, H: Pt, L1: number, L2: number) {
  const dx = H.x - S.x;
  const dy = H.y - S.y;
  let d = Math.hypot(dx, dy);
  // Uniform stretch when the target is slightly out of reach (the art is
  // blobby enough that a mild scale-up reads as a lean, not a distortion).
  const k = clamp(d / (L1 + L2), 1, 1.28);
  const l1 = L1 * k;
  const l2 = L2 * k;
  d = clamp(d, Math.abs(l1 - l2) + 0.5, (l1 + l2) * 0.999);
  const cos = clamp((d * d + l1 * l1 - l2 * l2) / (2 * d * l1), -1, 1);
  const a = Math.acos(cos);
  const base = Math.atan2(dy, dx);
  // elbow on the clockwise side of the shoulder->hand chord (hangs down for
  // side reaches, swings right when reaching up toward the face)
  const ea = base + a;
  const E: Pt = { x: S.x + Math.cos(ea) * l1, y: S.y + Math.sin(ea) * l1 };
  return { E, k };
}

export function renderFrame(ctx: Ctx, L: Layout, refs: FrameRefs) {
  // breathing: one smooth rise-and-fall, then a rest before the next breath
  const BREATH_PERIOD = 3800;
  const BREATH_ACTIVE = 2100;
  const bt = ctx.phase % BREATH_PERIOD;
  const bob = bt < BREATH_ACTIVE ? Math.sin((Math.PI * bt) / BREATH_ACTIVE) ** 2 * 1.6 : 0;

  refs.body?.setAttribute("transform", `translate(0 ${(-bob).toFixed(2)})`);

  // While typing the arms sway slowly and subtly — deliberately NOT synced
  // to individual keystrokes or cursor moves.
  const sway = ctx.typeLevel * Math.sin((ctx.phase / 1300) * Math.PI * 2) * 0.8;

  // left arm: parked by the keyboard
  if (refs.armL) {
    const p = L.parts.armL;
    refs.armL.setAttribute(
      "transform",
      `translate(${p.x} ${(p.y - bob * 0.7 + sway).toFixed(2)}) rotate(${p.rot}) scale(${p.s}) translate(-50 -10)`
    );
  }

  // resolve the right hand between its two anchors
  const from = resolveAnchor(ctx.hand.from, ctx, L, bob);
  const to = resolveAnchor(ctx.hand.to, ctx, L, bob);
  const t = ctx.hand.t;
  const traveling = ctx.hand.from !== ctx.hand.to && t < 1;
  const H: Pt = {
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t - (traveling ? Math.sin(Math.PI * t) * L.arc : 0),
  };
  H.y += sway * 0.7;

  // shoulder leans a little toward far targets
  const S: Pt = { x: L.shoulderR.x, y: L.shoulderR.y - bob };
  const reach = Math.hypot(H.x - S.x, H.y - S.y);
  const L1 = UPPER_BONE_LEN * L.armUpperS;
  const L2 = LOWER_BONE_LEN * L.armLowerS;
  const lean = clamp((reach - (L1 + L2)) * 0.35, 0, 10);
  S.x += Math.sign(H.x - S.x) * lean;

  const { E, k } = solveArm(S, H, L1, L2);

  if (refs.armRU) {
    const deg = (Math.atan2(E.y - S.y, E.x - S.x) * 180) / Math.PI;
    refs.armRU.setAttribute(
      "transform",
      `translate(${S.x.toFixed(2)} ${S.y.toFixed(2)}) rotate(${(deg - UPPER_BASE_DEG).toFixed(2)}) scale(${(
        L.armUpperS * k
      ).toFixed(3)}) translate(${-UPPER_ANCHOR.x} ${-UPPER_ANCHOR.y})`
    );
  }
  if (refs.armRL) {
    refs.armRL.setAttribute("opacity", ctx.armVis.toFixed(3));
    const deg = (Math.atan2(H.y - E.y, H.x - E.x) * 180) / Math.PI;
    refs.armRL.setAttribute(
      "transform",
      `translate(${E.x.toFixed(2)} ${E.y.toFixed(2)}) rotate(${deg.toFixed(2)}) scale(${(
        L.armLowerS * k
      ).toFixed(3)}) translate(${-LOWER_ANCHOR.x} ${-LOWER_ANCHOR.y})`
    );
  }

  // mug: either resting on the desk or hanging off the hand
  if (refs.mug) {
    if (ctx.mugHeld) {
      refs.mug.setAttribute(
        "transform",
        `translate(${H.x.toFixed(2)} ${H.y.toFixed(2)}) rotate(${ctx.mugTilt.toFixed(2)}) scale(${
          L.mug.s
        }) translate(${-MUG_HANDLE.x} ${-MUG_HANDLE.y})`
      );
    } else {
      refs.mug.setAttribute("transform", `translate(${L.mug.x} ${L.mug.y}) scale(${L.mug.s})`);
    }
  }

  if (refs.mouse) {
    const m = mousePos(ctx, L);
    refs.mouse.setAttribute(
      "transform",
      `translate(${m.x.toFixed(2)} ${m.y.toFixed(2)}) scale(${L.mouse.s})`
    );
  }

  if (refs.hand) {
    refs.hand.setAttribute("opacity", ctx.armVis.toFixed(3));
    const img = HAND_IMAGES[ctx.pose];
    if (refs.hand.getAttribute("href") !== img.href) {
      refs.hand.setAttribute("href", img.href);
      refs.hand.setAttribute("width", String(img.w));
      refs.hand.setAttribute("height", String(img.h));
    }
    const rot = ctx.mugHeld ? ctx.mugTilt : 0;
    refs.hand.setAttribute(
      "transform",
      `translate(${H.x.toFixed(2)} ${H.y.toFixed(2)}) rotate(${rot.toFixed(2)}) scale(${
        L.handS
      }) translate(${-img.ax} ${-img.ay})`
    );
  }
}
