// The animation engine. Segments are generator functions yielding timed
// steps; the engine advances the current step each animation frame. All
// positional state is stored in layout-independent terms (named anchors,
// normalized offsets, width fractions) so a breakpoint switch mid-segment
// re-resolves every position against the new layout with no visible jump.

import {
  CodeModel,
  MIN_LINES,
  MAX_LINES,
  Snapshot,
  pickColor,
  randTokenWidth,
  rand,
  randInt,
  clamp,
} from "./code";

export type AnchorName = "keyboard" | "mouse" | "mugRest" | "mouth";
export type HandPose = "relaxed" | "relaxed2" | "grip";

export interface Ctx {
  hand: { from: AnchorName; to: AnchorName; t: number };
  pose: HandPose;
  mugHeld: boolean;
  mugTilt: number; // degrees, negative tips the mug toward the head
  mouseOffset: number; // -1..1, persists between segments
  phase: number; // running clock for the idle body bob
  keyPulse: number; // ms since the last keystroke
  armVis: number; // 0..1, the forearm+hand fade out while typing at the keyboard
  typeLevel: number; // 0..1, eases up while typing; drives a slow arm sway
}

interface Step {
  d: number;
  u?: (p: number) => void;
}

type Seg = Generator<Step, void, unknown>;

const easeInOut = (t: number) => t * t * (3 - 2 * t);

function* wait(ms: number): Seg {
  yield { d: ms };
}

function* tween(ms: number, fn: (t: number) => void): Seg {
  yield { d: ms, u: (p) => fn(easeInOut(p)) };
}

function* moveHand(a: Animator, to: AnchorName, ms: number): Seg {
  a.ctx.hand = { from: a.ctx.hand.to, to, t: 0 };
  yield* tween(ms, (t) => {
    a.ctx.hand.t = t;
  });
}

/** Step the text cursor row-by-row toward a target line (arrow-key style). */
function* navCursor(a: Animator, row: number): Seg {
  row = clamp(row, 0, a.code.lines.length - 1);
  while (a.code.cursor.row !== row) {
    const dir = Math.sign(row - a.code.cursor.row);
    a.code.cursorToRow(a.code.cursor.row + dir);
    a.emit();
    yield { d: rand(120, 180) };
  }
  yield { d: rand(300, 600) };
}

function* keystroke(a: Animator, minMs = 140, maxMs = 260): Seg {
  a.key();
  a.emit();
  yield { d: rand(minMs, maxMs) };
}

// ---------------------------------------------------------------- segments

function* segDrinkCoffee(a: Animator): Seg {
  yield* wait(rand(500, 1100));
  a.ctx.pose = "relaxed2";
  yield* moveHand(a, "mugRest", rand(850, 1050));
  a.ctx.pose = "grip";
  yield* wait(200);
  a.ctx.mugHeld = true;
  yield* moveHand(a, "mouth", rand(950, 1150));
  yield* tween(450, (t) => {
    a.ctx.mugTilt = -26 * t;
  });
  yield* wait(rand(650, 1100));
  yield* tween(450, (t) => {
    a.ctx.mugTilt = -26 * (1 - t);
  });
  yield* wait(220);
  yield* moveHand(a, "mugRest", rand(950, 1150));
  a.ctx.mugHeld = false;
  a.ctx.mugTilt = 0;
  yield* wait(200);
  a.ctx.pose = "relaxed2";
  yield* moveHand(a, "keyboard", rand(800, 1000));
  a.ctx.pose = "relaxed";
}

