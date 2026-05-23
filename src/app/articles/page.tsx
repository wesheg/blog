import styles from "./articles.module.css";
import { ArticleLink, Header } from "@ui/components";
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
        <ul className={styles.articleList}>
          <li>
            <ArticleLink
              slug=""
              title="A Very Interesting Article"
              excerpt="A very lengthy description of this article. Did you know that this article was so interesting? What an interesting article this is!"
              wordLength={500}
              date="2025-01-01T00:00:00"
              featuredImg={{
                src: "/test/mobile-copy-500.png",
                srcSet: `/test/mobile-copy-500.png 500w,
                         /test/mobile-copy-1000.png 1000w,
                         /test/mobile-copy-1500.png 1500w`,
                alt: "Featured Img",
              }}
            />
          </li>
        </ul>
      </main>
    </>
  );
}
