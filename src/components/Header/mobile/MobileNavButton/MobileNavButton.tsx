"use client";

import styles from "./mobileNavButton.module.css";
import { useEffect, useRef } from "react";
import { useHeaderContext } from "@ui/components/Header/context";

export const MobileNavButton = () => {
  const { mobileNavOpen, setMobileNavOpen } = useHeaderContext();
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
  }, [mobileNavOpen]);

  /** Cleanup CSS classes before next button render */
  useEffect(() => {
    const topLineCopy = topLine.current;
    const middleLineCopy = middleLine.current;
    const bottomLineCopy = bottomLine.current;
    return () => {
      setTimeout(() => {
        topLineCopy?.classList.remove(styles.topLineOpen);
        middleLineCopy?.classList.remove(styles.middleLineOpen);
        bottomLineCopy?.classList.remove(styles.bottomLineOpen);
      }, 0);
    };
  }, []);

  return (
    <div
      className={styles.navButtonOuter}
      onClick={() => setMobileNavOpen((prev) => !prev)}
    >
      <div className={`${styles.line} ${styles.topLine}`} ref={topLine} />
      <div className={`${styles.line} ${styles.middleLine}`} ref={middleLine} />
      <div className={`${styles.line} ${styles.bottomLine}`} ref={bottomLine} />
    </div>
  );
};
