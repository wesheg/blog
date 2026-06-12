import styles from "./articleList.module.css";
import { ArticleLink } from "@ui/components";
import { cacheLife } from "next/cache";
import { fetchFromCms } from "@ui/utils";
import { getPostsQuery, type GetPostsResponse } from "./graphql";

/**
 * Fetch a list of all posts from WordPress.
 * Wrap this component in `<Suspense />` and provide a fallback while awaiting
 * the query.
 */
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
              wordCount={wordCount}
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
