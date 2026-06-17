export function buildPostQuery(slug: string): string {
  return `query GetPost {
        postBy(slug: "${slug}") {
            date
            excerpt
            title
            wordCount
            content
            featuredImage {
                node {
                    altText
                    srcSet
                    mediaItemUrl
                }
            }
        }
    }`;
}

export function buildMetadataQuery(slug: string): string {
  return `query GetMetadata { postBy(slug: "${slug}") { title } }`;
}

export type GetPostResponse = {
  data: {
    postBy: {
      date: string;
      excerpt: string;
      title: string;
      wordCount: number;
      content: string;
      featuredImage: {
        node: {
          altText: string;
          srcSet: string;
          mediaItemUrl: string;
        };
      };
    };
  };
};

export type GetMetadataResponse = {
  data: {
    postBy: {
      title: string;
    };
  };
};
