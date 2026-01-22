import Image from "next/image";
import styles from "./skillBadge.module.css";

type SkillBadgeProps = {
  label: string;
  imgSrc: string;
  imgAlt?: string;
};

export const SkillBadge = ({ label, imgSrc, imgAlt }: SkillBadgeProps) => {
  return (
    <figure className={styles.skillFigure}>
      <Image
        alt={imgAlt ?? `${label} Logo`}
        src={imgSrc}
        width={90}
        height={90}
      />
      <figcaption className={styles.skillFigCaption}>{label}</figcaption>
    </figure>
  );
};
