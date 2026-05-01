"use client";

import { useEffect } from "react";
import { useHeaderContext } from "@ui/components/Header/context";

/**
 * Handles some basic styling & DOM manipulation based on the
 * `mobileNavOpen` state
 */
export const HeaderClientWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mobileNavOpen, setMobileNavOpen } = useHeaderContext();

  /**
   * Prevents a long-scrolling modal
   */
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "auto";
  }, [mobileNavOpen]);

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

  if (mobileNavOpen) {
    return <div className="modal-overlay">{children}</div>;
  }

  return <>{children}</>;
};
