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
  { name: 'Cyan', value: 'cyan', primaryHsl: '189 94% 55%' },
  { name: 'Yellow', value: 'yellow', primaryHsl: '45 93% 58%' },
  { name: 'Teal', value: 'teal', primaryHsl: '173 80% 40%' },
  { name: 'Indigo', value: 'indigo', primaryHsl: '239 84% 67%' },
  { name: 'Rose', value: 'rose', primaryHsl: '346 77% 49%' },
  { name: 'Emerald', value: 'emerald', primaryHsl: '160 84% 39%' },
  { name: 'Violet', value: 'violet', primaryHsl: '262 83% 58%' },
  { name: 'Amber', value: 'amber', primaryHsl: '43 96% 56%' },
  { name: 'Lime', value: 'lime', primaryHsl: '84 81% 44%' },
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
      // Update CSS variables for comprehensive color changes
      document.documentElement.style.setProperty('--primary', theme.primaryHsl);
      document.documentElement.style.setProperty('--theme-primary', theme.primaryHsl);
      document.documentElement.style.setProperty('--ring', theme.primaryHsl);
      
      // Update gradients with the new primary color
      const cyan = '189 94% 55%';
      document.documentElement.style.setProperty(
        '--gradient-primary', 
        `linear-gradient(135deg, hsl(${theme.primaryHsl}), hsl(${cyan}))`
      );
      
      // Update neon glow effects to use theme color
      document.documentElement.style.setProperty(
        '--neon-glow', 
        `0 0 5px hsl(${theme.primaryHsl}), 0 0 10px hsl(${theme.primaryHsl}), 0 0 15px hsl(${theme.primaryHsl}), 0 0 20px hsl(${theme.primaryHsl})`
      );
      document.documentElement.style.setProperty(
        '--neon-glow-strong', 
        `0 0 10px hsl(${theme.primaryHsl}), 0 0 20px hsl(${theme.primaryHsl}), 0 0 30px hsl(${theme.primaryHsl}), 0 0 40px hsl(${theme.primaryHsl})`
      );
      document.documentElement.style.setProperty(
        '--neon-border', 
        `1px solid hsl(${theme.primaryHsl} / 0.8)`
      );
      document.documentElement.style.setProperty(
        '--shadow-glow', 
        `0 0 40px hsl(${theme.primaryHsl} / 0.3)`
      );
      document.documentElement.style.setProperty(
        '--shadow-neon', 
        `0 0 20px hsl(${theme.primaryHsl} / 0.4)`
      );
    }
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};