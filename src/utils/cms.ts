export async function fetchFromCms<T>(graphQlQuery: string) {
  const response = await fetch("https://cms.wesheg.dev/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: graphQlQuery }),
  });

  return response.json() as T;
}
