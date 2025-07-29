import React, { useRef, useEffect } from 'react';
import FullscreenGame from '../FullscreenGame';

interface BobTheRobberGameProps {
  onBack: () => void;
}

const BobTheRobberGame: React.FC<BobTheRobberGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
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
    <param name="movie" value="https://cdn.jsdelivr.net/gh/StarRepo444/ClassroomPlayV2@c28ef0cfdccbbfc61a42d9954f14af3115c7398a/games/flash/swf/bob-the-robber.swf">
    <embed src="https://cdn.jsdelivr.net/gh/StarRepo444/ClassroomPlayV2@c28ef0cfdccbbfc61a42d9954f14af3115c7398a/games/flash/swf/bob-the-robber.swf" width="100%" height="100%">
</object>
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
    <FullscreenGame gameName="Bob the Robber" onBack={onBack}>
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Bob the Robber Game"
      />
    </FullscreenGame>
  );
};

export default BobTheRobberGame;