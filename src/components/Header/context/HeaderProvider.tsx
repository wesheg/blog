"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type HeaderProviderValues = {
  mobileNavOpen: boolean;
  setMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderContext = createContext({} as HeaderProviderValues);
export const useHeaderContext = () => useContext(HeaderContext);

/**
 * Context Provider for exposing nav menu state to several
 * sub-components of the <Header />.
 */
export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    return () => {
      setMobileNavOpen(false);
    };
  }, []);

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
