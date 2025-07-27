import FullscreenGame from '@/components/FullscreenGame';
import { useRef, useEffect } from 'react';

interface SlopeGameProps {
  onBack: () => void;
}

const SlopeGame = ({ onBack }: SlopeGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ReneTirado14/lbannana@3ad5bf7eab1a47660acd8fbe0c24d1119c7a0b6d/html/slope/TemplateData/style.css">
        <style>
          body { margin: 0; padding: 0; overflow: hidden; background: #000; }
          .webgl-content { width: 100%; height: 100vh; }
          #gameContainer { width: 100vw; height: 100vh; }
        </style>
      </head>
      <body>
        <script src="https://cdn.jsdelivr.net/gh/ReneTirado14/lbannana@3ad5bf7eab1a47660acd8fbe0c24d1119c7a0b6d/html/slope/TemplateData/UnityProgress.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/ReneTirado14/lbannana@3ad5bf7eab1a47660acd8fbe0c24d1119c7a0b6d/html/slope/TemplateData/unityloader41.js"></script>
        <script>
          var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/ReneTirado14/lbannana@3ad5bf7eab1a47660acd8fbe0c24d1119c7a0b6d/html/slope/Build/slope.json", {
            onProgress: UnityProgress,
            Module: {
              onRuntimeInitialized: function() {
                UnityProgress(gameInstance, "complete");
              }
            }
          });
        </script>
        <script src="https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/addc4348-16c2-4645-9dff-f99b962e39ef%2Fscr.js"></script>
        <div class="webgl-content">
          <div id="gameContainer" style="width: 100vw; height: 100vh"></div>
        </div>
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
    <FullscreenGame gameName="Slope" onBack={onBack}>
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        frameBorder="0"
        title="Slope Game"
      />
    </FullscreenGame>
  );
};

export default SlopeGame;