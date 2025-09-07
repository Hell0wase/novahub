import React, { useRef, useEffect } from 'react';
import FullscreenGame from '../FullscreenGame';

interface DuckLifeGameProps {
  onBack: () => void;
}

const DuckLifeGame: React.FC<DuckLifeGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/AndreajnRcm4/b398dl2h74v@9a23fbb2373d743a564873251cbb57736ebc1f73/style.css" type="text/css" />
    
</head>
<body>
<script src="https://cdn.jsdelivr.net/gh/u-cvlassrom-y/google@main/ruffle.js"></script>

<object width="100%" height="100%">
    <param name="movie" value="https://cdn.jsdelivr.net/gh/markrosenbaum/some-repo@aeb3030a3fb90987658ff4ee1063c64f6206152f/dl/duck-life.swf">
    <embed src="https://cdn.jsdelivr.net/gh/markrosenbaum/some-repo@aeb3030a3fb90987658ff4ee1063c64f6206152f/dl/duck-life.swf" width="100%" height="100%">
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
    <FullscreenGame gameName="Duck Life" onBack={onBack}>
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Duck Life Game"
      />
    </FullscreenGame>
  );
};

export default DuckLifeGame;