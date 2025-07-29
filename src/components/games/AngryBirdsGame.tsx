import React, { useRef, useEffect } from 'react';
import FullscreenGame from '../FullscreenGame';

interface AngryBirdsGameProps {
  onBack: () => void;
}

const AngryBirdsGame: React.FC<AngryBirdsGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en-us">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Angry Birds</title>
    <link href="https://cdn.jsdelivr.net/gh/lee2sman/everyday@d45d601d2c4d60adf809a0b677c00b7d12aba7e9/96/TemplateData/style.css" rel="stylesheet">
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        .webgl-content { width: 100%; height: 100vh; }
        #gameContainer { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/gh/lee2sman/everyday@d45d601d2c4d60adf809a0b677c00b7d12aba7e9/96/TemplateData/UnityProgress.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/gertdoro/UnityExplorer@cffa09e09790018403c996d37adb6c4450e8f6c6/Runtime/birds/birds.js"></script>
    <div class="webgl-content">
        <div id="gameContainer" style="width: 100vw; height: 100vh; background: rgb(35, 31, 32);">
            <canvas id="#canvas" style="cursor: default;" width="960" height="600"></canvas>
            <div class="logo Dark" style="display: none;"></div>
            <div class="progress Dark" style="display: none;">
                <div class="empty" style="width: 0%;"></div>
                <div class="full" style="width: 100%;"></div>
            </div>
        </div>
    </div>
    <script>
        var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/gertdoro/UnityExplorer@cffa09e09790018403c996d37adb6c4450e8f6c6/Runtime/birds/birds.json", {
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
    <FullscreenGame gameName="Angry Birds" onBack={onBack}>
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Angry Birds Game"
      />
    </FullscreenGame>
  );
};

export default AngryBirdsGame;