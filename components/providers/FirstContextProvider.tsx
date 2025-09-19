"use client";
import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  isFirstLoad: boolean;
  setIsFirstLoad: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  return (
    <AppContext.Provider value={{ isFirstLoad, setIsFirstLoad }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used inside AppProvider");
  return context;
};
