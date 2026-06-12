"use client";
import dayjs from "dayjs";
import styles from "./articleDate.module.css";

type ArticleDateProps = {
  dateString: string;
};

export const ArticleDate = ({ dateString }: ArticleDateProps) => {
  const parsedDate = dayjs(dateString, "YYYY-MM-DDTHH:mm:ss");
  console.log(dateString);
  return (
    <time
      dateTime={parsedDate.format("YYYY-MM-DD")}
      className={styles.articleDate}
    >
      {parsedDate.format("MMM D, YYYY")}
    </time>
  );
};
