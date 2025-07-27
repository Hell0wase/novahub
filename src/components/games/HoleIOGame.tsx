import React, { useRef, useEffect } from 'react';

interface HoleIOGameProps {
  onBack: () => void;
}

const HoleIOGame: React.FC<HoleIOGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/gh/paigerodeghero/academicwebsite@897c910c65e6c68b04c44a6b6eba0b99d0f2f2cf/TemplateData/UnityProgress.js"></script>
<script src="https://cdn.jsdelivr.net/gh/gertdoro/Toolkit@80a659a20b7bb0f4e3141cc82c64286b22bb12cc/Tcl/holeUnityLoader.js"></script>
<script>
      var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/gertdoro/Toolkit@80a659a20b7bb0f4e3141cc82c64286b22bb12cc/Tcl/Hole.json", {onProgress: UnityProgress,Module:{onRuntimeInitialized: function() {UnityProgress(gameInstance, "complete")}}});
    </script>
<script src="https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/addc4348-16c2-4645-9dff-f99b962e39ef%2Fscr.js"></script>
</head>
<body>
<div class="webgl-content">
        <div id="gameContainer" style="width: 100vw; height: 100vh; padding: 0px; margin: 0px; border: 0px; position: relative; background: rgb(35, 31, 32);">
          <canvas id="#canvas" style="cursor: default;" width="917" height="919"></canvas>
          <div class="logo Dark" style="display: none;"></div>
          <div class="progress Dark" style="display: none;">
            <div class="empty" style="width: 0%;"></div>
            <div class="full" style="width: 100%;"></div>
          </div>
        </div>
</div>
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
        title="Hole.io Game"
      />
    </div>
  );
};

export default HoleIOGame;