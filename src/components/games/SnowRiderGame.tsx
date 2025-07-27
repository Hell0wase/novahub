import FullscreenGame from '@/components/FullscreenGame';
import { useRef, useEffect } from 'react';

interface SnowRiderGameProps {
  onBack: () => void;
}

const SnowRiderGame = ({ onBack }: SnowRiderGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/TemplateData/style.css">
        <style>
          body { margin: 0; padding: 0; overflow: hidden; background: #000; }
          .webgl-content { width: 100%; height: 100vh; }
          #gameContainer { width: 100%; height: 100%; margin: auto; }
        </style>
      </head>
      <body>
        <script src="https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/TemplateData/UnityProgress.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/Build/UnityLoader.js"></script>
        <script>
          var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/Build/SnowRider3D-gd-1.json", {
            onProgress: UnityProgress,
            Module: {
              onRuntimeInitialized: function() {
                UnityProgress(gameInstance, "complete");
              }
            }
          });
        </script>
        <div class="webgl-content">
          <div id="gameContainer" style="width: 100%; height: 100%; margin: auto"></div>
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
    <FullscreenGame gameName="Snow Rider 3D" onBack={onBack}>
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        frameBorder="0"
        title="Snow Rider 3D Game"
      />
    </FullscreenGame>
  );
};

export default SnowRiderGame;