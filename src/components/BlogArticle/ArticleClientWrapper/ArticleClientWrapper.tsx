"use client";

import { useEffect, type FC, type ReactNode } from "react";
import { embedReactNodesInArticle } from "./articleEmbedding";

/**
 * Wraps the raw content of a blog article and hydrates it with any relevant
 * React components.
 */
export const ArticleClientWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    const roots = embedReactNodesInArticle();
    return () => {
      roots.forEach((r) => r.unmount());
    };
  }, []);
  return <>{children}</>;
};
