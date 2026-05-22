import styles from "./article.module.css";
import Link from "next/link";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  style: "italic",
  subsets: ["latin"],
});

type ImgMetadata = {
  src: string;
  srcSet: string;
  alt: string;
};

type ArticleLinkProps = {
  slug: string;
  title: string;
  description: string;
  wordLength: number;
  featuredImg: ImgMetadata;
  thumbnailImg: ImgMetadata;
};

export const ArticleLink = ({
  slug,
  title,
  description,
  wordLength,
  featuredImg,
  thumbnailImg,
}: ArticleLinkProps) => {
  const calculateReadTime = (articleWordLength: number): string => {
    const averageWordsPerMin = 200;
    const mins = articleWordLength / averageWordsPerMin;
    return `${Math.max(1, Math.floor(mins)).toLocaleString("en-us")} min read`;
  };

  return (
    <Link href={`/articles/${slug}`} className={styles.articleOuter}>
      <picture className={styles.articleImgContainer}>
        <source
          media="(max-width: 1000px)"
          src={featuredImg.src}
          srcSet={featuredImg.srcSet}
        />
        <img
          alt=""
          className={styles.articleImg}
          src={thumbnailImg.src}
          srcSet={thumbnailImg.srcSet}
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
