import React, { useRef, useEffect } from 'react';

interface AgeOfWarGameProps {
  onBack: () => void;
}

const AgeOfWarGame: React.FC<AgeOfWarGameProps> = ({ onBack }) => {
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
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        object { width: 100%; height: 100vh; }
    </style>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/gh/u-cvlassrom-y/google@main/ruffle.js"></script>
    <object width="100%" height="100%">
        <param name="movie" value="https://cdn.jsdelivr.net/gh/artyomriseofnations/gs-swf@6ed8a67a935c49240d2a6dc1e8d4fc8466a28aca/Age%20of%20War.swf">
        <embed src="https://cdn.jsdelivr.net/gh/artyomriseofnations/gs-swf@6ed8a67a935c49240d2a6dc1e8d4fc8466a28aca/Age%20of%20War.swf" width="100%" height="100%">
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
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Age of War Game"
      />
    </div>
  );
};

export default AgeOfWarGame;