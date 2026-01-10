import styles from "./aboutMe.module.css";
import { Header } from "@ui/components";

export default function AboutMe() {
  return (
    <>
      <Header />
      <main className={styles.aboutMeMain}>
        <h1>About Me</h1>
        <div
          style={{
            height: "40vh",
            minHeight: "300px",
            width: "100%",
            border: "1px solid var(--foreground)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Placeholder
        </div>
        <h2>Hi, I&apos;m Wes</h2>
        <p>
          I&apos;m a{" "}
          <span className={`${styles.software} ${styles.emphasis}`}>
            Software Engineer
          </span>{" "}
          and former{" "}
          <span className={`${styles.finance} ${styles.emphasis}`}>
            Stock Analyst
          </span>
          .
        </p>
        <p>
          I used to work in{" "}
          <span className={`${styles.finance} ${styles.emphasis}`}>
            asset management
          </span>
          . Now I develop{" "}
          <span className={`${styles.software} ${styles.emphasis}`}>
            software
          </span>{" "}
          for financial firms.
        </p>
        <p>
          I&apos;m{" "}
          <span className={`${styles.life} ${styles.emphasis}`}>American</span>{" "}
          🇺🇸, but I live in{" "}
          <span className={`${styles.life} ${styles.emphasis}`}>London</span> 🇬🇧
          now.
        </p>
        <p>
          I&apos;m a{" "}
          <span className={`${styles.finance} ${styles.emphasis}`}>
            CFA Charterholder
          </span>
          , and I like to follow{" "}
          <span className={`${styles.finance} ${styles.emphasis}`}>
            financial markets
          </span>{" "}
          📈 when I can.
        </p>
        <p>
          In my spare time, I enjoy{" "}
          <span className={`${styles.life} ${styles.emphasis}`}>hiking</span>{" "}
          🥾,{" "}
          <span className={`${styles.life} ${styles.emphasis}`}>
            riding motorcycles
          </span>{" "}
          🏍️, and working on an ever-growing list of{" "}
          <span className={`${styles.software} ${styles.emphasis}`}>
            side projects
          </span>{" "}
          👨‍💻.
        </p>

        <h2>Stuff I Can Do</h2>
        <h2>Career History</h2>
      </main>
    </>
  );
}
