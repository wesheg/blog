"use client";

import React, { createContext, useContext, useState } from "react";

type HeaderProviderValues = {
  mobileNavOpen: boolean;
  setMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderContext = createContext({} as HeaderProviderValues);
export const useHeaderContext = () => useContext(HeaderContext);

type HeaderProviderProps = {
  children: React.ReactNode;
};

/**
 * Context Provider for exposing nav menu state to several
 * sub-components of the <Header />.
 */
export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <HeaderContext.Provider
      value={{
        mobileNavOpen,
        setMobileNavOpen,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
