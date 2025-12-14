"use client";
import dynamic from "next/dynamic";
import styles from "./frontPage.module.css";

const DynamicFrontPageAnimation = dynamic(
  () => import("./FrontPageAnimation"),
  { ssr: false },
);

const FrontPageHeadlines = () => {
  return (
    <div className={styles.headlinesContainer}>
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
      <DynamicFrontPageAnimation />
      <FrontPageHeadlines />
    </div>
  );
};
