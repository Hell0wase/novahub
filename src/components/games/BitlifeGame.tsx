import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BitlifeGameProps {
  onBack: () => void;
}

const BitlifeGame: React.FC<BitlifeGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en-us">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>BitLife - Life Simulator</title>
    <style>
        body{font-family:"Myriad Pro", Myriad ,"Helvetica Neue",Helvetica,Arial,sans-serif}
        body{margin:0;padding:0;position:absolute;height:100%;width:100%;background-size:cover;font-style:regular;font-family:"Myriad Pro", Myriad ,"Helvetica Neue",Helvetica,Arial,sans-serif}
        .webgl-content{background:#333;padding:0;position:absolute;height:100vh;width:100vw}
        canvas{position:absolute;height:100%;width:100%}
        #gameContainer{position:absolute;height:100%;width:100%}
        .webgl-content *{border:0;margin:0;padding:0}
        .webgl-content{height:100%;width:100%}
    </style>
    <script src="https://cdn.jsdelivr.net/gh/a456pur/seraph@ae2fcc6d6a9cd051654fcc0519080db1f79cf2a7/games/bitlife/TemplateData/UnityProgress.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/a456pur/seraph@ae2fcc6d6a9cd051654fcc0519080db1f79cf2a7/games/bitlife/Build/UnityLoader.js"></script>
</head>
<body>
    <div class="webgl-content">
        <div id="gameContainer" style="width: 100%; height: 100%;"></div>
    </div>
    <script>
        var unityInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/a456pur/seraph@ae2fcc6d6a9cd051654fcc0519080db1f79cf2a7/games/bitlife/Build/BitLife.json", {onProgress: UnityProgress});
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
            BitLife
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>BitLife - Life Simulator</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[600px]">
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0 rounded-lg"
                title="BitLife Game"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                Live a virtual life and make choices that shape your character's destiny!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BitlifeGame;