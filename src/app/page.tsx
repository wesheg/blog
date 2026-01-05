import styles from "./page.module.css";

import { FrontPage } from "@ui/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <FrontPage />
    </main>
  );
}
