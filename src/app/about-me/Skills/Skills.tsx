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
        <SkillBadge label="Docker" imgSrc="/skills/Docker.png" />
        <SkillBadge label="Amazon Web Services" imgSrc="/skills/AWS.png" />
        <SkillBadge
          label="CFA Charterholder"
          imgSrc="/skills/CFA.png"
          imgAlt="CFA Institute Logo"
        />
        <SkillBadge
          label="Advanced Excel"
          imgSrc="/skills/Excel.png"
          imgAlt="Excel Logo"
        />
        <SkillBadge label="Figma" imgSrc="/skills/Figma.png" />
      </div>
    </section>
  );
};
