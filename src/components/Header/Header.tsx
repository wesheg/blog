"use client";

import { useState } from "react";
import { MobileNavButton, MobileNavMenu } from "./mobile";
import { HeaderProvider } from "./context";
import { HeaderClientWrapper } from "./HeaderClientWrapper/HeaderClientWrapper";
import { HeaderServerComponent } from "./HeaderServerComponent";

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
      <HeaderClientWrapper>
        <HeaderServerComponent
          useH1={useH1}
          mobileButton={
            <MobileNavButton
              open={mobileNavOpen}
              handleClick={() => setMobileNavOpen((prev) => !prev)}
            />
          }
        />
        {mobileNavOpen && <MobileNavMenu />}
      </HeaderClientWrapper>
    </HeaderProvider>
  );
};
