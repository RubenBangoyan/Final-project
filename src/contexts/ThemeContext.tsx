import React, { createContext, useState, useEffect } from "react";
import { StorageService } from "../services/StorageService";
import { THEME_STORAGE_KEY } from "../constants/storageKeys";

type ThemeContextType = {
  theme: string;
  handleClick: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = StorageService.getItem<string>(
      THEME_STORAGE_KEY,
      "string"
    );
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    StorageService.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function handleClick(): void {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, handleClick }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
