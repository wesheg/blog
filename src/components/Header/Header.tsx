"use client";

import React, { useCallback, useEffect, useState } from "react";
import { MobileNavMenu } from "./MobileNavMenu";
import { MobileNavButton } from "./MobileNavButton";
import { ServerHeader } from "./ServerHeader";

type ClientHeaderWrapperProps = {
  isHome?: boolean;
};

export const Header = ({ isHome }: ClientHeaderWrapperProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "auto";
  }, [mobileNavOpen]);

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

  const Wrapper = useCallback(
    (props: { open: boolean; children: React.ReactNode }) => {
      const { open, children } = props;
      return open ? (
        <div className="modal-overlay">{children}</div>
      ) : (
        <>{children}</>
      );
    },
    [],
  );

  return (
    <Wrapper open={mobileNavOpen}>
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
    </Wrapper>
  );
};
