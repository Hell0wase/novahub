import React, { useRef, useEffect } from 'react';

interface RooftopSnipersGameProps {
  onBack: () => void;
}

const RooftopSnipersGame: React.FC<RooftopSnipersGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en-us">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Rooftop Snipers</title>
    <link href="https://cdn.jsdelivr.net/gh/lee2sman/everyday@d45d601d2c4d60adf809a0b677c00b7d12aba7e9/96/TemplateData/style.css" rel="stylesheet">
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        .webgl-content { width: 100%; height: 100vh; }
        #gameContainer { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/gh/lee2sman/everyday@d45d601d2c4d60adf809a0b677c00b7d12aba7e9/96/TemplateData/UnityProgress.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/NovaAppsInc/fracital-proxy@808c643ed7924cfb696a68ccdd9d2b97c12a4bee/g/rooftop-snipers/UnityLoader.js"></script>
    <div class="webgl-content">
        <div id="gameContainer" style="width: 100vw; height: 100vh; padding: 0px; margin: 0px; border: 0px; position: relative; background: black;">
            <canvas id="#canvas" style="width: 100%; height: 100%;"></canvas>
            <div class="logo Dark"></div>
            <div class="progress Dark">
                <div class="empty" style="width: 10%;"></div>
                <div class="full" style="width: 90%;"></div>
            </div>
        </div>
    </div>
    <script>
        var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/NovaAppsInc/fracital-proxy@808c643ed7924cfb696a68ccdd9d2b97c12a4bee/g/rooftop-snipers/rooftop-snipers.json", {
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
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Rooftop Snipers Game"
      />
    </div>
  );
};

export default RooftopSnipersGame;