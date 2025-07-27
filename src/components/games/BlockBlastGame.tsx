import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BlockBlastGameProps {
  onBack: () => void;
}

const BlockBlastGame: React.FC<BlockBlastGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en-us">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Block Blast Puzzle</title>
    <link rel="shortcut icon" href="https://cdn.jsdelivr.net/gh/genizy/bl/TemplateData/favicon.ico">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/genizy/bl/TemplateData/style.css">
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        #unity-container { width: 100%; height: 100vh; }
        #unity-canvas { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div id="unity-container">
        <canvas id="unity-canvas" tabindex="-1"></canvas>
        <div id="unity-loading-bar">
            <div id="unity-logo"></div>
            <div id="unity-progress-bar-empty">
                <div id="unity-progress-bar-full"></div>
            </div>
        </div>
        <div id="unity-warning"> </div>
    </div>
    <script>
        var container = document.querySelector("#unity-container");
        var canvas = document.querySelector("#unity-canvas");
        var loadingBar = document.querySelector("#unity-loading-bar");
        var progressBarFull = document.querySelector("#unity-progress-bar-full");
        var warningBanner = document.querySelector("#unity-warning");
        
        function unityShowBanner(msg, type) {
            function updateBannerVisibility() {
                warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
            }
            var div = document.createElement('div');
            div.innerHTML = msg;
            warningBanner.appendChild(div);
            if (type == 'error') div.style = 'background: red; padding: 10px;';
            else {
                if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
                setTimeout(function() {
                    warningBanner.removeChild(div);
                    updateBannerVisibility();
                }, 5000);
            }
            updateBannerVisibility();
        }
        
        var buildUrl = "https://cdn.jsdelivr.net/gh/genizy/bl/Build";
        var loaderUrl = buildUrl + "/BlockBlast1.1-8.loader.js";
        var config = {
            dataUrl: buildUrl + "/BlockBlast1.1-8.data.unityweb",
            frameworkUrl: buildUrl + "/BlockBlast1.1-8.framework.js.unityweb",
            codeUrl: buildUrl + "/BlockBlast1.1-8.wasm.unityweb",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "reun",
            productName: "Block Blast Puzzle",
            productVersion: "1.1",
            showBanner: unityShowBanner,
        };
        
        loadingBar.style.display = "block";
        var script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = () => {
            createUnityInstance(canvas, config, (progress) => {
                progressBarFull.style.width = 100 * progress + "%";
            }).then((unityInstance) => {
                loadingBar.style.display = "none";
            }).catch((message) => {
                alert(message);
            });
        };
        document.body.appendChild(script);
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
            Block Blast
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Block Blast</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[600px]">
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0 rounded-lg"
                title="Block Blast Game"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                A fun block puzzle game where you need to fill lines and clear the board!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlockBlastGame;