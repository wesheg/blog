# Code desk animation

A client-side Next.js component assembled from the supplied scene and character
sprites. The public entry is `index.ts`, which can be imported by a Server
Component or mounted into a server-generated DOM root.

## Next.js Server Component

```tsx
import CodeDeskAnimation from "./ai-generated/gpt56";

export default function Page() {
  return <CodeDeskAnimation />;
}
```

The public wrapper keeps the randomized scene behind a client-only dynamic
boundary, avoiding hydration differences without changing the animation itself.

## Server-generated DOM root

Mount the component from a client bootstrap when the root element itself comes
from the server:

```tsx
"use client";

import { createRoot } from "react-dom/client";
import CodeDeskAnimation from "./ai-generated/gpt56";

const rootElement = document.querySelector("[data-code-desk-root]");

if (rootElement) {
  createRoot(rootElement).render(<CodeDeskAnimation />);
}
```

Pass `forceSmallScreen` to use the mobile composition at any viewport width:

```tsx
<CodeDeskAnimation forceSmallScreen />
```

`CodeDeskAnimation.stories.tsx` follows the blog project’s
`@storybook/nextjs-vite` CSF convention and includes both layouts.
