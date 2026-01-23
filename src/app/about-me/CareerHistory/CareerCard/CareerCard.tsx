import styles from "./careerCard.module.css";
import Image from "next/image";

type CareerCardProps = {
  imgSrc: string;
  imgAlt: string;
  jobTitle: string;
};

export const CareerCard = ({ imgSrc, imgAlt, jobTitle }: CareerCardProps) => {
  return (
    <div className={styles.outerGrid}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logoImg}
          src={imgSrc}
          alt={imgAlt}
          height={90}
          width={90}
        />
      </div>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{jobTitle}</h3>
      </div>
    </div>
  );
};
