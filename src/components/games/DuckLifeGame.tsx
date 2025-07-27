import React, { useRef, useEffect } from 'react';

interface DuckLifeGameProps {
  onBack: () => void;
}

const DuckLifeGame: React.FC<DuckLifeGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        body { margin: 0; padding: 0; background: #000; overflow: hidden; }
        #game-container { width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center; }
        ruffle-embed { width: 100%; height: 100%; max-width: 100%; max-height: 100%; }
    </style>
</head>
<body>
    <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
    <div id="game-container">
        <ruffle-embed src="https://cdn.jsdelivr.net/gh/markrosenbaum/some-repo@aeb3030a3fb90987658ff4ee1063c64f6206152f/dl/duck-life.swf" width="100%" height="100%"></ruffle-embed>
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
        title="Duck Life Game"
      />
    </div>
  );
};

export default DuckLifeGame;