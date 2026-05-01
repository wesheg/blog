import React, { createContext, useContext, useState } from "react";

type MobileNavProviderValues = {
  mobileNavOpen: boolean;
  setMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileNavContext = createContext({} as MobileNavProviderValues);
export const useMobileNavContext = () => useContext(MobileNavContext);

type MobileNavProviderProps = {
  children: React.ReactNode;
};

/**
 * Context Provider for exposing nav menu state to several
 * sub-components of the <Header />
 */
export const MobileNavProvider = ({ children }: MobileNavProviderProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <MobileNavContext.Provider
      value={{
        mobileNavOpen,
        setMobileNavOpen,
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
};
