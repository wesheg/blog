import styles from "./skills.module.css";
import { SkillBadge } from "./SkillBadge/SkillBadge";

export const Skills = () => {
  return (
    <section className={styles.skillsSection}>
      <h2>I&apos;ve Worked In</h2>
      <div className={styles.badgeGallery}>
        <SkillBadge label="TypeScript" imgSrc="/skills/TypeScript.png" />
        <SkillBadge label="React" imgSrc="/skills/React.png" />
        <SkillBadge label="Python" imgSrc="/skills/Python.png" />
        <SkillBadge label="C++" imgSrc="/skills/Cpp.png" />
        <SkillBadge label="Swift" imgSrc="/skills/Swift.png" />
        <SkillBadge label="Kotlin" imgSrc="/skills/Kotlin.png" />
      </div>
    </section>
  );
};
