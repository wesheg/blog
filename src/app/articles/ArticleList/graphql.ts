export const getPostsQuery = `
  query GetPosts {
    posts {
      nodes {
        date 
        excerpt
        slug
        title
        wordCount
        featuredImage {
          node {
            srcSet
            mediaItemUrl
          } 
        }
      } 
    } 
  }
`;

export type GetPostsResponseType = {
  data: {
    posts: {
      nodes: {
        date: string;
        excerpt: string;
        slug: string;
        title: string;
        wordCount: number;
        featuredImage: {
          node: {
            srcSet: string;
            mediaItemUrl: string;
          };
        };
      }[];
    };
  };
};
