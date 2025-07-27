import { useRef, useEffect } from 'react';

interface MinecraftGameProps {
  onBack: () => void;
}

const MinecraftGame = ({ onBack }: MinecraftGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>EaglercraftX</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
    }

    #game_frame {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000;
    }
  </style>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/bubbls/loltheygotbannedfromjsdelivr@38f40924ae70b843f3d4d0a5dc3d6ba13ca3a461/classes.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/bubbls/loltheygotbannedfromjsdelivr@38f40924ae70b843f3d4d0a5dc3d6ba13ca3a461/fix-webm-duration.js"></script>
  <script type="text/javascript">
    window.addEventListener('load', function () {
      window.focus();
      document.body.addEventListener('click', function (e) {
        window.focus();
      }, false);
    });

    window.addEventListener("load", () => {
      if (document.location.href.startsWith("file:")) {
        console.warn("HTTP required. Do not open this file locally, run it via a local HTTP server.");
      } else {
        if (!window.eaglercraftXOpts) {
          window.eaglercraftXOpts = {
            container: "game_frame",
            assetsURI: "https://cdn.jsdelivr.net/gh/bubbls/loltheygotbannedfromjsdelivr@38f40924ae70b843f3d4d0a5dc3d6ba13ca3a461/assets.epk",
            localesURI: "lang/",
            servers: [
              { addr: "wss://mc.arch.lol/", name: "ArchMC" },
              { addr: "wss://mc.asspixel.net", name: "AssPixel" },
              { addr: "wss://sus.shhnowisnottheti.me", name: "Ayunboom" },
              { addr: "wss://aeon-network.net/1.8", name: "Aeon" },
              { addr: "wss://zentic.org/", name: "Zentic" }
            ]
          };
        }
        let container = document.querySelector('#game_frame');
        if (!container) {
          console.error("Container element not found. Creating a default one.");
          container = document.createElement("div");
          container.id = "game_frame";
          document.body.appendChild(container);
        }
        try {
          main();
        } catch (error) {
          console.error("Error starting EaglercraftX:", error);
        }
      }
    });
  </script>
</head>
<body>
  <div id="game_frame"></div>
  <div class="_eaglercraftX_wrapper_element"></div>
  <div id="_eaglercraftX_crashReason" style="display:none;"></div>
  <div id="_eaglercraftX_crashUserAgent" style="display:none;"></div>
</body>
</html>
    `;

    if (iframeRef.current) {
      const blob = new Blob([gameHtml], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      iframeRef.current.src = blobUrl;

      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }
  }, []);

  return (
    <div className="w-full h-full bg-background">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        frameBorder="0"
        title="Minecraft Game"
      />
    </div>
  );
};

export default MinecraftGame;