import React from "react";
import styles from "./header.module.css";
import Image from "next/image";

type HeaderProps = {
  /** If true, renders the site title as h1 tag. 
   * Defaults to false. */
  isHome?: boolean;
}

export const Header = ({ isHome = false }: HeaderProps) => {
  const imgWidth = 65;
  const imgHeight = imgWidth * 1.5;

  const HeaderText: React.FC<{children?: React.ReactNode}> = ({ children }) => {
    if (isHome) {
      return <h1 className={styles.headerTitleText}>{children}</h1>
    }
    return <div className={styles.headerTitleText}>{children}</div>
  }

  return (
    <header className={styles.blogHeader} style={{ marginBottom: imgHeight / 2}}>
      <div className={styles.headerTitle}>
        <div style={{ width: imgWidth }}>
          <Image className={styles.headerAvatar} src="/avatars/header.svg" width={imgWidth} height={imgWidth * 1.5} alt="site logo"/>
        </div>
        <HeaderText><span className={styles.headerTextDeemphasized}>wesheg&apos;s</span> blog</HeaderText>
      </div>
      <nav className={styles.headerNav}>
        <ul>
          <li>home</li>
          <li>about me</li>
          <li>blog</li>
          <Image src="/social/linkedin.png" height={50} width={50} alt="LinkedIn Profile" />
          <Image src="/social/bluesky.png" height={50} width={50} alt="LinkedIn Profile" />
        </ul>
      </nav>
    </header>
  );
}