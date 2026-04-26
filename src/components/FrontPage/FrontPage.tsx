"use client";
import dynamic from "next/dynamic";
import styles from "./frontPage.module.css";
import { LinkAsButton } from "@ui/components";

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
      <LinkAsButton href="/" label="Read the Blog" />
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
