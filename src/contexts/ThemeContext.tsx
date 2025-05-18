import React, { createContext, useState } from 'react';

type ThemeContextType = {
  theme: string;
  handleCLick: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState('light');

  function handleCLick(): void {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ handleCLick, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
