"use client";

import styles from "./mobileNavMenu.module.css";
import Link from "next/link";
import Image from "next/image";
import { popUp, pressDown } from "@ui/utils";
import { useHeaderContext } from "@ui/components/Header/context";
import { usePathname } from "next/navigation";

export const MobileNavMenu = () => {
  const { setMobileNavOpen } = useHeaderContext();
  const pathname = usePathname();
  const stayHere = (href: string) => {
    if (href === pathname) setMobileNavOpen(false);
  };

  return (
    <div className={styles.navContainer}>
      <Link
        href="/"
        className={`${styles.navItemContainer} ${styles.navLink}`}
        onClick={() => stayHere("/")}
      >
        home
      </Link>
      <Link
        href="/articles"
        className={`${styles.navItemContainer} ${styles.navLink}`}
        onClick={() => stayHere("/articles")} // TODO add articles page
      >
        articles
      </Link>
      <Link
        href="/about-me"
        className={`${styles.navItemContainer} ${styles.navLink}`}
        onClick={() => stayHere("/about-me")}
      >
        about me
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
