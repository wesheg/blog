"use client"

import React, { useState } from "react";
import { ClientNavMenu } from "./ClientNavMenu/ClientNavMenu";
import { NavigationButton } from "./NavigationButton/NavigationButton";
import { ServerHeader } from "@ui/components/server";

type ClientHeaderWrapperProps = {
  isHome?: boolean;
}

export const ClientHeader = ({ isHome }: ClientHeaderWrapperProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <>
      { mobileNavOpen && <div className="modal-overlay" />}
      <ServerHeader
        isHome={isHome}
        mobileButton={
          <NavigationButton
            open={mobileNavOpen}
            handleClick={() => setMobileNavOpen((prev) => !prev)}
            />
          }
        />
        { mobileNavOpen && <ClientNavMenu /> }
    </>
  );
}