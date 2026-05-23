import styles from "./articleList.module.css";
import { ArticleLink } from "@ui/components";
import { fetchFromCms } from "@ui/utils";
import { getPostsQuery, type GetPostsResponseType } from "./graphql";

export default async function ArticleList() {
  const queryResults = await fetchFromCms<GetPostsResponseType>(getPostsQuery);

  return (
    <ul className={styles.articleList}>
      {queryResults.data.posts.nodes.map(
        ({ date, title, excerpt, featuredImage }, idx) => (
          <li key={idx}>
            <ArticleLink
              slug=""
              date={date}
              title={title}
              excerpt={excerpt}
              wordLength={500}
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
  );
}
