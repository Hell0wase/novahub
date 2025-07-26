import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface SlopeGameProps {
  onBack: () => void;
}

const SlopeGame = ({ onBack }: SlopeGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ReneTirado14/lbannana@3ad5bf7eab1a47660acd8fbe0c24d1119c7a0b6d/html/slope/TemplateData/style.css">
        <style>
          body { margin: 0; padding: 0; overflow: hidden; background: #000; }
          .webgl-content { width: 100%; height: 100vh; }
          #gameContainer { width: 100vw; height: 100vh; }
        </style>
      </head>
      <body>
        <script src="https://cdn.jsdelivr.net/gh/ReneTirado14/lbannana@3ad5bf7eab1a47660acd8fbe0c24d1119c7a0b6d/html/slope/TemplateData/UnityProgress.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/ReneTirado14/lbannana@3ad5bf7eab1a47660acd8fbe0c24d1119c7a0b6d/html/slope/TemplateData/unityloader41.js"></script>
        <script>
          var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/ReneTirado14/lbannana@3ad5bf7eab1a47660acd8fbe0c24d1119c7a0b6d/html/slope/Build/slope.json", {
            onProgress: UnityProgress,
            Module: {
              onRuntimeInitialized: function() {
                UnityProgress(gameInstance, "complete");
              }
            }
          });
        </script>
        <script src="https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/addc4348-16c2-4645-9dff-f99b962e39ef%2Fscr.js"></script>
        <div class="webgl-content">
          <div id="gameContainer" style="width: 100vw; height: 100vh"></div>
        </div>
      </body>
      </html>
    `;

    if (iframeRef.current) {
      const blob = new Blob([gameHtml], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      iframeRef.current.src = blobUrl;

      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Games
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Slope
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Slope - Control the Rolling Ball</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                ref={iframeRef}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                title="Slope Game"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Use A/D or Left/Right arrow keys to control the ball. Avoid obstacles and survive as long as possible!</p>
        </div>
      </div>
    </div>
  );
};

export default SlopeGame;