import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface UnicycleHeroGameProps {
  onBack: () => void;
}

const UnicycleHeroGame: React.FC<UnicycleHeroGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@8874e6849ea73acaedd853ff61ea04d981fce7dd/unicycle%20hero/">
    <meta charset="utf-8"> 
    <title>Unicycle Hero</title>
    <meta name="robots" content="noindex,nofollow" />
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="shortcut icon" type="image/png" href="./favicon.png">
    <script type="text/javascript" src="./Uni_Poki_CustomPreloader.js"></script>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
        #noncontent {
            background: #000000;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div id="noncontent"></div>
    <script type="text/javascript">
        window.addEventListener("touchmove", function(event) {
            event.preventDefault();
        }, {
            capture: false,
            passive: false
        });
        if (typeof window.devicePixelRatio != 'undefined' && window.devicePixelRatio > 2) {
            var meta = document.getElementById("viewport");
            meta.setAttribute('content', 'width=device-width, initial-scale=' + (2 / window.devicePixelRatio) + ', user-scalable=no');
        }
        lime.embed("Uni_Poki_CustomPreloader", "noncontent", 1160, 652);
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
            Unicycle Hero
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Unicycle Hero</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[600px]">
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0 rounded-lg"
                title="Unicycle Hero Game"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                Balance and ride your unicycle through challenging obstacles!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnicycleHeroGame;