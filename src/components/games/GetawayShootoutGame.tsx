import React, { useRef, useEffect } from 'react';

interface GetawayShootoutGameProps {
  onBack: () => void;
}

const GetawayShootoutGame: React.FC<GetawayShootoutGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/gh/lee2sman/everyday@d45d601d2c4d60adf809a0b677c00b7d12aba7e9/96/TemplateData/UnityProgress.js"></script>
<script src="https://cdn.jsdelivr.net/gh/lordsofdank/GetawayShootout@9e99964c43638346680fce45d3b296408da61181/Build/UnityLoader.js"></script>
<script>
      var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/lordsofdank/GetawayShootout@9e99964c43638346680fce45d3b296408da61181/Build/GetawayShootoutTwoPlayerGamesOrg.json", {onProgress: UnityProgress,Module:{onRuntimeInitialized: function() {UnityProgress(gameInstance, "complete")}}});
    </script>
<script src=""></script>
</head>
<body>
<div class="webgl-content">
        <div id="gameContainer" style="width: 100vw; height: 100vh; padding: 0px; margin: 0px; border: 0px; position: relative; background: rgb(88, 108, 128);">
          <canvas id="#canvas" style="cursor: default;" width="1879" height="931"></canvas>
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
        title="Getaway Shootout Game"
      />
    </div>
  );
};

export default GetawayShootoutGame;