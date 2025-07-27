import React, { useRef, useEffect } from 'react';

interface MiniCrosswordGameProps {
  onBack: () => void;
}

const MiniCrosswordGame: React.FC<MiniCrosswordGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html>

<head>
    <title>Mini Crossword</title>
    <base href="https://cdn.jsdelivr.net/gh/genizy/braybray/crossword/">
    <link rel="icon" type="image/x-icon" href="media/graphics/promo/icons/favicon.ico" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width,height=device-height, initial-scale=1, maximum-scale=1, user-scalable=0, shrink-to-fit=no, minimal-ui" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <link rel="stylesheet" type="text/css" href="game.css?v=1695035089">
    <script type="text/javascript" src="game.js?v=1695035089"></script>
    <script type="text/javascript" src="control.js"></script>
    <script type="text/javascript" src="custom.js"></script>
</head>

<body onload="setTimeout(function(){window.scrollTo(0,1)},1);">
    <div id="ajaxbar">
        <div id="game"><canvas id="canvas"></canvas></div>
        <div id="orientate"><img src="media/graphics/orientate/landscape.jpg" /></div>
        <div id="play" class="play" onclick=""></div>
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
        title="Mini Crossword Game"
      />
    </div>
  );
};

export default MiniCrosswordGame;