import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface GrannyGameProps {
  onBack: () => void;
}

const GrannyGame = ({ onBack }: GrannyGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const grannyHTML = `
        <!DOCTYPE html>
        <html lang="en-us">
        <head>
            <title>Granny Original</title>
            <meta charset="utf-8">
            <meta name="robots" content="noindex, nofollow">
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bubbls/granny@212c543a85b243c4a0b92211f557e760d83d2292/TemplateData/style.css">
            <script src="https://cdn.jsdelivr.net/gh/bubbls/granny@212c543a85b243c4a0b92211f557e760d83d2292/sdk.js"></script>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    background: url('https://cdn.jsdelivr.net/gh/gru6nny/ohd@main/background.png') no-repeat center center fixed;
                    background-size: cover;
                }
                #unity-container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                }
                #unity-loading-bar {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 400px;
                    height: 20px;
                    background: rgba(0, 0, 0, 0.5);
                    border: 2px solid #ffffff;
                    border-radius: 10px;
                    display: block;
                }
                #unity-logo {
                    position: absolute;
                    top: calc(50% - 100px);
                    left: 50%;
                    transform: translateX(-50%);
                    width: 200px;
                    height: auto;
                }
                #unity-progress-bar-empty {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
                #unity-progress-bar-full {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 0%;
                    height: 100%;
                    background: #4caf50;
                    border-radius: 8px;
                    transition: width 0.3s ease;
                }
                #unity-warning {
                    position: absolute;
                    left: 50%;
                    top: 5%;
                    transform: translate(-50%);
                    background: white;
                    padding: 10px;
                    display: none;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div id="unity-container">
                <canvas id="unity-canvas" style="position: absolute; width: 100%; height: 100%"></canvas>
                <div id="unity-loading-bar">
                    <div id="unity-logo"></div>
                    <div id="unity-progress-bar-empty">
                        <div id="unity-progress-bar-full"></div>
                    </div>
                </div>
                <div id="unity-warning"></div>
            </div>
            <script>
                async function mergeUnityWebFiles(baseUrl, filePrefix, totalParts, extension) {
                    const partUrls = [];
                    for (let i = 1; i <= totalParts; i++) {
                        partUrls.push(\`\${baseUrl}/\${filePrefix}_part\${i}.\${extension}\`);
                    }

                    const buffers = [];
                    for (let i = 0; i < totalParts; i++) {
                        const response = await fetch(partUrls[i]);
                        if (!response.ok) {
                            throw new Error(\`Failed to load part: \${partUrls[i]}\`);
                        }
                        const buffer = await response.arrayBuffer();
                        buffers.push(buffer);

                        const progress = ((i + 1) / totalParts) * 100;
                        document.querySelector("#unity-progress-bar-full").style.width = \`\${progress}%\`;
                    }

                    const totalLength = buffers.reduce((acc, buffer) => acc + buffer.byteLength, 0);
                    const combinedBuffer = new Uint8Array(totalLength);
                    let offset = 0;

                    buffers.forEach((buffer) => {
                        combinedBuffer.set(new Uint8Array(buffer), offset);
                        offset += buffer.byteLength;
                    });

                    return combinedBuffer;
                }

                var container = document.querySelector("#unity-container");
                var canvas = document.querySelector("#unity-canvas");
                var loadingBar = document.querySelector("#unity-loading-bar");
                var progressBarFull = document.querySelector("#unity-progress-bar-full");
                var warningBanner = document.querySelector("#unity-warning");

                let myGameInstance = null;

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

                var buildUrl = "https://cdn.jsdelivr.net/gh/gru6nny/ohd@main/Build";
                var loaderUrl = buildUrl + "/Granny.loader.js";

                async function initializeGame() {
                    try {
                        const dataBuffer = await mergeUnityWebFiles(buildUrl, "Granny", 2, "data");
                        const wasmBuffer = await mergeUnityWebFiles(buildUrl, "Granny", 2, "wasm");

                        const dataBlobUrl = URL.createObjectURL(new Blob([dataBuffer], { type: "application/octet-stream" }));
                        const wasmBlobUrl = URL.createObjectURL(new Blob([wasmBuffer], { type: "application/octet-stream" }));

                        var config = {
                            dataUrl: dataBlobUrl,
                            frameworkUrl: buildUrl + "/Granny.framework.js",
                            codeUrl: wasmBlobUrl,
                            streamingAssetsUrl: "https://cdn.jsdelivr.net/gh/gru6nny/ohd@main/StreamingAssets",
                            companyName: "Anastasia Kazantseva",
                            productName: "Granny",
                            productVersion: "1.0",
                            showBanner: unityShowBanner,
                        };

                        var script = document.createElement("script");
                        script.src = loaderUrl;
                        script.onload = () => {
                            createUnityInstance(canvas, config, (progress) => {
                                progressBarFull.style.width = 100 * progress + "%";
                            }).then((unityInstance) => {
                                myGameInstance = unityInstance;
                                loadingBar.style.display = "none";
                            }).catch((message) => {
                                alert(message);
                            });
                        };

                        document.body.appendChild(script);
                    } catch (error) {
                        console.error("Game initialization failed:", error);
                    }
                }

                initializeGame();
            </script>
        </body>
        </html>
      `;

      // Create a blob URL for the HTML content
      const blob = new Blob([grannyHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;

      // Cleanup function to revoke the blob URL
      return () => {
        URL.revokeObjectURL(url);
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
            Granny Horror
          </h1>
          <Button variant="outline" size="sm" className="ml-auto" onClick={() => window.open('https://granny-horror.github.io/', '_blank')}>
            <ExternalLink size={16} className="mr-2" />
            Open Full Screen
          </Button>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Granny - Escape the House</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                ref={iframeRef}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allowFullScreen
                title="Granny Horror Game"
                allow="gamepad; microphone; camera"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Use WASD to move, mouse to look around. Find items to escape Granny's house!</p>
        </div>
      </div>
    </div>
  );
};

export default GrannyGame;