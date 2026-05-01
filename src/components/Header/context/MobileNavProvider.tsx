import React, { createContext, useContext, useState } from "react";

type HeaderProviderValues = {
  isHome: boolean;
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
 * sub-components of the <Header />
 */
export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <HeaderContext.Provider
      value={{
        isHome: false, // TODO
        mobileNavOpen,
        setMobileNavOpen,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
