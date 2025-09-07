import React, { useRef, useEffect } from 'react';

interface FnfGameProps {
  onBack: () => void;
}

const FnfGame: React.FC<FnfGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
	<base href="https://cdn.jsdelivr.net/gh/genizy/fridayfunk/">
	<meta charset="utf-8">
	
	<title>Friday Night Funkin'</title>
	
	<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes">
	
	<link rel="shortcut icon" type="image/png" href="https://cdn.jsdelivr.net/gh/genizy/fridayfunk/favicon.png">
	
	<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/genizy/fridayfunk/Funkin.js"></script>
	
	<script>
		window.addEventListener ("touchmove", function (event) { event.preventDefault (); }, { capture: false, passive: false });
		if (typeof window.devicePixelRatio != 'undefined' && window.devicePixelRatio > 2) {
			var meta = document.getElementById ("viewport");
			meta.setAttribute ('content', 'width=device-width, initial-scale=' + (2 / window.devicePixelRatio) + ', user-scalable=no');
		}
	</script>
	
	<style>
		html,body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
		#openfl-content { background: #000000; width: 100%; height: 100%; }
		@font-face {
			font-family: '5by7';
			src: url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/5by7.eot?#iefix') format('embedded-opentype'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/5by7.woff') format('woff'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/5by7.ttf') format('truetype'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/5by7.svg#5by7') format('svg');
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: '5by7 Bold';
			src: url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/5by7_b.eot?#iefix') format('embedded-opentype'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/5by7_b.woff') format('woff'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/5by7_b.ttf') format('truetype'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/5by7_b.svg#5by7%20Bold') format('svg');
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: 'VCR OSD Mono';
			src: url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/vcr.eot?#iefix') format('embedded-opentype'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/vcr.woff') format('woff'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/vcr.ttf') format('truetype'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/assets/fonts/vcr.svg#VCR%20OSD%20Mono') format('svg');
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: 'Nokia Cellphone FC Small';
			src: url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/flixel/fonts/nokiafc22.eot?#iefix') format('embedded-opentype'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/flixel/fonts/nokiafc22.woff') format('woff'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/flixel/fonts/nokiafc22.ttf') format('truetype'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/flixel/fonts/nokiafc22.svg#Nokia%20Cellphone%20FC%20Small') format('svg');
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: 'Monsterrat';
			src: url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/flixel/fonts/monsterrat.eot?#iefix') format('embedded-opentype'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/flixel/fonts/monsterrat.woff') format('woff'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/flixel/fonts/monsterrat.ttf') format('truetype'),
			url('https://cdn.jsdelivr.net/gh/genizy/fridayfunk/flixel/fonts/monsterrat.svg#Monsterrat') format('svg');
			font-weight: normal;
			font-style: normal;
		}
	</style>
	
</head>
<body>
	
	<noscript>This webpage makes extensive use of JavaScript. Please enable JavaScript in your web browser to view this page.</noscript>
	
	<div id="openfl-content"></div>
	
	<script type="text/javascript">
		lime.embed ("Funkin", "openfl-content", 1280, 720, { parameters: {} });
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
        title="Friday Night Funkin' Game"
      />
    </div>
  );
};

export default FnfGame;