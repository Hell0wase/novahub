import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface TombOfTheMaskGameProps {
  onBack: () => void;
}

const TombOfTheMaskGame: React.FC<TombOfTheMaskGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en-us">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Tomb of the Mask</title>
    <link href="https://cdn.jsdelivr.net/gh/lee2sman/everyday@d45d601d2c4d60adf809a0b677c00b7d12aba7e9/96/TemplateData/style.css" rel="stylesheet">
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        .webgl-content { width: 100%; height: 100vh; }
        #gameContainer { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/gh/lee2sman/everyday@d45d601d2c4d60adf809a0b677c00b7d12aba7e9/96/TemplateData/UnityProgress.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/topvaz/gfiles1@738d9cb2953428620c44ba7cdb62705b6540bb00/tomb-of-the-mask/d5fuh3d/UnityLoader.js"></script>
    <div class="webgl-content">
        <div id="gameContainer" style="width: 100vw; height: 100vh; background: rgb(35, 31, 32);">
            <canvas id="#canvas" style="width: 100%; height: 100%;"></canvas>
            <div class="logo Dark"></div>
            <div class="progress Dark">
                <div class="empty"></div>
                <div class="full"></div>
            </div>
        </div>
    </div>
    <script>
        var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/topvaz/gfiles1@738d9cb2953428620c44ba7cdb62705b6540bb00/tomb-of-the-mask/d5fuh3d/totm.json", {
            onProgress: UnityProgress,
            Module: {
                onRuntimeInitialized: function() {
                    UnityProgress(gameInstance, "complete");
                }
            }
        });
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
            Tomb of the Mask
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Tomb of the Mask</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[600px]">
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0 rounded-lg"
                title="Tomb of the Mask Game"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                Navigate the tomb with your magical mask in this retro-style adventure!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TombOfTheMaskGame;