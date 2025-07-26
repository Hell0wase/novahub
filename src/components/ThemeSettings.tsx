import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeSettings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { themeColor, setThemeColor, themes } = useTheme();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8">
          <Settings size={16} className="mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Palette size={20} className="mr-2" />
            Theme Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <h4 className="text-sm font-medium mb-3">Choose Theme Color</h4>
            <div className="grid grid-cols-3 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => setThemeColor(theme.value)}
                  className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    themeColor === theme.value 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border hover:border-border/80'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, hsl(${theme.primaryHsl}), hsl(189 94% 55%))`
                  }}
                >
                  <div className="text-white font-medium text-sm">
                    {theme.name}
                  </div>
                  {themeColor === theme.value && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-background rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4">
            <Button 
              onClick={() => setOpen(false)} 
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              Apply Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeSettings;