import styles from "./skills.module.css";
import { SkillBadge } from "./SkillBadge/SkillBadge";

export const Skills = () => {
  return (
    <section className={styles.skillsSection}>
      <h2>Skills</h2>
      <div>
        <SkillBadge label="Python" imgSrc="/skills/Python.png" />
        <SkillBadge label="TypeScript" imgSrc="/skills/TypeScript.png" />
        <SkillBadge label="React" imgSrc="/skills/React.png" />
      </div>
    </section>
  );
};
