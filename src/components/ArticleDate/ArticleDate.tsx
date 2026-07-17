import dayjs from "dayjs";
import styles from "./articleDate.module.css";

type ArticleDateProps = {
  /** JSON date string in the format "YYYY-MM-DDTHH:mm:ss" */
  dateString: string;
};

/**
 * Parse a date string from WPGraphQL and generate a `<time>` DOM element.
 * Use this for displaying an article's publication date.
 */
export const ArticleDate = ({ dateString }: ArticleDateProps) => {
  const parsedDate = dayjs(dateString, "YYYY-MM-DDTHH:mm:ss");
  return (
    <time
      dateTime={parsedDate.format("YYYY-MM-DD")}
      className={styles.articleDate}
    >
      {parsedDate.format("MMMM D, YYYY")}
    </time>
  );
};
