"use client";

import dynamic from "next/dynamic";

import type { CodeDeskSceneProps } from "./CodeDeskScene";

const CodeDeskScene = dynamic<CodeDeskSceneProps>(() => import("./CodeDeskScene"), {
  ssr: false,
});

export type CodeDeskAnimationProps = CodeDeskSceneProps;

/**
 * Client boundary for embedding the animation in a server-rendered Next.js
 * tree or mounting it into a server-generated React root.
 */
export default function CodeDeskAnimation(props: CodeDeskAnimationProps) {
  return <CodeDeskScene {...props} />;
}
