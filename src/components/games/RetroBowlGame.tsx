import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface RetroBowlGameProps {
  onBack: () => void;
}

const RetroBowlGame = ({ onBack }: RetroBowlGameProps) => {
  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Games
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Retro Bowl
          </h1>
          <Button variant="outline" size="sm" className="ml-auto" onClick={() => window.open('https://retrobowl.fun/', '_blank')}>
            <ExternalLink size={16} className="mr-2" />
            Open Full Screen
          </Button>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Retro Bowl - American Football Management</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://retrobowl.fun/games/retro-bowl/index.php"
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allowFullScreen
                title="Retro Bowl Game"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Manage your football team and lead them to victory! Use mouse/touch to play.</p>
        </div>
      </div>
    </div>
  );
};

export default RetroBowlGame;