function* segMouse(a: Animator): Seg {
  yield* wait(rand(450, 1000));
  a.ctx.pose = "relaxed2";
  yield* moveHand(a, "mouse", rand(700, 900));
  a.ctx.pose = "relaxed";
  yield* wait(rand(150, 350));
  const moves = randInt(1, 2);
  for (let m = 0; m < moves; m++) {
    const start = a.ctx.mouseOffset;
    let target = rand(-1, 1);
    if (Math.abs(target - start) < 0.35) {
      target = clamp(start + (target > start ? 0.5 : -0.5), -1, 1);
    }
    const startRow = a.code.cursor.row;
    const dur = 600 + Math.abs(target - start) * 950;
    yield {
      d: dur,
      u: (p) => {
        const t = easeInOut(p);
        a.ctx.mouseOffset = start + (target - start) * t;
        // The on-screen cursor tracks the mouse: pushing the mouse forward
        // (offset -> +1) moves the cursor up the file.
        const row = clamp(
          Math.round(startRow - (a.ctx.mouseOffset - start) * 4),
          0,
          a.code.lines.length - 1
        );
        if (row !== a.code.cursor.row) {
          a.code.cursorToRow(row);
          a.emit();
        }
      },
    };
    yield* wait(rand(250, 600));
  }
  a.ctx.pose = "relaxed2";
  yield* moveHand(a, "keyboard", rand(700, 900));
  a.ctx.pose = "relaxed";
}

function* segDeleteLines(a: Animator): Seg {
  yield* wait(rand(350, 900));
  const n = a.code.lines.length;
  const count = clamp(randInt(1, 5), 1, n - MIN_LINES);
  const start = randInt(0, n - count - 1);
  yield* navCursor(a, start);
  for (let k = 0; k < count; k++) {
    a.code.cursorToRow(start);
    a.emit();
    // hold backspace: tokens melt away right-to-left
    while (a.code.lines[start].tokens.length > 0) {
      a.code.backspaceChunk(start, rand(0.02, 0.05));
      yield* keystroke(a, 110, 180);
    }
    yield* wait(rand(150, 300));
    a.code.removeLine(start);
    yield* keystroke(a, 200, 320);
  }
  yield* wait(rand(250, 500));
}

function* segAddLines(a: Animator): Seg {
  yield* wait(rand(350, 900));
  const n = a.code.lines.length;
  const count = clamp(randInt(1, 5), 1, MAX_LINES - n);
  let at = randInt(0, n - 1);
  yield* navCursor(a, at);
  for (let k = 0; k < count; k++) {
    const base = a.code.lines[at].indent;
    const roll = Math.random();
    const indent = clamp(base + (roll < 0.3 ? 1 : roll < 0.5 ? -1 : 0), 0, 3);
    a.code.insertLine(at + 1, indent);
    at += 1;
    yield* keystroke(a, 320, 500); // the Enter key
    const tokens = randInt(1, 4);
    for (let j = 0; j < tokens; j++) {
      const room = a.code.roomFor(at, a.code.lines[at].tokens.length);
      if (room < 0.07) break;
      const target = Math.min(randTokenWidth(), room - 0.01);
      a.code.startToken(at, pickColor(j === 0));
      yield* keystroke(a);
      while (a.code.lastTokenWidth(at) < target) {
        a.code.growLastToken(at, rand(0.018, 0.04), target);
        yield* keystroke(a);
      }
      yield* wait(rand(140, 320)); // the space between words
    }
    yield* wait(rand(250, 550));
  }
}

function* segEditCode(a: Animator): Seg {
  yield* wait(rand(350, 900));
  const edits = randInt(1, 3);
  for (let e = 0; e < edits; e++) {
    const candidates = a.code.lines
      .map((l, i) => ({ l, i }))
      .filter(({ l }) => l.tokens.length >= 1);
    if (candidates.length === 0) return;
    const { i: row } = candidates[randInt(0, candidates.length - 1)];
    yield* navCursor(a, row);
    const idx = randInt(0, a.code.lines[row].tokens.length - 1);
    a.code.cursorToTokenEnd(row, idx);
    a.emit();
    yield* wait(rand(250, 500));
    // erase the token...
    while (a.code.shrinkTokenAt(row, idx, rand(0.02, 0.045)) > 0.006) {
      yield* keystroke(a, 110, 180);
    }
    yield* wait(rand(220, 420));
    // ...and retype it in a new color at a new width
    a.code.recolorToken(row, idx, pickColor(idx === 0));
    const room = a.code.roomFor(row, idx);
    const target = clamp(randTokenWidth(), 0.05, Math.max(0.05, room));
    while (a.code.growTokenAt(row, idx, rand(0.018, 0.04), target) < target) {
      yield* keystroke(a);
    }
    yield* wait(rand(300, 650));
  }
}

