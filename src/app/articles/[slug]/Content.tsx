import { BlogArticle } from "@ui/components";
import { buildPostQuery, type GetPostResponse } from "./graphql";
import { fetchFromCms } from "@ui/utils";

type ContentProps = {
  params: Promise<{ slug: string }>;
};

export default async function Content({ params }: ContentProps) {
  const { slug } = await params;
  const queryResults = await fetchFromCms<GetPostResponse>(
    buildPostQuery(slug),
  );
  const { date, excerpt, title, wordCount, content, featuredImage } =
    queryResults.data.postBy;

  return (
    <BlogArticle
      date={date}
      wordCount={wordCount}
      title={title}
      excerpt={excerpt}
      content={content}
      featuredImg={{
        src: featuredImage.node.mediaItemUrl,
        srcSet: featuredImage.node.srcSet,
        alt: featuredImage.node.altText,
      }}
    />
  );
}
