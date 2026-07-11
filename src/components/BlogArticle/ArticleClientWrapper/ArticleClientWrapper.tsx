"use client";

import { useEffect, type FC, type ReactNode } from "react";
import { embedReactNodesInArticle } from "./articleEmbedding";

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
