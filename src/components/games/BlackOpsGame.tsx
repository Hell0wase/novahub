import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BlackOpsGameProps {
  onBack: () => void;
}

const BlackOpsGame: React.FC<BlackOpsGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: #121212;
            color: white;
            font-family: Arial, sans-serif;
        }
        #game-container {
            text-align: center;
            width: 100%;
            height: 100%;
        }
        #loading-progress {
            font-size: 18px;
            margin-top: 20px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            display: inline-block;
        }
    </style>
    <script>
        window.gameconfig = {
            name: "Call of Duty - Black Ops (USA)",
            url: "https://cdn.jsdelivr.net/gh/bubbls/ugss@6d4be6f9cce75077f2b28981623eaa057297dac7/Call%20of%20Duty%20-%20Black%20Ops%20(USA)/Call%20of%20Duty%20-%20Black%20Ops%20(USA).nds",
            core: "nds",
            min: 1,
            max: 4,
        };
    </script>
</head>
<body>
    <div id="game-container">
        <div id="game"></div>
        <div id="loading-progress">Loading: 0/0</div>
        <div id="first-time">First-time loading may take longer...</div>
    </div>
    <script>
        function mergeFiles(fileParts, cb) {
            return new Promise((resolve, reject) => {
                let buffers = [];
                function fetchPart(index) {
                    if (index >= fileParts.length) {
                        let mergedBlob = new Blob(buffers);
                        let mergedFileUrl = URL.createObjectURL(mergedBlob);
                        resolve(mergedFileUrl);
                        return;
                    }
                    fetch(fileParts[index])
                        .then((response) => response.arrayBuffer())
                        .then((data) => {
                            buffers.push(data);
                            fetchPart(index + 1);
                        })
                        .catch(reject);
                    cb(index);
                }
                fetchPart(0);
            });
        }
        
        function getParts(file, start, end) {
            let parts = [];
            for (let i = start; i <= end; i++) {
                parts.push(file + ".part" + i);
            }
            return parts;
        }
        
        var parts = getParts(window.gameconfig.url, window.gameconfig.min, window.gameconfig.max);
        var totalParts = parts.length;

        function updateLoadingProgress(loaded) {
            const progressElement = document.getElementById("loading-progress");
            if (loaded === 0) {
                progressElement.textContent = "Loading: 0/0";
            } else {
                progressElement.textContent = \`Loading: \${loaded}/\${totalParts}\`;
            }
        }

        Promise.all([mergeFiles(parts, updateLoadingProgress)])
            .then(([gameUrl]) => {
                document.getElementById("loading-progress").remove();
                document.getElementById("first-time").remove();
                EJS_player = "#game";
                EJS_core = window.gameconfig.core;
                EJS_gameName = window.gameconfig.name;
                EJS_color = "#0064ff";
                EJS_startOnLoaded = true;
                EJS_pathtodata = "https://cdn.jsdelivr.net/gh/genizy/emu@master/";
                EJS_gameUrl = gameUrl;
                const script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/gh/genizy/emu@master/loader.js";
                document.body.appendChild(script);
            })
            .catch((error) => {
                console.error(error);
                document.getElementById("loading-progress").textContent = "Error loading game.";
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
            Call of Duty: Black Ops
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Call of Duty: Black Ops</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[600px]">
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0 rounded-lg"
                title="Black Ops Game"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                Experience the intense action of Call of Duty: Black Ops!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlackOpsGame;