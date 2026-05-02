import { FrontPage, Header } from "@ui/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wes Heginbotham, CFA",
  description: "A blog about finance and technology",
};

export default function Home() {
  return (
    <>
      <Header useH1 />
      <main>
        <FrontPage />
      </main>
    </>
  );
}
