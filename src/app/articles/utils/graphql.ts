export const getPostsQuery = `
    query GetPosts {
        posts {
            nodes {
                date
                title
                excerpt
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
