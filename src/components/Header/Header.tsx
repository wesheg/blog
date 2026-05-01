"use client";

import { useState } from "react";
import { MobileNavButton, MobileNavMenu } from "./mobile";
import { HeaderProvider } from "./context";
import { HeaderDomWrapper } from "./HeaderDomWrapper/HeaderDomWrapper";
import { ServerHeader } from "./ServerHeader";

type ClientHeaderWrapperProps = {
  /** For SEO. If true, will wrap the site title in <h1> tag.
   * Set to `true` for the home page only
   * Defaults to false */
  useH1?: boolean;
};

export const Header = ({ useH1 }: ClientHeaderWrapperProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <HeaderProvider>
      <HeaderDomWrapper>
        <ServerHeader
          useH1={useH1}
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
