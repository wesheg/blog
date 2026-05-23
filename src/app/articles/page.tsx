import styles from "./articles.module.css";
import { ArticleLink, Header } from "@ui/components";
import { getPostsQuery, type GetPostsResponseType } from "./utils/graphql";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Wes Heginbotham, CFA",
  description: "All blog articles",
};

export default async function Articles() {
  const data = await fetch("https://cms.wesheg.dev/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: getPostsQuery }),
  });
  const posts: GetPostsResponseType = await data.json();
  console.log(posts);

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
          {posts.data.posts.nodes.map(
            ({ date, title, excerpt, featuredImage }, idx) => (
              <li key={idx}>
                <ArticleLink
                  slug=""
                  title={title}
                  excerpt={excerpt}
                  wordLength={500}
                  date={date}
                  featuredImg={{
                    src: featuredImage.node.mediaItemUrl,
                    srcSet: featuredImage.node.srcSet,
                    alt: "",
                  }}
                />
              </li>
            ),
          )}
        </ul>
      </main>
    </>
  );
}
