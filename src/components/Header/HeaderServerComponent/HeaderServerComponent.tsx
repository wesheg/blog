import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "./Navigation/Navigation";

type HeaderServerComponentProps = {
  /** For SEO. If true, will wrap the site title in <h1> tag.
   * Set to `true` for the home page only
   * Defaults to false */
  useH1?: boolean;
};

export const HeaderServerComponent = ({
  useH1 = false,
}: HeaderServerComponentProps) => {
  const imgWidth = 65;

  const HeaderText: React.FC<{ children?: React.ReactNode }> = ({
    children,
  }) => {
    if (useH1) {
      return <h1 className={styles.headerTitleText}>{children}</h1>;
    }
    return <div className={styles.headerTitleText}>{children}</div>;
  };

  return (
    <header className={styles.headerInner}>
      <Link className={styles.headerTitle} href="/">
        <Image
          preload
          className={styles.headerAvatar}
          src="/avatars/header.svg"
          width={imgWidth}
          height={imgWidth * 1.5}
          alt="site logo"
        />
        <HeaderText>
          <span className={styles.headerTextDeemphasized}>wesheg&apos;s</span>{" "}
          blog
        </HeaderText>
      </Link>
      <Navigation />
    </header>
  );
};
