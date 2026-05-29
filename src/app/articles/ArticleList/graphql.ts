export const getPostsQuery = `
  query GetPosts {
    posts {
      nodes {
        date 
        title
        excerpt
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
        title: string;
        excerpt: string;
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
