import React, { useRef, useEffect } from 'react';

interface UnicycleHeroGameProps {
  onBack: () => void;
}

const UnicycleHeroGame: React.FC<UnicycleHeroGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@8874e6849ea73acaedd853ff61ea04d981fce7dd/unicycle%20hero/">
    <meta charset="utf-8"> 
    <title>Unicycle Hero</title>
    <meta name="robots" content="noindex,nofollow" />
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="shortcut icon" type="image/png" href="./favicon.png">
    <script type="text/javascript" src="./Uni_Poki_CustomPreloader.js"></script>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
        #noncontent {
            background: #000000;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div id="noncontent"></div>
    <script type="text/javascript">
        window.addEventListener("touchmove", function(event) {
            event.preventDefault();
        }, {
            capture: false,
            passive: false
        });
        if (typeof window.devicePixelRatio != 'undefined' && window.devicePixelRatio > 2) {
            var meta = document.getElementById("viewport");
            meta.setAttribute('content', 'width=device-width, initial-scale=' + (2 / window.devicePixelRatio) + ', user-scalable=no');
        }
        lime.embed("Uni_Poki_CustomPreloader", "noncontent", 1160, 652);
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
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Unicycle Hero Game"
      />
    </div>
  );
};

export default UnicycleHeroGame;