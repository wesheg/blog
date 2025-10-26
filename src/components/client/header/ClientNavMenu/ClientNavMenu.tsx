"use client"

import styles from "./clientNavMenu.module.css";
import Link from "next/link";

export const ClientNavMenu = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navItem}>
        <Link href="/">about me</Link>
      </div>
      <div className={styles.navItem}>Hello</div>
    </div>
  );
}