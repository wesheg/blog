"use client";

import React, { useCallback, useEffect, useState } from "react";
import { MobileNavButton, MobileNavMenu } from "./mobile";
import { HeaderProvider } from "./context";
import { HeaderDomWrapper } from "./HeaderDomWrapper/HeaderDomWrapper";
import { ServerHeader } from "./ServerHeader";

type ClientHeaderWrapperProps = {
  isHome?: boolean;
};

export const Header = ({ isHome }: ClientHeaderWrapperProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <HeaderProvider>
      <HeaderDomWrapper>
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
      </HeaderDomWrapper>
    </HeaderProvider>
  );
};
