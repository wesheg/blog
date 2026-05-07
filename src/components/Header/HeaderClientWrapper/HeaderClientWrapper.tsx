"use client";

import styles from "./headerClientWrapper.module.css";
import { useEffect, useRef } from "react";
import { MobileNavMenu } from "@ui/components/Header/mobile";
import { useHeaderContext } from "@ui/components/Header/context";

/**
 * Handles some basic styling & DOM manipulation based on the
 * `mobileNavOpen` state
 */
export const HeaderClientWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mobileNavOpen, setMobileNavOpen } = useHeaderContext();
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Close the mobile nav menu if the screen crosses the desktop threshold
   */
  useEffect(() => {
    const mobileBreakpoint = 1000;
    const handleResize = () => {
      if (window.innerWidth > mobileBreakpoint) {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setMobileNavOpen]);

  /**
   * Prevents a long-scrolling modal
   */
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "auto";
  }, [mobileNavOpen]);

  /**
   * Put a shadow under the header on vertical scroll
   */
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

  /** Hydrate the logo */
  useEffect(() => {
    const closeMenu = () => setMobileNavOpen(false);
    const siteLogo = ref.current?.querySelector("#site-logo");
    siteLogo?.addEventListener("click", closeMenu);
    return () => {
      siteLogo?.removeEventListener("click", closeMenu);
    };
  }, [setMobileNavOpen]);

  return (
    <div
      className={mobileNavOpen ? "modal-overlay" : styles.headerOuter}
      ref={ref}
    >
      {children}
      {mobileNavOpen && <MobileNavMenu />}
    </div>
  );
};
