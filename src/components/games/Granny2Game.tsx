import React, { useRef, useEffect } from 'react';

interface Granny2GameProps {
  onBack: () => void;
}

const Granny2Game: React.FC<Granny2GameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en-us">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Unity WebGL Player | Granny 2</title>
    <link rel="shortcut icon" href="https://cdn.jsdelivr.net/gh/forms-docs-slides-glgl/ngng@main/TemplateData/favicon.ico"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bubbls/ruffle@895d0224580381ddd003fc2ab72afead3cf134ad/john.css"/>
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        #unity-container { position: absolute; width: 100%; height: 100%; }
        #unity-canvas { position: absolute; width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div id="unity-container">
        <canvas id="unity-canvas"></canvas>
        <div id="unity-loading-bar">
            <div id="unity-logo"></div>
            <div id="unity-progress-bar-empty">
                <div id="unity-progress-bar-full"></div>
            </div>
        </div>
        <div id="unity-warning"></div>
    </div>
    <script>
        async function initializeGame() {
            var buildUrl = "https://cdn.jsdelivr.net/gh/forms-docs-slides-glgl/ngng@main/Build";
            var loaderUrl = buildUrl + "/Granny 2.loader.js";
            var config = {
                dataUrl: buildUrl + "/Granny 2.data",
                frameworkUrl: buildUrl + "/Granny 2.frameworkx.js",
                codeUrl: buildUrl + "/Granny 2.wasm",
                streamingAssetsUrl: "StreamingAssets",
                companyName: "Awesome",
                productName: "Granny 2",
                productVersion: "1.0"
            };
            var script = document.createElement("script");
            script.src = loaderUrl;
            document.body.appendChild(script);
        }
        initializeGame();
    </script>
</body>
</html>`;

    const blob = new Blob([gameHTML], { type: 'text/html' });
    const gameUrl = URL.createObjectURL(blob);

    if (iframeRef.current) {
      iframeRef.current.src = gameUrl;
    }

    return () => URL.revokeObjectURL(gameUrl);
  }, []);

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Granny 2 Game"
      />
    </div>
  );
};

export default Granny2Game;