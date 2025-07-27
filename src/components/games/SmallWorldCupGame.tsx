import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SmallWorldCupGameProps {
  onBack: () => void;
}

const SmallWorldCupGame: React.FC<SmallWorldCupGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html dir="ltr">
<head>
    <meta charset="UTF-8">
    <title>Small World Cup</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <style>
        body { margin: 0; padding: 0; overflow: hidden; background: #000; }
        #c2canvasdiv { width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center; }
        #c2canvas { width: 100%; height: 100%; max-width: 100%; max-height: 100%; }
    </style>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a25d711e6294241dd4ad89f5ef65dc6bf34fcb24/offlineclient.js"></script>
    <div id="c2canvasdiv">
        <canvas id="c2canvas">
            <h1>Your browser does not appear to support HTML5. Try upgrading your browser to the latest version.</h1>
        </canvas>
    </div>
    <script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a25d711e6294241dd4ad89f5ef65dc6bf34fcb24/2.1min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a25d711e6294241dd4ad89f5ef65dc6bf34fcb24/runtime.js"></script>
    <script>
        jQuery(document).ready(function () {
            cr_createRuntime("c2canvas");
        });
        
        function onVisibilityChanged() {
            if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden)
                cr_setSuspended(true);
            else
                cr_setSuspended(false);
        };
        
        document.addEventListener("visibilitychange", onVisibilityChanged, false);
        document.addEventListener("mozvisibilitychange", onVisibilityChanged, false);
        document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
        document.addEventListener("msvisibilitychange", onVisibilityChanged, false);
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
            Small World Cup
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Small World Cup</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[600px]">
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0 rounded-lg"
                title="Small World Cup Game"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                Play football with different countries in this fun World Cup simulation!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmallWorldCupGame;