import styles from "./articles.module.css";
import ArticleList from "./ArticleList/ArticleList";
import { Header } from "@ui/components";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Wes Heginbotham, CFA",
  description: "All blog articles",
};

export default function Articles() {
  return (
    <>
      <Header />
      <main className={styles.articlesMain}>
        <div className={styles.titleContainer}>
          <h1>All Articles</h1>
          <p className={styles.articlesSubtitle}>
            A treasure trove of knowledge. You&apos;re welcome.
          </p>
        </div>
        <Suspense fallback={<div>HELLO</div>}>
          <ArticleList />
        </Suspense>
      </main>
    </>
  );
}
