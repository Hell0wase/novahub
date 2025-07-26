import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';

interface FullscreenGameProps {
  children: React.ReactNode;
  gameName: string;
  onBack: () => void;
}

const FullscreenGame: React.FC<FullscreenGameProps> = ({ children, gameName, onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Top taskbar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-background/95 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-4 z-10">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-8">
            <ArrowLeft size={16} className="mr-1" />
            Back to Games
          </Button>
          <span className="text-sm font-medium text-muted-foreground">|</span>
          <span className="text-sm font-medium">{gameName}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onBack} className="h-8">
          <X size={16} />
        </Button>
      </div>
      
      {/* Game content */}
      <div className="absolute inset-0 pt-12">
        {children}
      </div>
    </div>
  );
};

export default FullscreenGame;