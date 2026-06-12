"use client";

import { HeaderProvider } from "./context";
import { HeaderClientWrapper } from "./HeaderClientWrapper/HeaderClientWrapper";
import { HeaderServerComponent } from "./HeaderServerComponent";
import { Suspense } from "react";

type ClientHeaderWrapperProps = {
  /** For SEO. If true, will wrap the site title in <h1> tag.
   * Set to `true` for the home page only
   * Defaults to false */
  useH1?: boolean;
};

export const Header = ({ useH1 }: ClientHeaderWrapperProps) => {
  const serverComponent = <HeaderServerComponent useH1={useH1} />;

  return (
    <HeaderProvider>
      <Suspense fallback={serverComponent}>
        <HeaderClientWrapper>{serverComponent}</HeaderClientWrapper>
      </Suspense>
    </HeaderProvider>
  );
};