// ---------------------------------------------------------------- engine

type SegKey = "drink" | "mouse" | "del" | "add" | "edit";

const SEGMENTS: Record<SegKey, (a: Animator) => Seg> = {
  drink: segDrinkCoffee,
  mouse: segMouse,
  del: segDeleteLines,
  add: segAddLines,
  edit: segEditCode,
};

export class Animator {
  ctx: Ctx = {
    hand: { from: "keyboard", to: "keyboard", t: 1 },
    pose: "relaxed",
    mugHeld: false,
    mugTilt: 0,
    mouseOffset: 0,
    phase: 0,
    keyPulse: 9999,
    armVis: 0,
    typeLevel: 0,
  };
  code = new CodeModel();

  private gen: Seg | null = null;
  private step: Step | null = null;
  private elapsed = 0;
  private lastSeg: SegKey | null = null;

  /** `forceFirst` (debug aid) plays a given segment first, e.g. "drink". */
  constructor(
    private onCode: (s: Snapshot) => void,
    private forceFirst: SegKey | null = null
  ) {}

  emit() {
    this.onCode(this.code.snapshot());
  }

  key() {
    this.ctx.keyPulse = 0;
  }

  tick(dt: number) {
    this.ctx.phase += dt;
    this.ctx.keyPulse += dt;
    // The lower arm + hand are only shown while reaching for (or using) the
    // mouse and mug; at the keyboard they tuck away behind the desk.
    const atKeyboard =
      this.ctx.hand.to === "keyboard" && (this.ctx.hand.from === "keyboard" || this.ctx.hand.t >= 1);
    const visTarget = atKeyboard ? 0 : 1;
    this.ctx.armVis += (visTarget - this.ctx.armVis) * Math.min(1, dt / 160);
    // Typing "activity" ramps up and down slowly; the renderer sways the
    // arms from this rather than bouncing them on every keystroke.
    const typeTarget = atKeyboard && this.ctx.keyPulse < 600 ? 1 : 0;
    this.ctx.typeLevel += (typeTarget - this.ctx.typeLevel) * Math.min(1, dt / 450);
    let guard = 0;
    let remaining = dt;
    while (guard++ < 40) {
      if (!this.step) {
        if (!this.gen) this.gen = this.nextSegment();
        const n = this.gen.next();
        if (n.done) {
          this.gen = null;
          continue;
        }
        this.step = n.value;
        this.elapsed = 0;
        if (this.step.d <= 0) {
          this.step.u?.(1);
          this.step = null;
          continue;
        }
      }
      if (remaining <= 0) break;
      this.elapsed += remaining;
      remaining = 0;
      const p = Math.min(1, this.elapsed / this.step.d);
      this.step.u?.(p);
      if (p >= 1) this.step = null;
      else break;
    }
  }

  private nextSegment(): Seg {
    if (this.forceFirst) {
      const key = this.forceFirst;
      this.forceFirst = null;
      this.lastSeg = key;
      return SEGMENTS[key](this);
    }
    const n = this.code.lines.length;
    const opts: [SegKey, number][] = [];
    opts.push(["drink", this.lastSeg === "drink" ? 0 : 1.2]);
    opts.push(["mouse", this.lastSeg === "mouse" ? 0.4 : 2]);
    if (n > MIN_LINES) opts.push(["del", this.lastSeg === "del" ? 1.2 : 2.6]);
    if (n < MAX_LINES) opts.push(["add", this.lastSeg === "add" ? 1.2 : 2.6]);
    opts.push(["edit", this.lastSeg === "edit" ? 1.2 : 2.6]);
    let total = 0;
    for (const [, w] of opts) total += w;
    let r = Math.random() * total;
    let key: SegKey = "edit";
    for (const [k, w] of opts) {
      r -= w;
      if (r <= 0) {
        key = k;
        break;
      }
    }
    this.lastSeg = key;
    return SEGMENTS[key](this);
  }
}
