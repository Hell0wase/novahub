import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface BasketballStarsGameProps {
  onBack: () => void;
}

const BasketballStarsGame = ({ onBack }: BasketballStarsGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Stypical/lacklack@0959ed15fc96078cbb053e4e3c259a62b3e9e296/basketball-stars/assets/css/app.css" type="text/css" />
        <title>Basketball Legends</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style>
          body { margin: 0; padding: 0; overflow: hidden; background: #000; }
          #content { width: 100%; height: 100vh; }
          #orientation { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
          #loader { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; }
        </style>
      </head>
      <body>
        <div id="content"></div>
        <div id="orientation"></div>
        <div id="loader">Loading ...</div>
        <script type="text/javascript" src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Stypical/lacklack@0959ed15fc96078cbb053e4e3c259a62b3e9e296/basketball-stars/assets/box2dweb/nape.min.js">
          var nape = "nape.min.js";
        </script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Stypical/lacklack@0959ed15fc96078cbb053e4e3c259a62b3e9e296/basketball-stars/assets/box2dweb/nape-debug-draw.min.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Stypical/lacklack@0959ed15fc96078cbb053e4e3c259a62b3e9e296/basketball-stars/assets/box2dweb/jquery-3.1.1.min.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Stypical/lacklack@0959ed15fc96078cbb053e4e3c259a62b3e9e296/basketball-stars/assets/box2dweb/easeljs-0.8.2.combined.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Stypical/lacklack@0959ed15fc96078cbb053e4e3c259a62b3e9e296/basketball-stars/assets/box2dweb/bluebird.min.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/bobydob/JSEngine@8fbc9ed4a32c499529f5274425c33001f7726887/build/bs/bs.min.js"></script>
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
            Basketball Stars
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Basketball Stars - Multiplayer Basketball</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                ref={iframeRef}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                title="Basketball Stars Game"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Use WASD keys to move and space to shoot. Play 1v1 or tournaments!</p>
        </div>
      </div>
    </div>
  );
};

export default BasketballStarsGame;