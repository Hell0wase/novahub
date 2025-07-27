import React, { useRef, useEffect } from 'react';

interface CarKingArenaGameProps {
  onBack: () => void;
}

const CarKingArenaGame: React.FC<CarKingArenaGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<html lang="en-us">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<style>html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html,body{height:100%}canvas{display:block}body{margin:0}#unity-container{width:100%;height:100%;position:relative}#unity-canvas{width:100%;height:100%;background:#231F20}#loading-cover{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center}#unity-loading-bar{flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;align-items:center}#unity-logo{text-align:center}#unity-logo img{max-width:80%;max-height:80%}#unity-progress-bar-empty{width:40%;height:24px;margin:10px 20px 20px 10px;text-align:left;border:1px solid white;padding:2px}#unity-progress-bar-full{width:0;height:100%;background:white}.light #unity-progress-bar-empty{border-color:black}.light #unity-progress-bar-full{background:black}.spinner,.spinner:after{border-radius:50%;width:5em;height:5em}.spinner{margin:10px;font-size:10px;position:relative;text-indent:-9999em;border-top:1.1em solid rgba(255,255,255,0.2);border-right:1.1em solid rgba(255,255,255,0.2);border-bottom:1.1em solid rgba(255,255,255,0.2);border-left:1.1em solid #ffffff;transform:translateZ(0);animation:spinner-spin 1.1s infinite linear}@keyframes spinner-spin{0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)}}</style>
<style> body{overflow:hidden;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}</style>
</head>
<body class="dark">
<div id="unity-container" class="unity-desktop">
<canvas id="unity-canvas" width="356" height="838" style="cursor: default;"></canvas>
</div>
<div id="loading-cover" style="display: none;">
<div id="unity-loading-bar">
<div id="unity-progress-bar-empty" style="">
<div id="unity-progress-bar-full" style="width: 100%;"></div>
</div>
<div class="spinner" style="display: none;"></div>
</div>
</div>
<script>
const buildUrl="https://cdn.jsdelivr.net/gh/sasa24s/Sphere-compile@8d767525fe856bc189118f6463f4b2d024de64fd/network";
const loaderUrl=buildUrl+"/min.js";
const config={dataUrl:buildUrl+"/cardata.js",frameworkUrl:buildUrl+"/carframework.js",codeUrl:buildUrl+"/carwasm.js",streamingAssetsUrl:"",};
const container=document.querySelector("#unity-container");
const canvas=document.querySelector("#unity-canvas");
const loadingCover=document.querySelector("#loading-cover");
const progressBarEmpty=document.querySelector("#unity-progress-bar-empty");
const progressBarFull=document.querySelector("#unity-progress-bar-full");
const spinner=document.querySelector('.spinner');
if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){container.className="unity-mobile"}
loadingCover.style.display="";
canvas.addEventListener("touchstart",()=>{window.focus()});
canvas.addEventListener("pointerdown",()=>{window.focus()});
let myGameInstance=null;
const script=document.createElement("script");
script.src=loaderUrl;
script.onload=()=>{createUnityInstance(canvas,config,(progress)=>{spinner.style.display="none";progressBarEmpty.style.display="";progressBarFull.style.width=\`\${100*progress}%\`}).then((unityInstance)=>{myGameInstance=unityInstance;loadingCover.style.display="none"}).catch((message)=>{})};
document.body.appendChild(script);
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
        title="Car King Arena Game"
      />
    </div>
  );
};

export default CarKingArenaGame;