import styles from "./careerCard.module.css";
import Image from "next/image";

type CareerCardProps = {
  imgSrc: string;
  imgAlt: string;
  jobTitle: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  children: React.ReactNode;
};

export const CareerCard = ({
  imgSrc,
  imgAlt,
  jobTitle,
  companyName,
  location,
  startDate,
  endDate,
  children,
}: CareerCardProps) => {
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
        <p className={styles.companyName}>{companyName}</p>
        <p>{location}</p>
        <p>{`${startDate} - ${endDate}`}</p>
      </div>
      <div className={styles.jobDescription}>{children}</div>
    </div>
  );
};
