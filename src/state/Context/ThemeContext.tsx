import React, { createContext, useContext, useMemo } from 'react';
import { ThemeContextProps, ThemeProviderProps } from './types';

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({
  children,
  colorKey,
  hex,
}: ThemeProviderProps) => {
  const value = useMemo(() => ({ colorKey, hex }), [colorKey, hex]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
