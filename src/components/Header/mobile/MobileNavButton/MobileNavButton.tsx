"use client";

import styles from "./mobileNavButton.module.css";
import { useEffect, useRef, useState } from "react";
import { useHeaderContext } from "@ui/components/Header/context";

export const MobileNavButton = () => {
  const { mobileNavOpen, setMobileNavOpen } = useHeaderContext();
  const [prevMobileNavOpen, setPrevMobileNavOpen] = useState(!mobileNavOpen);
  const topLine = useRef<HTMLDivElement>(null);
  const middleLine = useRef<HTMLDivElement>(null);
  const bottomLine = useRef<HTMLDivElement>(null);

  /** Apply CSS transition immediately after rerender */
  useEffect(() => {
    setTimeout(() => {
      if (mobileNavOpen) {
        topLine.current?.classList.add(styles.topLineOpen);
        middleLine.current?.classList.add(styles.middleLineOpen);
        bottomLine.current?.classList.add(styles.bottomLineOpen);
      } else {
        topLine.current?.classList.remove(styles.topLineOpen);
        middleLine.current?.classList.remove(styles.middleLineOpen);
        bottomLine.current?.classList.remove(styles.bottomLineOpen);
      }
    }, 0);
    setPrevMobileNavOpen(!mobileNavOpen);
  }, [mobileNavOpen]);

  return (
    <div
      className={styles.navButtonOuter}
      onClick={() => setMobileNavOpen((prev) => !prev)}
    >
      <div
        className={`${styles.line} ${styles.topLine} ${prevMobileNavOpen ? styles.topLineOpen : ""}`}
        ref={topLine}
      />
      <div
        className={`${styles.line} ${styles.middleLine} ${prevMobileNavOpen ? styles.middleLineOpen : ""}`}
        ref={middleLine}
      />
      <div
        className={`${styles.line} ${styles.bottomLine} ${prevMobileNavOpen ? styles.bottomLineOpen : ""}`}
        ref={bottomLine}
      />
    </div>
  );
};
