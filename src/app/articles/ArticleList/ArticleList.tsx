import styles from "./articleList.module.css";
import { ArticleLink } from "@ui/components";
import { cacheLife } from "next/cache";
import { fetchFromCms } from "@ui/utils";
import { getPostsQuery, type GetPostsResponse } from "./graphql";

export default async function ArticleList() {
  "use cache";
  cacheLife("serverContent");
  const queryResults = await fetchFromCms<GetPostsResponse>(getPostsQuery);

  return (
    <ul className={styles.articleList}>
      {queryResults.data.posts.nodes.map(
        ({ date, excerpt, slug, title, wordCount, featuredImage }, idx) => (
          <li key={idx}>
            <ArticleLink
              slug={slug}
              date={date}
              title={title}
              excerpt={excerpt}
              wordLength={wordCount}
              featuredImg={{
                src: featuredImage.node.mediaItemUrl,
                srcSet: featuredImage.node.srcSet,
                alt: `Thumbnail for article titled "${title}"`,
              }}
            />
          </li>
        ),
      )}
    </ul>
  );
}
