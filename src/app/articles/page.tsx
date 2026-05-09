import styles from "./articles.module.css";
import { Article, Header } from "@ui/components";
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
        <ul>
          <li>
            <Article
              slug=""
              title="A Very Interesting Article"
              description="A very lengthy description of this article"
              wordLength={500}
            />
          </li>
        </ul>
      </main>
    </>
  );
}
