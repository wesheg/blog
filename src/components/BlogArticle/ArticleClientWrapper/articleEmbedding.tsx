import { AiGenerated } from "@ui/components";
import { FrontPageAnimation } from "@ui/components";
import { createRoot, type Root } from "react-dom/client";
import type { JSX } from "react";

/**
 * Mapping of the ".wp-react-root" HTML data attribute to a hydration callback
 */
const embeddingMap: Record<string, () => JSX.Element> = {
  "front-page-animation": () => <FrontPageAnimation articleEmbed />,
  "front-page-animation-ai-fable5": () => <AiGenerated.Fable5 forceMobile />,
  "front-page-animation-ai-gpt56": () => <AiGenerated.Gpt56 forceSmallScreen />,
};

export type ArticleRoot = { element: HTMLElement; root: Root };

/**
 * A container may only ever be passed to createRoot() once, so keep track of
 * the roots we've already created and reuse them on a re-embed.
 */
const activeRoots = new WeakMap<HTMLElement, Root>();

/** Elements whose unmount has been scheduled but not yet run */
const pendingUnmounts = new Set<HTMLElement>();

/**
 * Find and hydrate all blog article React roots.
 * Return a list of the roots for reference
 */
export function embedReactNodesInArticle(): ArticleRoot[] {
  const rootInstances: ArticleRoot[] = [];
  const domTargets = document.querySelectorAll<HTMLElement>(".wp-react-root");
  domTargets.forEach((element) => {
    const dataAttr = element.dataset.reactNode;
    if (dataAttr === undefined) return;

    const renderNode = embeddingMap[dataAttr];
    if (renderNode === undefined) return;

    // Cancel any teardown still queued for this element from a prior mount
    pendingUnmounts.delete(element);

    let root = activeRoots.get(element);
    if (root === undefined) {
      root = createRoot(element);
      activeRoots.set(element, root);
    }

    rootInstances.push({ element, root });
    root.render(renderNode());
  });

  return rootInstances;
}

/**
 * Tear down roots created by `embedReactNodesInArticle`.
 *
 * The unmount is deferred: this is called from an effect cleanup, which can run
 * while React is still rendering, and unmounting a root synchronously mid-render
 * risks a race condition.
 */
export function unmountArticleReactNodes(instances: ArticleRoot[]): void {
  instances.forEach(({ element }) => pendingUnmounts.add(element));

  queueMicrotask(() => {
    instances.forEach(({ element, root }) => {
      // Re-embedded in the meantime (e.g. StrictMode's double mount) - keep it
      if (!pendingUnmounts.delete(element)) return;

      activeRoots.delete(element);
      root.unmount();
    });
  });
}
