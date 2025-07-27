import React, { useRef, useEffect } from 'react';

interface SuperHotGameProps {
  onBack: () => void;
}

const SuperHotGame: React.FC<SuperHotGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="hot.jpg">
    <title>SUPERHOT</title> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/3kh0/3kh0-lite@d5cf6bb79a6427ada99e7f2e31425325f454565d/projects/superhot/styles.css" />
  </head>
  <body style="margin: 0;">
    <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" style="width: 100%; height: 100%;"></canvas>
    <script type="text/javascript">
      var Module = {
        TOTAL_MEMORY: 268435456,
        errorhandler: null,
        compatibilitycheck: null,
        dataUrl: "https://cdn.jsdelivr.net/gh/3kh0/3kh0-lite@d5cf6bb79a6427ada99e7f2e31425325f454565d/projects/superhot/webgl.datagz",
        codeUrl: "https://rawcdn.githack.com/3kh0/3kh0-lite/d5cf6bb79a6427ada99e7f2e31425325f454565d/projects/superhot/webgl.jsgz",
        memUrl: "https://cdn.jsdelivr.net/gh/3kh0/3kh0-lite@d5cf6bb79a6427ada99e7f2e31425325f454565d/projects/superhot/webgl.memgz",
      };
    </script>
    <script src="https://cdn.jsdelivr.net/gh/3kh0/3kh0-lite@d5cf6bb79a6427ada99e7f2e31425325f454565d/projects/superhot/UnityLoader.js"></script>
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
        title="SuperHot Game"
      />
    </div>
  );
};

export default SuperHotGame;