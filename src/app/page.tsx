import styles from "./page.module.css";
import { ClientHeader } from "@ui/components/client";

export default function Home() {
  return (
    <>
      <ClientHeader isHome />
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>h1 Heading</h1>
          <h2>h2 Heading</h2>
          <h3>h3 Heading</h3>
          <h4>h4 Heading</h4>
          <h5>h5 Heading</h5>
          <h6>h6 Heading</h6>
          <br/>
          <p>Regular Body Text</p>
          <p>
            <strong>Strong Text</strong>
          </p>
          <p>
            <b>Bold Text</b>
          </p>
          <p>
            <em>Emphasized Text</em>
          </p>
          <p>
            <i>Italicized Text</i>
          </p>

          <p className="small-text">
            Small Text
          </p>

          <p className="large-text">
            Large Text
          </p>
          <a href="/">Link Text</a>
          
        </main>
      </div>
    </>
  );
}
