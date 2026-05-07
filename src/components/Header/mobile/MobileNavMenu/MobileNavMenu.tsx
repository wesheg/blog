"use client";

import styles from "./mobileNavMenu.module.css";
import Link from "next/link";
import Image from "next/image";
import { popUp, pressDown } from "@ui/utils";
import { useHeaderContext } from "@ui/components/Header/context";

export const MobileNavMenu = () => {
  const { setMobileNavOpen } = useHeaderContext();

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
            preload
            className={styles.socialButton}
            src="/social/linkedin.png"
            height={60}
            width={60}
            alt="LinkedIn Profile"
            onClick={() => {
              window.open("https://www.linkedin.com/in/wes-heginbotham-cfa");
              setMobileNavOpen(false);
            }}
            onMouseDown={(e) => pressDown(e, styles.socialButtonPressed)}
            onMouseUp={(e) => popUp(e, styles.socialButtonPressed)}
            onMouseLeave={(e) => popUp(e, styles.socialButtonPressed)}
            onTouchStart={(e) => pressDown(e, styles.socialButtonPressed)}
            onTouchEnd={(e) => popUp(e, styles.socialButtonPressed)}
          />
          <Image
            preload
            className={`${styles.socialButton} ${styles.socialButtonRound}`}
            src="/social/github.png"
            height={60}
            width={60}
            alt="GitHub Profile"
            onClick={() => {
              window.open("https://www.github.com/wesheg");
              setMobileNavOpen(false);
            }}
            onMouseDown={(e) => pressDown(e, styles.socialButtonPressed)}
            onMouseUp={(e) => popUp(e, styles.socialButtonPressed)}
            onMouseLeave={(e) => popUp(e, styles.socialButtonPressed)}
            onTouchStart={(e) => pressDown(e, styles.socialButtonPressed)}
            onTouchEnd={(e) => popUp(e, styles.socialButtonPressed)}
          />
        </div>
      </div>
      <div className={`${styles.navItemContainer} ${styles.socialOuter}`}>
        <div className={styles.socialInner}></div>
      </div>
    </div>
  );
};
