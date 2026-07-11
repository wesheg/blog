/* eslint-disable @next/next/no-img-element */
import styles from "./blogArticle.module.css";
import { ArticleClientWrapper } from "./ArticleClientWrapper/ArticleClientWrapper";
import { ArticleDate, type FeaturedImg } from "@ui/components";
import { frauncesFont, getReadTime } from "@ui/utils";

type BlogArticleProps = {
  /** Publication date in the format "YYYY-MM-DDTHH:mm:ss" */
  date: string;
  /** HTML for a short description of the article's content */
  excerpt: string;
  /** Title of the blog article */
  title: string;
  /** Number of words in the article */
  wordCount: number;
  /** HTML for the blog article's content */
  content: string;
  /** Metadata for the article's banner image */
  featuredImg: FeaturedImg;
};

/**
 * Component rendering content for a single WordPress post.
 */
export const BlogArticle = ({
  date,
  excerpt,
  title,
  wordCount,
  content,
  featuredImg,
}: BlogArticleProps) => {
  return (
    <ArticleClientWrapper>
      <article className={styles.blogArticleOuter}>
        <div className={styles.articleMetadata}>
          <div className={styles.dateAndReadTime}>
            <ArticleDate dateString={date} />
            <span aria-hidden="true">|</span>
            <span>{getReadTime(wordCount)}</span>
          </div>
        </div>
        <h1 className={`${frauncesFont.className} ${styles.articleTitle}`}>
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
        <hr style={{ margin: "1em 0 2em 0" }} />
        <div
          className={styles.wpContent}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </ArticleClientWrapper>
  );
};
