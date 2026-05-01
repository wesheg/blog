import React, { createContext, useContext, useEffect, useState } from "react";

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
 * sub-components of the <Header />.
 * Also handles some basic styling & DOM manipulation based on the
 * open state.
 */
export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  /**
   * Prevents a long-scrolling modal
   */
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "auto";
  }, [mobileNavOpen]);

  /**
   * Close the mobile nav menu if the screen crosses the desktop threshold
   */
  useEffect(() => {
    const mobileBreakpoint = 1000;

    const handleResize = () => {
      if (window.innerWidth > mobileBreakpoint) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <HeaderContext.Provider
      value={{
        isHome: false, // TODO
        mobileNavOpen,
        setMobileNavOpen,
      }}
    >
      {mobileNavOpen ? (
        <div className="modal-overlay">{children}</div>
      ) : (
        children
      )}
    </HeaderContext.Provider>
  );
};
