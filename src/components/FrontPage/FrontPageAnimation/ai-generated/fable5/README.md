# CodingDesk

A client-side React component (`components/CodingDesk`): an infinitely
looping, programmatic animation of a character writing code at a desk.
It is self-contained — image assets are bundler-imported from `static/`
and the code colors come from `code-colors.css`, so no files need to be
copied into `public/`.

## Usage

```tsx
import CodingDesk from ".../fable5/components/CodingDesk";

<CodingDesk />
```

The component is client-only (`"use client"`); it renders nothing until
mounted, so it is safe inside a server-rendered page.

## Props

- `forceMobile?: boolean` — always render the small-screen styling regardless
  of viewport width. When omitted, the layout switches at a 1,000px viewport
  breakpoint, seamlessly — all animation state is layout-independent.

## Storybook

`CodingDesk.stories.tsx` is picked up by the repo's Storybook config
(`src/**/*.stories.*`). Run `npm run storybook` from the repo root; stories:
**Default** (viewport-driven layout) and **ForceMobile**.

Debug aid: add `?seg=drink` (or `mouse`, `del`, `add`, `edit`) to the page URL
to force which animation segment plays first.

## How it works

- The whole scene is one SVG drawn in the background image's native pixel
  space (`856x561` desktop, `346x376` mobile), so it scales seamlessly with
  the container. Screen rectangles and code-row positions were measured from
  the background PNGs so the code pills line up with the baked-in line
  numbers.
- `animator.ts` is a segment engine: each animation segment (drink coffee,
  move the mouse, delete 1-5 lines, add 1-5 lines, edit tokens) is a
  generator of timed steps, and the next segment is chosen at random with
  weights.
- All positional state is layout-independent — the hand travels between named
  anchors, the mouse offset is normalized, and code token widths are fractions
  of the screen's content width — so resizing mid-segment re-resolves against
  the new layout without any visible jump. The mug always returns to the exact
  desk position it left, and the mouse keeps whatever offset it was left at.
- The right arm is a 2-bone IK solve rendered with the provided arm/hand art;
  the code pills, blinking cursor, and line shifts are React-rendered from a
  `CodeModel` that the typing segments mutate keystroke by keystroke. The
  60fps motion (arms, mug, mouse, breathing) is written imperatively to the
  SVG, bypassing React.
