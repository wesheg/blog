"use client";

import styles from "./mobileNavMenu.module.css";
import Link from "next/link";
import Image from "next/image";

export const MobileNavMenu = () => {
  return (
    <div className={styles.navContainer}>
      <Link href="/" className={`${styles.navItemContainer} ${styles.navLink}`}>
        home
      </Link>
      <Link
        href="/about-me"
        className={`${styles.navItemContainer} ${styles.navLink}`}
      >
        about me
      </Link>
      <Link href="/" className={`${styles.navItemContainer} ${styles.navLink}`}>
        blog
      </Link>
      <div className={`${styles.navItemContainer} ${styles.socialOuter}`}>
        <div className={styles.socialInner}>
          <Image
            className={styles.socialButton}
            src="/social/linkedin.png"
            height={60}
            width={60}
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
    </div>
  );
};
