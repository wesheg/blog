import styles from "./skills.module.css";
import { SkillBadge } from "./SkillBadge/SkillBadge";

export const Skills = () => {
  return (
    <section className={styles.skillsSection}>
      <h2>Skills</h2>
      <div className={styles.badgeGallery}>
        <SkillBadge label="Python" imgSrc="/skills/Python.png" />
        <SkillBadge label="TypeScript" imgSrc="/skills/TypeScript.png" />
        <SkillBadge label="React" imgSrc="/skills/React.png" />
        <SkillBadge label="C++" imgSrc="/skills/Cpp.png" />
        <SkillBadge label="iOS" imgSrc="/skills/iOS.png" imgAlt="Apple Logo" />
        <SkillBadge label="Android" imgSrc="/skills/Android.png" />
        <SkillBadge label="Docker" imgSrc="/skills/Docker.png" />
        <SkillBadge
          label="SQL Databases"
          imgSrc="/skills/SQL.png"
          imgAlt="PostgreSQL Logo"
        />
        <SkillBadge label="Figma" imgSrc="/skills/Figma.png" />
        <SkillBadge label="Amazon Web Services" imgSrc="/skills/AWS.png" />
        <SkillBadge
          label="CFA Charterholder"
          imgSrc="/skills/CFA.png"
          imgAlt="CFA Institute Logo"
        />
        <SkillBadge
          label="Financial Modeling"
          imgSrc="/skills/Excel.png"
          imgAlt="Excel Logo"
        />
      </div>
    </section>
  );
};
