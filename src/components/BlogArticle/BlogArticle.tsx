/* eslint-disable @next/next/no-img-element */
import styles from "./blogArticle.module.css";
import type { FeaturedImg } from "@ui/components";

type BlogArticleProps = {
  title: string;
  featuredImg: FeaturedImg;
};

export const BlogArticle = ({ title, featuredImg }: BlogArticleProps) => {
  return (
    <div className={styles.blogArticleOuter}>
      <img
        alt={featuredImg.alt}
        src={featuredImg.src}
        srcSet={featuredImg.srcSet}
        className={styles.featuredImg}
      />
      <h1 className="articleTitle">{title}</h1>
      <div className={styles.content}></div>
    </div>
  );
};
