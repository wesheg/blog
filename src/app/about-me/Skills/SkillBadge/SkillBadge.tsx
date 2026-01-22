import Image from "next/image";
// import styles from "./skillBadge.module.css";

type SkillBadgeProps = {
  label: string;
  imgSrc: string;
  imgAlt?: string;
};

export const SkillBadge = ({ label, imgSrc, imgAlt }: SkillBadgeProps) => {
  return (
    <figure>
      <Image alt={imgAlt ?? `${label} Logo`} src={imgSrc} />
      <figcaption>{label}</figcaption>
    </figure>
  );
};
