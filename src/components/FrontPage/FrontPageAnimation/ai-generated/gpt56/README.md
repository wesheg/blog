# Code desk animation

A standalone, client-only Next.js animation assembled from the supplied scene
and character sprites.

## Run locally

```bash
npm install
npm run dev
```

`CodeDeskAnimation.tsx` is the embeddable root component. It imports its own
sprite assets, animation styles, and the palette from `code-colors.css`.

Pass `forceSmallScreen` to use the mobile composition at any viewport width:

```tsx
<CodeDeskAnimation forceSmallScreen />
```
