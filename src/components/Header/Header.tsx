"use client";

import React, { useEffect, useState } from "react";
import { MobileNavMenu } from "./MobileNavMenu";
import { MobileNavButton } from "./MobileNavButton";
import { ServerHeader } from "./ServerHeader";

type ClientHeaderWrapperProps = {
  isHome?: boolean;
};

export const Header = ({ isHome }: ClientHeaderWrapperProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  /**
   * Remove the open state when changing screen sizes.
   */
  useEffect(() => {
    const breakpointPxWidth = 1000;

    const cb = () => {
      if (window.innerWidth <= breakpointPxWidth) return;
      setMobileNavOpen(false);
    };
    window.addEventListener("resize", cb);
    return () => {
      window.removeEventListener("resize", cb);
    };
  }, []);

  return (
    <>
      {mobileNavOpen && <div className="modal-overlay" />}
      <ServerHeader
        isHome={isHome}
        mobileButton={
          <MobileNavButton
            open={mobileNavOpen}
            handleClick={() => setMobileNavOpen((prev) => !prev)}
          />
        }
      />
      {mobileNavOpen && <MobileNavMenu />}
    </>
  );
};
