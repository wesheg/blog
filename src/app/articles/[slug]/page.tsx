import Content from "./Content";
import styles from "./articleSlug.module.css";
import { Header } from "@ui/components";
import { Suspense } from "react";
import { buildMetadataQuery, type GetMetadataResponse } from "./graphql";
import { fetchFromCms } from "@ui/utils";
import type { Metadata } from "next";

type ArticleParams = {
  params: Promise<{ slug: string }>;
};

export default function ArticlePage({ params }: ArticleParams) {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main>
            <p>Loading...</p>
          </main>
        }
      >
        <>
          <main>
            <Content params={params} />
          </main>
          <footer className={styles.articleFooter}>
            <div className={styles.articleFooterInner}>
              &copy; 2026 Wes Heginbotham
            </div>
          </footer>
        </>
      </Suspense>
    </>
  );
}

/**
 * Generate browser tab title using article title
 */
export async function generateMetadata({
  params,
}: ArticleParams): Promise<Metadata> {
  const { slug } = await params;
  const queryResults = await fetchFromCms<GetMetadataResponse>(
    buildMetadataQuery(slug),
  );
  const { title } = queryResults.data.postBy;
  return {
    title: `${title} | Wes Heginbotham, CFA`,
  };
}
