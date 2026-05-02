import styles from "./navigation.module.css";
import Image from "next/image";
import Link from "next/link";
import { MobileNavButton } from "@ui/components/Header/mobile";

export const Navigation = () => {
  return (
    <nav className={styles.navigationContainer}>
      <div className={styles.serverContainer}>
        <ul className={styles.navigationList}>
          <li className={styles.navigationOption}>
            <Link href="/about-me">about me</Link>
          </li>
          <li className={styles.navigationOption}>
            <Link href="/">blog</Link>
          </li>
        </ul>
        <div className={styles.socialContainer}>
          <Image
            className={styles.socialButton}
            src="/social/linkedin.png"
            height={50}
            width={50}
            alt="LinkedIn Profile"
            onClick={() =>
              window.open("https://www.linkedin.com/in/wes-heginbotham-cfa")
            }
            onMouseDown={(e) =>
              (e.target as Element).classList.add(styles.socialButtonPressed)
            }
            onMouseUp={(e) =>
              (e.target as Element).classList.remove(styles.socialButtonPressed)
            }
            onMouseLeave={(e) =>
              (e.target as Element).classList.remove(styles.socialButtonPressed)
            }
          />
        </div>
      </div>
      <div className={styles.mobileButtonContainer}>
        <MobileNavButton />
      </div>
    </nav>
  );
};
