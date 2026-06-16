/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./articleLink.module.css";
import { ArticleDate, type FeaturedImg } from "@ui/components";
import { frauncesFont, getReadTime } from "@ui/utils";

type ArticleLinkProps = {
  /** URL slug for the article: `/articles/[slug]`
   * Must match the slug stored in WordPress */
  slug: string;
  /** Title of the blog article */
  title: string;
  /** Publication date in the format "YYYY-MM-DDTHH:mm:ss" */
  date: string;
  /** HTML for a short description of the article's content */
  excerpt: string;
  /** Number of words in the article */
  wordCount: number;
  /** Metadata for the article's banner image */
  featuredImg: FeaturedImg;
};

/**
 * A clickable card element containing article metadata.
 * Clicking on this component opens the article's content.
 */
export const ArticleLink = ({
  slug,
  title,
  date,
  excerpt,
  wordCount,
  featuredImg,
}: ArticleLinkProps) => {
  return (
    <Link href={`/articles/${slug}`} className={styles.articleOuter} prefetch>
      <div className={styles.articleImgContainer}>
        <div className={styles.articleImgContainerInner}>
          <img
            alt={featuredImg.alt}
            className={styles.articleImg}
            src={featuredImg.src}
            srcSet={featuredImg.srcSet}
          />
          <span className={styles.articleImgDecorator} aria-hidden />
        </div>
      </div>

      <div className={styles.articleInner}>
        <div className={styles.articleMetadata}>
          <ArticleDate dateString={date} />
          <span aria-hidden="true">|</span>
          <span>{getReadTime(wordCount)}</span>
          <span aria-hidden="true">|</span>
          <span>Wes Heginbotham, CFA</span>
        </div>
        <h3 className={`${frauncesFont.className} ${styles.articleTitle}`}>
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
