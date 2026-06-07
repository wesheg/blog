/* eslint-disable @next/next/no-img-element */
import styles from "./blogArticle.module.css";
import type { FeaturedImg } from "@ui/components";

type BlogArticleProps = {
  title: string;
  excerpt: string;
  featuredImg: FeaturedImg;
};

export const BlogArticle = ({
  title,
  excerpt,
  featuredImg,
}: BlogArticleProps) => {
  return (
    <article className={styles.blogArticleOuter}>
      <h1 className="articleTitle" style={{ margin: "0.5em 0 0.25em 0" }}>
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
      <div className={styles.contentOuter}>
        <hr />
        <div className={styles.contentInner}>
          Lots of content here. BIg juicy content
        </div>
      </div>
    </article>
  );
};
