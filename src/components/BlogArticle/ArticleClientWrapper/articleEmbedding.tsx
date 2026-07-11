import { FrontPageAnimation } from "@ui/components";
import { createRoot, type Root } from "react-dom/client";
import type { JSX } from "react";

const embeddingMap: Record<string, () => JSX.Element> = {
  "front-page-animation": () => <FrontPageAnimation />,
};

export function embedReactNodesInArticle(): Root[] {
  const rootInstances: Root[] = [];
  const domTargets = document.querySelectorAll<HTMLElement>(".wp-react-root");
  domTargets.forEach((element) => {
    const dataAttr = element.dataset.reactNode;
    if (dataAttr === undefined) return;

    const renderNode = embeddingMap[dataAttr];
    if (renderNode === undefined) return;

    const root = createRoot(element);
    rootInstances.push(root);
    root.render(renderNode());
  });

  return rootInstances;
}
