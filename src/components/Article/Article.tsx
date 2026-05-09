import styles from "./article.module.css";
import Link from "next/link";

type ArticleProps = {
  slug: string;
  title: string;
  description: string;
  wordLength: number;
};
export const Article = ({
  slug,
  title,
  description,
  wordLength,
}: ArticleProps) => {
  const calculateReadTime = (articleWordLength: number): string => {
    const averageWordsPerMin = 200;
    const mins = articleWordLength / averageWordsPerMin;
    return `${Math.min(1, Math.floor(mins))} min read`;
  };

  return (
    <div className={styles.articleOuter}>
      <div>{/* Img placeholder */}</div>
      <div className={styles.articleInner}>
        <div className={styles.articleMetadata}>
          <time dateTime="2025-01-01">Jan 1, 2025</time>
          <span aria-hidden="true">|</span>
          <span>{calculateReadTime(wordLength)}</span>
          <span aria-hidden="true">|</span>
          <span>Wes Heginbotham, CFA</span>
        </div>
        <Link href={`/articles/${slug}`} className={styles.articleLink}>
          <h3 className={styles.articleTitle}>{title}</h3>
        </Link>
        <p className={styles.articleDescription}>{description}</p>
      </div>
    </div>
  );
};
