/* eslint-disable @next/next/no-img-element */
import styles from "./blogArticle.module.css";
import { getReadTime } from "@ui/utils";
import type { FeaturedImg } from "@ui/components";

type BlogArticleProps = {
  excerpt: string;
  title: string;
  wordCount: number;
  content: string;
  featuredImg: FeaturedImg;
};

export const BlogArticle = ({
  excerpt,
  title,
  wordCount,
  content,
  featuredImg,
}: BlogArticleProps) => {
  return (
    <article className={styles.blogArticleOuter}>
      <div className={styles.articleMetadata}>
        <div className={styles.dateAndReadTime}>
          <time className={styles.articleDate}>May 6, 2026</time>
          <span aria-hidden="true">|</span>
          <span>{getReadTime(wordCount)}</span>
        </div>
      </div>
      <h1 className="articleTitle" style={{ margin: "0.25em 0 0 0" }}>
        {title}
      </h1>
      <div
        className={styles.articleExcerpt}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <div className={styles.featuredImgContainer}>
        <img
          alt={featuredImg.alt}
          src={featuredImg.src}
          srcSet={featuredImg.srcSet}
          className={styles.featuredImg}
        />
        <div className={styles.featuredImgDecorator} />
      </div>
      <p>
        <strong>Wes Heginbotham, CFA</strong>
      </p>
      <div className={styles.contentOuter}>
        <hr style={{ margin: "1em 0 2em 0" }} />
        <div
          className={styles.wpContent}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  );
};
