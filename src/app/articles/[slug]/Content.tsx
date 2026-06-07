import { BlogArticle } from "@ui/components";
import { buildPostQuery, type GetPostResponse } from "./graphql";
import { cacheLife } from "next/cache";
import { fetchFromCms } from "@ui/utils";

type ContentProps = {
  params: Promise<{ slug: string }>;
};

export default async function Content({ params }: ContentProps) {
  "use cache";
  cacheLife("serverContent");
  const { slug } = await params;
  const queryResults = await fetchFromCms<GetPostResponse>(
    buildPostQuery(slug),
  );
  return (
    <BlogArticle
      title={queryResults.data.postBy.title}
      excerpt={queryResults.data.postBy.excerpt}
      featuredImg={{
        src: queryResults.data.postBy.featuredImage.node.mediaItemUrl,
        srcSet: queryResults.data.postBy.featuredImage.node.srcSet,
        alt: queryResults.data.postBy.featuredImage.node.altText,
      }}
    />
  );
}
