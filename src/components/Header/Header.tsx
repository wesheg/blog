"use client"

import React, { useState } from "react";
import { MobileNavMenu } from "./MobileNavMenu";
import { MobileNavButton } from "./MobileNavButton";
import { ServerHeader } from "./ServerHeader";

type ClientHeaderWrapperProps = {
  isHome?: boolean;
}

export const Header = ({ isHome }: ClientHeaderWrapperProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <>
      { mobileNavOpen && <div className="modal-overlay" />}
      <ServerHeader
        isHome={isHome}
        mobileButton={
          <MobileNavButton
            open={mobileNavOpen}
            handleClick={() => setMobileNavOpen((prev) => !prev)}
            />
          }
        />
        { mobileNavOpen && <MobileNavMenu /> }
    </>
  );
}