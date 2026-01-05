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
      <Link href="/" className={`${styles.navItemContainer} ${styles.navLink}`}>
        projects
      </Link>
      <div className={`${styles.navItemContainer} ${styles.socialOuter}`}>
        <div className={styles.socialInner}>
          <Link
            href="https://www.linkedin.com/in/wes-heginbotham-cfa"
            className={styles.navigationSocial}
            target="_blank"
          >
            <Image
              src="/social/linkedin.png"
              height={75}
              width={75}
              alt="LinkedIn Profile"
            />
          </Link>
          <Link
            href="https://bsky.app/profile/wesheg.bsky.social"
            className={styles.navigationSocial}
            target="_blank"
          >
            <Image
              className={styles.navigationOption}
              src="/social/bluesky.png"
              height={75}
              width={75}
              alt="LinkedIn Profile"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
