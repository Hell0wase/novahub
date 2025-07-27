import React, { useRef, useEffect } from 'react';

interface StreetFighterGameProps {
  onBack: () => void;
}

const StreetFighterGame: React.FC<StreetFighterGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<html>
<head>
	<script src="//www.google.com/jsapi"></script>
	<script>
		window.parent.maeExportApis_();
	</script>

	<style>
		body {
			overflow: hidden;
			background: #000000;
			margin-top: 0;
			margin-left: 0;
			color: #000000;
		}

		#startButton {
			display: block;
			width: 160px;
			height: 40px;
			background-color: #4CAF50;
			color: white;
			text-align: center;
			text-decoration: none;
			font-size: 16px;
			margin: 20px auto;
			padding: 10px 20px;
			border: none;
			border-radius: 8px;
			cursor: pointer;
			font-family: 'Press Start 2P', cursive;
			box-shadow: 0px 0px 10px 2px #000000;
		}
	</style>
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&amp;display=swap" rel="stylesheet">
</head>

<body>
	<div style="width: 100vw; height: 100vh;max-width:100%">
		<div id="game" style="display: none;"></div>
		<button id="startButton">PLAY</button>
	</div>
	<script>
		document.getElementById("game").style.display = "none";
            function startGame() {
                document.getElementById("game").style.display = "block";
                document.getElementById("startButton").style.display = "none";
                EJS_player = "#game";
                EJS_core = "snes";
                EJS_color = "#000000";
                EJS_startOnLoaded = true;
                EJS_pathtodata = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data";
                EJS_gameUrl = "https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@f4aacc371b8cbd4027367a08dc73d69eab9fa7a4/Street%20Fighter%20II%20(USA).zip";
                loadGame(); 
            }
            document.getElementById("startButton").addEventListener("click", startGame);
            function loadGame() {
                var script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data/loader.js";
                document.body.appendChild(script);
		var script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/gh/a456pur/seraph@ae2fcc6d6a9cd051654fcc0519080db1f79cf2a7/storage/js/cloak.js";
                document.body.appendChild(script);
            }
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
        title="Street Fighter Game"
      />
    </div>
  );
};

export default StreetFighterGame;