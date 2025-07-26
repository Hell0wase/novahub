import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  themeColor: string;
  setThemeColor: (color: string) => void;
  themes: { name: string; value: string; primaryHsl: string; }[];
}

const themes = [
  { name: 'Blue', value: 'blue', primaryHsl: '217 91% 60%' },
  { name: 'Green', value: 'green', primaryHsl: '142 76% 36%' },
  { name: 'Red', value: 'red', primaryHsl: '0 84% 60%' },
  { name: 'Purple', value: 'purple', primaryHsl: '271 81% 56%' },
  { name: 'Orange', value: 'orange', primaryHsl: '25 95% 53%' },
  { name: 'Pink', value: 'pink', primaryHsl: '330 81% 60%' },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColor, setThemeColor] = useState('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-color');
    if (savedTheme) {
      setThemeColor(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-color', themeColor);
    
    const theme = themes.find(t => t.value === themeColor);
    if (theme) {
      // Update CSS variables
      document.documentElement.style.setProperty('--primary', theme.primaryHsl);
      document.documentElement.style.setProperty('--theme-primary', theme.primaryHsl);
      document.documentElement.style.setProperty('--ring', theme.primaryHsl);
      
      // Update gradient with the new primary color
      const cyan = '189 94% 55%';
      document.documentElement.style.setProperty(
        '--gradient-primary', 
        `linear-gradient(135deg, hsl(${theme.primaryHsl}), hsl(${cyan}))`
      );
    }
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};