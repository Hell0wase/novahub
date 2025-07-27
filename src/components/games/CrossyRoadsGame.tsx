import React, { useRef, useEffect } from 'react';

interface CrossyRoadsGameProps {
  onBack: () => void;
}

const CrossyRoadsGame: React.FC<CrossyRoadsGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!doctype HTML>
<html lang="en">
<head>
  <base href="https://rawcdn.githack.com/bubbls/youtube-playables/3fa3b6dbb7675ba6d708abe1ba272e67607ba807/crossy-road/">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Crossy Road</title>

  <script src="https://rawcdn.githack.com/bubbls/youtube-playables/main/ytgame.js" nonce="2KHli9LrFFijH2jCb5SkMw"></script>

  <link rel="stylesheet" type="text/css" href="game.css?v=1695035089">
  <script type="text/javascript" src="game.js?v=1695035089"></script>
  <script type="text/javascript" src="control.js"></script>
  <script type="text/javascript" src="custom.js"></script>

  <script src="scripts/three.min.js" nonce="2KHli9LrFFijH2jCb5SkMw"></script>
  <script src="scripts/game.min.js" nonce="2KHli9LrFFijH2jCb5SkMw"></script>
  <script src="scripts/extra.min.js" nonce="2KHli9LrFFijH2jCb5SkMw"></script>
  <script src="scripts/bootstrap.min.js" nonce="2KHli9LrFFijH2jCb5SkMw"></script>
</head>

<body onload="setTimeout(function(){window.scrollTo(0,1)},1);">
  <canvas id="canvas"></canvas>
  <div id="orientate"><img src="media/graphics/orientate/landscape.jpg" /></div>
  <div id="play" class="play" onclick=""></div>
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
        title="Crossy Roads Game"
      />
    </div>
  );
};

export default CrossyRoadsGame;