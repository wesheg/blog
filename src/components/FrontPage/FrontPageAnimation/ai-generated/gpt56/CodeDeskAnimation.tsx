"use client";

import dynamic from "next/dynamic";

import type { CodeDeskSceneProps } from "./CodeDeskScene";

const CodeDeskScene = dynamic<CodeDeskSceneProps>(() => import("./CodeDeskScene"), {
  ssr: false,
});

export type CodeDeskAnimationProps = CodeDeskSceneProps;

/**
 * Client-only boundary for embedding the animation in another Next.js tree.
 * The animated scene itself is never emitted by the server.
 */
export default function CodeDeskAnimation(props: CodeDeskAnimationProps) {
  return <CodeDeskScene {...props} />;
}
