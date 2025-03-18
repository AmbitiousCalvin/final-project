import { createContext, useContext, useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import useToggle from "../hooks/useToggle";

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [isDarkMode, setDarkMode] = useDarkMode();
  const [isSidebarOpen, toggleSidebar] = useToggle(true);

  return (
    <LayoutContext.Provider
      value={{ isDarkMode, setDarkMode, isSidebarOpen, toggleSidebar }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
