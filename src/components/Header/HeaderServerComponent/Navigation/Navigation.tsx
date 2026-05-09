import styles from "./navigation.module.css";
import Image from "next/image";
import Link from "next/link";
import { MobileNavButton } from "@ui/components/Header/mobile";
import { popUp, pressDown } from "@ui/utils";

export const Navigation = () => {
  return (
    <nav className={styles.navigationContainer}>
      <div className={styles.serverContainer}>
        <ul className={styles.navigationList}>
          <li className={styles.navigationOption}>
            <Link href="/articles">articles</Link>
          </li>
          <li className={styles.navigationOption}>
            <Link href="/about-me">about me</Link>
          </li>
        </ul>
        <div className={styles.socialContainer}>
          <Image
            preload
            className={styles.socialButton}
            src="/social/linkedin.png"
            height={50}
            width={50}
            alt="LinkedIn Profile"
            onClick={() =>
              window.open("https://www.linkedin.com/in/wes-heginbotham-cfa")
            }
            onMouseDown={(e) => pressDown(e, styles.socialButtonPressed)}
            onMouseUp={(e) => popUp(e, styles.socialButtonPressed)}
            onMouseLeave={(e) => popUp(e, styles.socialButtonPressed)}
            onTouchStart={(e) => pressDown(e, styles.socialButtonPressed)}
            onTouchEnd={(e) => popUp(e, styles.socialButtonPressed)}
            onTouchCancel={(e) => popUp(e, styles.socialButtonPressed)}
          />
        </div>
        <div className={styles.socialContainer}>
          <Image
            preload
            className={`${styles.socialButton} ${styles.socialButtonRound}`}
            src="/social/github.png"
            height={50}
            width={50}
            alt="GitHub Profile"
            onClick={() => window.open("https://www.github.com/wesheg")}
            onMouseDown={(e) => pressDown(e, styles.socialButtonPressed)}
            onMouseUp={(e) => popUp(e, styles.socialButtonPressed)}
            onMouseLeave={(e) => popUp(e, styles.socialButtonPressed)}
            onTouchStart={(e) => pressDown(e, styles.socialButtonPressed)}
            onTouchEnd={(e) => popUp(e, styles.socialButtonPressed)}
            onTouchCancel={(e) => popUp(e, styles.socialButtonPressed)}
          />
        </div>
      </div>
      <div className={styles.mobileButtonContainer}>
        <MobileNavButton />
      </div>
    </nav>
  );
};
