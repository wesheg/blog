// Scene coordinates for the two backgrounds. All values are in the native
// pixel space of the corresponding background image; the SVG viewBox scales
// the whole scene to the container, so the animation is resolution
// independent. Screen rectangles and code-row positions were measured from
// the background PNGs so pills line up with the baked-in line numbers.

import bgDesktop from "../../static/static-layer-desktop.png";
import bgMobile from "../../static/static-layer-mobile.png";
import chairImg from "../../static/chair.png";
import torsoImg from "../../static/torso.png";
import headImg from "../../static/head.png";
import hoodImg from "../../static/hood.png";
import legLImg from "../../static/lower_left_leg.png";
import legRImg from "../../static/lower_right_leg.png";
import shoeLImg from "../../static/left_shoe.png";
import shoeRImg from "../../static/right_shoe.png";
import armLImg from "../../static/upper-left-arm.png";
import armRUImg from "../../static/upper_right_arm.png";
import armRLImg from "../../static/lower_right_arm.png";
import mugImg from "../../static/coffee_mug.png";
import mouseImg from "../../static/mouse.png";
import handRelaxedImg from "../../static/right_hand_relaxed.png";
import handRelaxed2Img from "../../static/right_hand_relaxed_2.png";
import handGripImg from "../../static/right_hand_grip.png";
import fistImg from "../../static/right_fist.png";

// Static image imports resolve to a URL string in plain bundlers and to a
// StaticImageData object under Next.js / @storybook/nextjs-vite.
const src = (m: string | { src: string }): string =>
  typeof m === "string" ? m : m.src;

export interface Placement {
  x: number;
  y: number;
  s: number;
}

export interface Layout {
  id: "desktop" | "mobile";
  w: number;
  h: number;
  bg: string;
  screen: {
    clipX: number;
    clipY: number;
    clipW: number;
    clipH: number;
    contentX: number;
    contentW: number;
    row0: number; // center y of the first code row
    rowH: number;
    rows: number;
    pillH: number;
    cursorW: number;
  };
  mug: Placement;
  mouse: Placement & { travelX: number; travelY: number };
  handRest: { x: number; y: number };
  shoulderR: { x: number; y: number };
  mouth: { x: number; y: number };
  arc: number; // how high the hand lifts while traveling between anchors
  armUpperS: number;
  armLowerS: number;
  handS: number;
  parts: {
    chair: Placement;
    torso: Placement;
    head: Placement;
    hood: Placement;
    legL: Placement;
    legR: Placement;
    shoeL: Placement;
    shoeR: Placement;
    armL: Placement & { rot: number };
  };
}

export const LAYOUTS: Record<"desktop" | "mobile", Layout> = {
  desktop: {
    id: "desktop",
    w: 856,
    h: 561,
    bg: src(bgDesktop),
    screen: {
      clipX: 77,
      clipY: 203,
      clipW: 262,
      clipH: 157,
      contentX: 112,
      contentW: 218,
      row0: 214,
      rowH: 15,
      rows: 10,
      pillH: 10,
      cursorW: 4,
    },
    mug: { x: 272, y: 384, s: 0.66 },
    mouse: { x: 243, y: 392, s: 0.6, travelX: 2, travelY: -9 },
    handRest: { x: 214, y: 405 },
    shoulderR: { x: 195, y: 398 },
    mouth: { x: 197, y: 332 },
    arc: 13,
    armUpperS: 0.66,
    armLowerS: 0.9,
    handS: 0.6,
    parts: {
      chair: { x: 118, y: 368, s: 0.38 },
      torso: { x: 133, y: 382, s: 0.68 },
      head: { x: 136, y: 278, s: 0.64 },
      hood: { x: 137, y: 389, s: 0.7 },
      legL: { x: 145, y: 476, s: 0.55 },
      legR: { x: 171, y: 474, s: 0.55 },
      shoeL: { x: 143, y: 508, s: 0.55 },
      shoeR: { x: 173, y: 506, s: 0.55 },
      armL: { x: 137, y: 396, s: 0.52, rot: -20 },
    },
  },
  mobile: {
    id: "mobile",
    w: 346,
    h: 376,
    bg: src(bgMobile),
    screen: {
      clipX: 61,
      clipY: 40,
      clipW: 212,
      clipH: 126,
      contentX: 90,
      contentW: 176,
      row0: 48,
      rowH: 12,
      rows: 10,
      pillH: 8,
      cursorW: 3.2,
    },
    mug: { x: 246, y: 176, s: 0.55 },
    mouse: { x: 216, y: 196, s: 0.5, travelX: 1.5, travelY: -7 },
    handRest: { x: 198, y: 212 },
    shoulderR: { x: 196, y: 188 },
    mouth: { x: 197, y: 146 },
    arc: 9,
    armUpperS: 0.58,
    armLowerS: 0.8,
    handS: 0.5,
    parts: {
      chair: { x: 123, y: 172, s: 0.4 },
      torso: { x: 134, y: 170, s: 0.78 },
      head: { x: 142, y: 62, s: 0.66 },
      hood: { x: 143, y: 162, s: 0.72 },
      legL: { x: 152, y: 288, s: 0.5 },
      legR: { x: 176, y: 286, s: 0.5 },
      shoeL: { x: 150, y: 318, s: 0.5 },
      shoeR: { x: 178, y: 316, s: 0.5 },
      armL: { x: 140, y: 184, s: 0.6, rot: -20 },
    },
  },
};

export const ASSETS = {
  chair: src(chairImg),
  torso: src(torsoImg),
  head: src(headImg),
  hood: src(hoodImg),
  legL: src(legLImg),
  legR: src(legRImg),
  shoeL: src(shoeLImg),
  shoeR: src(shoeRImg),
  armL: src(armLImg),
  armRU: src(armRUImg),
  armRL: src(armRLImg),
  mug: src(mugImg),
  mouse: src(mouseImg),
  handRelaxed: src(handRelaxedImg),
  handRelaxed2: src(handRelaxed2Img),
  handGrip: src(handGripImg),
  fist: src(fistImg),
};

// Natural pixel sizes of the part images (used for placement).
export const SIZES: Record<string, [number, number]> = {
  chair: [246, 475],
  torso: [96, 161],
  head: [91, 194],
  hood: [81, 46],
  legL: [30, 69],
  legR: [33, 76],
  shoeL: [23, 41],
  shoeR: [23, 41],
  armL: [64, 73],
  armRU: [64, 73],
  armRL: [45, 26],
  mug: [45, 47],
  mouse: [32, 33],
};
