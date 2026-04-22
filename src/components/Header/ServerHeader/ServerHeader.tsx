import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { HeaderContainer } from "../HeaderContainer/HeaderContainer";
import { Navigation } from "./Navigation/Navigation";

type ServerHeaderProps = {
  /** If true, renders the site title as h1 tag.
   * Defaults to false. */
  isHome?: boolean;
  mobileButton?: React.ReactNode;
};

export const ServerHeader = ({
  isHome = false,
  mobileButton,
}: ServerHeaderProps) => {
  const imgWidth = 65;

  const HeaderText: React.FC<{ children?: React.ReactNode }> = ({
    children,
  }) => {
    if (isHome) {
      return <h1 className={styles.headerTitleText}>{children}</h1>;
    }
    return <div className={styles.headerTitleText}>{children}</div>;
  };

  return (
    <HeaderContainer>
      <header className={styles.headerInner}>
        <Link className={styles.headerTitle} href="/">
          <Image
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
        <Navigation mobileButton={mobileButton} />
      </header>
    </HeaderContainer>
  );
};
