import styles from "./frontPage.module.css";
import { FrontPageAnimation } from "./FrontPageAnimation"

export const FrontPage = () => {
  return (
    <div className={styles.outerContainer}>
      <FrontPageAnimation />
    </div>
  );
}