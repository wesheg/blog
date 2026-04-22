"use client";
import React, { useEffect, useRef } from "react";
import styles from "./headerContainer.module.css";

type HeaderContainerProps = {
  children: React.ReactNode;
};

export const HeaderContainer = ({ children }: HeaderContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shadowOnScroll = () => {
      if (!ref.current) return;
      if (window.scrollY > 0) {
        ref.current.style.boxShadow = "0px 5px 10px -2px #d7d7d7";
      } else {
        ref.current.style.boxShadow = "none";
      }
    };
    shadowOnScroll();
    addEventListener("scroll", shadowOnScroll);

    return () => {
      removeEventListener("scroll", shadowOnScroll);
    };
  }, []);

  return (
    <div className={styles.headerOuter} ref={ref}>
      {children}
    </div>
  );
};
