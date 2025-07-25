import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';

interface HTMLGameProps {
  onBack: () => void;
  title: string;
  gameId: string;
}

const HTMLGameComponent = ({ onBack, title, gameId }: HTMLGameProps) => {
  const handleExtractGames = () => {
    toast.info("To play these HTML5 games, you need to extract the ZIP file to the public/games/ folder. Each game should have its own folder with an index.html file.", {
      duration: 8000,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Games
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {title}
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>{title} - HTML5 Game</CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <FolderOpen size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-4">Game Setup Required</h3>
              <p className="text-muted-foreground mb-6">
                This HTML5 game needs to be extracted from the ZIP file. Please extract the game files to the public/games/{gameId}/ folder and ensure there's an index.html file.
              </p>
              <div className="space-y-4">
                <Button onClick={handleExtractGames} className="w-full">
                  <FolderOpen size={16} className="mr-2" />
                  Setup Instructions
                </Button>
                <p className="text-sm text-muted-foreground">
                  Expected path: <code className="bg-muted px-2 py-1 rounded">public/games/{gameId}/index.html</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HTMLGameComponent;