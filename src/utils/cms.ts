/**
 * Fetch content from headless WordPress
 *
 * @param {string} graphQlQuery - Stringified GraphQL query
 * @returns {T} - Specify a return type when the function is called
 */
export async function fetchFromCms<T>(graphQlQuery: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: graphQlQuery }),
  });

  return response.json() as T;
}
