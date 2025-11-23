import styles from "./frontPage.module.css";
import { FrontPageAnimation } from "./FrontPageAnimation";
import { FrontPageHeadlines } from "./FrontPageHeadlines/FrontPageHeadlines";

export const FrontPage = () => {
  return (
    <div className={styles.outerContainer}>
      <FrontPageAnimation />
      <FrontPageHeadlines />
    </div>
  );
};
