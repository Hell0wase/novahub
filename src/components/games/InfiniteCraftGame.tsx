import React, { useRef, useEffect } from 'react';

interface InfiniteCraftGameProps {
  onBack: () => void;
}

const InfiniteCraftGame: React.FC<InfiniteCraftGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://cdn.jsdelivr.net/gh/genizy/google-class/nova-craft/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nova Craft</title>
    <base href="https://cdn.jsdelivr.net/gh/genizy/google-class/nova-craft/">
    <script type="module" crossorigin src="https://cdn.jsdelivr.net/gh/genizy/google-class/nova-craft/assets/index-CQ1EvTOM.js"></script>
    <link rel="stylesheet" crossorigin href="https://cdn.jsdelivr.net/gh/genizy/google-class/nova-craft/assets/index-CzvCHSYC.css">
  </head>
  <body>
    <div id="root"></div>
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
        title="Infinite Craft Game"
      />
    </div>
  );
};

export default InfiniteCraftGame;