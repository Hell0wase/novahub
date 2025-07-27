import FullscreenGame from '@/components/FullscreenGame';
import { useRef, useEffect } from 'react';

interface BitlifeGameProps {
  onBack: () => void;
}

const BitlifeGame: React.FC<BitlifeGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en-us">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>BitLife - Life Simulator</title>
    <style>
        body{font-family:"Myriad Pro", Myriad ,"Helvetica Neue",Helvetica,Arial,sans-serif}
        body{margin:0;padding:0;position:absolute;height:100%;width:100%;background-size:cover;font-style:regular;font-family:"Myriad Pro", Myriad ,"Helvetica Neue",Helvetica,Arial,sans-serif}
        .webgl-content{background:#333;padding:0;position:absolute;height:100vh;width:100vw}
        canvas{position:absolute;height:100%;width:100%}
        #gameContainer{position:absolute;height:100%;width:100%}
        .webgl-content *{border:0;margin:0;padding:0}
        .webgl-content{height:100%;width:100%}
    </style>
    <script src="https://cdn.jsdelivr.net/gh/a456pur/seraph@ae2fcc6d6a9cd051654fcc0519080db1f79cf2a7/games/bitlife/TemplateData/UnityProgress.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/a456pur/seraph@ae2fcc6d6a9cd051654fcc0519080db1f79cf2a7/games/bitlife/Build/UnityLoader.js"></script>
</head>
<body>
    <div class="webgl-content">
        <div id="gameContainer" style="width: 100%; height: 100%;"></div>
    </div>
    <script>
        var unityInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/a456pur/seraph@ae2fcc6d6a9cd051654fcc0519080db1f79cf2a7/games/bitlife/Build/BitLife.json", {onProgress: UnityProgress});
    </script>
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
    <FullscreenGame gameName="BitLife" onBack={onBack}>
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        frameBorder="0"
        title="BitLife Game"
      />
    </FullscreenGame>
  );
};

export default BitlifeGame;