import Content from "./Content";
import styles from "./articleSlug.module.css";
import { Header } from "@ui/components";
import { Suspense } from "react";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Content params={params} />
        </Suspense>
      </main>
      <footer className={styles.articleFooter}>
        <div className={styles.articleFooterInner}>
          &copy; 2026 Wes Heginbotham
        </div>
      </footer>
    </>
  );
}
