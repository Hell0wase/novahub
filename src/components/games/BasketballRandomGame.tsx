import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BasketballRandomGameProps {
  onBack: () => void;
}

const BasketballRandomGame: React.FC<BasketballRandomGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Basketball Random</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/style.css" type="text/css">
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        #game { width: 100%; height: 100vh; }
    </style>
</head>
<body>
    <div id="game"></div>
    <script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/box2d.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/suppoortcheck.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/offclient.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/main.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/registersw.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/api.js"></script>
    <script>
        window.addEventListener("keydown", function(e) {
            if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);
    </script>
</body>
</html>
    `;

    const blob = new Blob([gameHTML], { type: 'text/html' });
    const gameUrl = URL.createObjectURL(blob);

    if (iframeRef.current) {
      iframeRef.current.src = gameUrl;
    }

    return () => {
      URL.revokeObjectURL(gameUrl);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Games
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Basketball Random
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Basketball Random</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[600px]">
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0 rounded-lg"
                title="Basketball Random Game"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                Chaotic basketball game with random physics and mechanics!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BasketballRandomGame;