import Content from "./Content";
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
    </>
  );
}
