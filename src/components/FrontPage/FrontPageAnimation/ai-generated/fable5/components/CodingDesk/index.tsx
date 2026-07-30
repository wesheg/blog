"use client";

// An infinitely looping animation of a character writing code at a desk.
// The scene is a single SVG in the background image's native pixel space,
// so it scales seamlessly with the container. Code pills and the text
// cursor are React-rendered; the arm/mug/mouse motion is written
// imperatively at 60fps via renderFrame.

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Animator } from "./animator";
import { GAP, INDENT, Snapshot, ColorKey } from "./code";
import { LAYOUTS, ASSETS, SIZES, Layout, Placement } from "./layouts";
import { renderFrame, FrameRefs } from "./render";
import styles from "./CodingDesk.module.css";
import "../../code-colors.css";

const COLOR_VARS: Record<ColorKey, string> = {
  yellow: "var(--yellow, #ffe800)",
  pink: "var(--pink, #dc1d88)",
  purple: "var(--purple, #b779ff)",
  blue: "var(--blue, #1fd7f0)",
  green: "var(--green, #5fc323)",
};

function Part({ p, href, size }: { p: Placement; href: string; size: [number, number] }) {
  return (
    <image
      href={href}
      x={0}
      y={0}
      width={size[0]}
      height={size[1]}
      transform={`translate(${p.x} ${p.y}) scale(${p.s})`}
    />
  );
}

export interface CodingDeskProps {
  /** Always render the small-screen (mobile) styling, regardless of the
   *  actual viewport width. The scene targets 400px wide in this mode and
   *  scales down with containers narrower than that. */
  forceMobile?: boolean;
}

export default function CodingDesk({ forceMobile = false }: CodingDeskProps) {
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile" | null>(null);
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const animRef = useRef<Animator | null>(null);
  const layoutRef = useRef<Layout | null>(null);
  const refs = useRef<FrameRefs>({});
  const clipId = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  useEffect(() => {
    const update = () => setViewportMode(window.innerWidth < 1000 ? "mobile" : "desktop");
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const mode = forceMobile ? "mobile" : viewportMode;
  const forcedClass = forceMobile ? styles.forced : "";

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get("seg");
    const a = new Animator(
      setSnap,
      forced === "drink" || forced === "mouse" || forced === "del" || forced === "add" || forced === "edit"
        ? forced
        : null
    );
    animRef.current = a;
    a.emit();
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      a.tick(dt);
      if (layoutRef.current) renderFrame(a.ctx, layoutRef.current, refs.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Repaint the imperative parts synchronously when the breakpoint flips so
  // the mug/mouse/arm never flash at the previous layout's coordinates.
  useLayoutEffect(() => {
    if (animRef.current && layoutRef.current) {
      renderFrame(animRef.current.ctx, layoutRef.current, refs.current);
    }
  }, [mode]);

  if (!mode || !snap)
    return <div className={`component-root ${styles.root} ${forcedClass}`} aria-hidden />;

  const L = LAYOUTS[mode];
  layoutRef.current = L;
  const sc = L.screen;
  const cw = sc.contentW;

  const pills: React.ReactNode[] = [];
  const visible = Math.min(snap.lines.length, sc.rows);
  for (let i = 0; i < visible; i++) {
    const line = snap.lines[i];
    const y = sc.row0 + i * sc.rowH - sc.pillH / 2;
    let x = sc.contentX + line.indent * INDENT * cw;
    line.tokens.forEach((tok, j) => {
      const w = Math.max(tok.w * cw, 1.6);
      pills.push(
        <rect
          key={`${i}-${j}`}
          x={x}
          y={y}
          width={w}
          height={sc.pillH}
          rx={sc.pillH / 2}
          fill={COLOR_VARS[tok.c]}
        />
      );
      x += w + GAP * cw;
    });
  }

  const cursorRow = Math.min(snap.cursor.row, sc.rows - 1);
  const cursorX = sc.contentX + snap.cursor.xFrac * cw;
  const cursorY = sc.row0 + cursorRow * sc.rowH - (sc.pillH + 1.4) / 2;

  const P = L.parts;
  const off = "translate(-9999 -9999)";

  return (
    <div className={`component-root ${styles.root} ${styles[mode]} ${forcedClass}`}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${L.w} ${L.h}`}
        role="img"
        aria-label="Animated character sitting at a desk writing code"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={sc.clipX} y={sc.clipY} width={sc.clipW} height={sc.clipH} rx={3} />
          </clipPath>
        </defs>

        <image href={L.bg} x={0} y={0} width={L.w} height={L.h} />

        {/* code on the monitor */}
        <g clipPath={`url(#${clipId})`}>
          {pills}
          <rect
            className={styles.cursor}
            x={cursorX}
            y={cursorY}
            width={sc.cursorW}
            height={sc.pillH + 1.4}
            fill="var(--cursor-orange, #f15a24)"
          />
        </g>

        {/* mouse sits on the desk, under the character's hand */}
        <image ref={(el) => void (refs.current.mouse = el)} href={ASSETS.mouse} width={SIZES.mouse[0]} height={SIZES.mouse[1]} transform={off} />

        {/* the character, back to front: body, legs, hand under lower arm
            under upper arm, then the mug, with the chair as the top layer */}
        <g ref={(el) => void (refs.current.body = el)}>
          <Part p={P.head} href={ASSETS.head} size={SIZES.head} />
          <Part p={P.torso} href={ASSETS.torso} size={SIZES.torso} />
          <Part p={P.hood} href={ASSETS.hood} size={SIZES.hood} />
        </g>
        <Part p={P.legL} href={ASSETS.legL} size={SIZES.legL} />
        <Part p={P.legR} href={ASSETS.legR} size={SIZES.legR} />
        <Part p={P.shoeL} href={ASSETS.shoeL} size={SIZES.shoeL} />
        <Part p={P.shoeR} href={ASSETS.shoeR} size={SIZES.shoeR} />

        <image ref={(el) => void (refs.current.hand = el)} href={ASSETS.handRelaxed} width={40} height={32} transform={off} />
        <image ref={(el) => void (refs.current.armRL = el)} href={ASSETS.armRL} width={SIZES.armRL[0]} height={SIZES.armRL[1]} transform={off} />
        <image ref={(el) => void (refs.current.armRU = el)} href={ASSETS.armRU} width={SIZES.armRU[0]} height={SIZES.armRU[1]} transform={off} />
        <image ref={(el) => void (refs.current.armL = el)} href={ASSETS.armL} width={SIZES.armL[0]} height={SIZES.armL[1]} transform={off} />

        <image ref={(el) => void (refs.current.mug = el)} href={ASSETS.mug} width={SIZES.mug[0]} height={SIZES.mug[1]} transform={off} />

        <Part p={P.chair} href={ASSETS.chair} size={SIZES.chair} />
      </svg>
    </div>
  );
}
