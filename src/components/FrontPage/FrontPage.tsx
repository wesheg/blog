import styles from "./frontPage.module.css";
import { FrontPageAnimation } from "./FrontPageAnimation";
import type { FC } from "react";

const FrontPageHeadlines: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`${styles.headlinesContainer} ${className ?? ""}`}>
      <h2>Hi, I&apos;m Wes</h2>
      <p>I&apos;m a software engineer & investment analyst</p>
      <p>Welcome to my website!</p>
      <button className={styles.headlinesButton}>Read the blog</button>
    </div>
  );
};

export const FrontPage = () => {
  return (
    <div className={styles.outerContainer}>
      <FrontPageHeadlines className={styles.headlinesMobile} />
      <FrontPageAnimation />
      <FrontPageHeadlines className={styles.headlinesDesktop} />
    </div>
  );
};
