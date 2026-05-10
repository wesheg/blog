import styles from "./article.module.css";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  style: "italic",
});

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
    <Link href={`/articles/${slug}`} className={styles.articleOuter}>
      {/* <div>Img placeholder</div> */}
      <Image
        src="/social/linkedin.png"
        alt="test"
        width={100}
        height={100}
        style={{
          width: "100%",
          height: "100%",
          flexBasis: "50%",
          alignSelf: "center",
        }}
      />

      <div className={styles.articleInner}>
        <div className={styles.articleMetadata}>
          <time className={styles.dateText} dateTime="2025-01-01">
            Jan 1, 2025
          </time>
          <span aria-hidden="true">|</span>
          <span>{calculateReadTime(wordLength)}</span>
          <span aria-hidden="true">|</span>
          <span>Wes Heginbotham, CFA</span>
        </div>
        <h3 className={`${styles.articleTitle} ${fraunces.className}`}>
          {title}
        </h3>
        <p className={styles.articleDescription}>{description}</p>
      </div>
    </Link>
  );
};
