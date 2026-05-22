import dayjs from "dayjs";
import styles from "./articleLink.module.css";
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
  date: string;
  excerpt: string;
  wordLength: number;
  featuredImg: ImgMetadata;
  thumbnailImg: ImgMetadata;
};

export const ArticleLink = ({
  slug,
  title,
  date,
  excerpt,
  wordLength,
  featuredImg,
  thumbnailImg,
}: ArticleLinkProps) => {
  const calculateReadTime = (articleWordLength: number): string => {
    const averageWordsPerMin = 200;
    const mins = articleWordLength / averageWordsPerMin;
    return `${Math.max(1, Math.floor(mins)).toLocaleString("en-us")} min read`;
  };

  const parsedDate = dayjs(date, "YYYY-MM-DDTHH:mm:ss");

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
          <time
            className={styles.articleDate}
            dateTime={parsedDate.format("YYYY-MM-DD")}
          >
            {parsedDate.format("MMM D, YYYY")}
          </time>
          <span aria-hidden="true">|</span>
          <span>{calculateReadTime(wordLength)}</span>
          <span aria-hidden="true">|</span>
          <span>Wes Heginbotham, CFA</span>
        </div>
        <h3 className={`${styles.articleTitle} ${fraunces.className}`}>
          {title}
        </h3>
        <div
          className={styles.articleExcerpt}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </div>
    </Link>
  );
};
