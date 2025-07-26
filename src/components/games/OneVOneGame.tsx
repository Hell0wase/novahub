import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface OneVOneGameProps {
  onBack: () => void;
}

const OneVOneGame = ({ onBack }: OneVOneGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 0; overflow: hidden; background: #000; }
          .webgl-content { width: 100%; height: 100vh; }
          #gameContainer { width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; position: relative; background: rgb(0, 0, 0); }
          canvas { width: 100%; height: 100%; cursor: default; }
        </style>
      </head>
      <body>
        <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/UnityProgress.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.js"></script>
        <script type="text/javascript">
          var gameInstance;
          window.onload = function () {
            gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.json", {
              onProgress: UnityProgress,
              Module: {
                onRuntimeInitialized: function () {
                  UnityProgress(gameInstance, "complete");
                },
              },
            });
          };
        </script>
        <div class="webgl-content">
          <div id="gameContainer" style="width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; position: relative; background: rgb(0, 0, 0);">
            <canvas id="#canvas" style="width: 100%; height: 100%; cursor: default;"></canvas>
            <div class="logo Dark" style="display: none;"></div>
            <div class="progress Dark" style="display: none;">
              <div class="empty" style="width: 0%;"></div>
              <div class="full" style="width: 100%;"></div>
            </div>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1firebase-app.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1firebase-auth.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1firebase-firestore.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1firebase.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1login.js?v=2"></script>
        <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1firestore.js"></script>
        <script>
          initializeFireBase();
          function showAds() { console.log("show ads"); }
          function requestNewAd() { unityAdFinishedCallback(); }
          function unityAdFinishedCallback() {
            try {
              if (gameInstance) gameInstance.SendMessage("AdsManager", "OnWebCallback");
            } catch (error) {
              console.log(error);
            }
          }
        </script>
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
            1v1.LOL
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>1v1.LOL - Battle Royale Building Game</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                ref={iframeRef}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                title="1v1.LOL Game"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>WASD to move, mouse to aim, left click to shoot, right click to aim. Build with Q, E, R, T!</p>
        </div>
      </div>
    </div>
  );
};

export default OneVOneGame;