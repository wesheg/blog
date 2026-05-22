import styles from "./article.module.css";
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
      <picture className={styles.articleImgContainer}>
        <source
          media="(max-width: 1000px)"
          srcSet="/test/mobile-copy-500.png 500w,
                    /test/mobile-copy-1000.png 1000w,
                    /test/mobile-copy-1500.png 1500w"
        />
        <img
          alt=""
          className={styles.articleImg}
          src="/test/desktop-copy-500.png"
          srcSet="/test/desktop-copy-500.png 500w,
                    /test/desktop-copy-1000.png 1000w,
                    /test/desktop-copy-1500.png 1500w"
        />
        <span className={styles.articleImgDecorator} aria-hidden />
      </picture>

      <div className={styles.articleInner}>
        <div className={styles.articleMetadata}>
          <time className={styles.articleDate} dateTime="2025-01-01">
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
