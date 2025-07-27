import React, { useRef, useEffect } from 'react';

interface RacingChampionshipGameProps {
  onBack: () => void;
}

const RacingChampionshipGame: React.FC<RacingChampionshipGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en-us">
<base href="https://rawcdn.githack.com/bubbls/UGS-Assets/2456fee7190a3eb9994f4af000dca53904195cb1/top%20speed%20racing%203d/">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Unity WebGL Player | Top Speed Racing 3d</title>
  <link rel="shortcut icon" href="TemplateData/favicon.ico">
  <link rel="stylesheet" href="TemplateData/style.css">
  <meta name="robots" content="noindex,nofollow" />
</head>

<body>
  <div id="unity-container" class="unity-desktop">
    <canvas id="unity-canvas" width=900 height=600></canvas>
    <div id="unity-loading-bar">
      <div id="unity-logo">
        <div id="unity-text-progress"></div>
      </div>
      <div id="unity-progress-bar-empty">
        <div id="unity-progress-bar-full"></div>
      </div>
    </div>
    <div id="unity-warning"> </div>
  </div>
  <script>
    var container = document.querySelector("#unity-container");
    var canvas = document.querySelector("#unity-canvas");
    var textProgress = document.querySelector("#unity-text-progress");
    var loadingBar = document.querySelector("#unity-loading-bar");
    var progressBarFull = document.querySelector("#unity-progress-bar-full");
    var progressBarEmpty = document.querySelector("#unity-progress-bar-empty");
    var warningBanner = document.querySelector("#unity-warning");

    function unityShowBanner(msg, type) {
      function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
      }
      var div = document.createElement('div');
      div.innerHTML = msg;
      warningBanner.appendChild(div);
      if (type == 'error') div.style = 'background: red; padding: 10px;';
      else {
        if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
        setTimeout(function() {
          warningBanner.removeChild(div);
          updateBannerVisibility();
        }, 5000);
      }
      updateBannerVisibility();
    }

    var buildUrl = "Build";
    var loaderUrl = buildUrl + "/TopSpeedRacing_n1.loader.js";
    var config = {
      dataUrl: buildUrl + "/TopSpeedRacing_n1.data.unityweb",
      frameworkUrl: buildUrl + "/TopSpeedRacing_n1.framework.js.unityweb",
      codeUrl: buildUrl + "/TopSpeedRacing_n1.wasm.unityweb",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "Top Speed Racing 3d 2",
      productName: "Top Speed Racing 3d",
      productVersion: "1.0",
      showBanner: unityShowBanner,
    };

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      var meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
      document.getElementsByTagName('head')[0].appendChild(meta);
      container.className = "unity-mobile";

      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    } else {
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }

    window.addEventListener('resize', function() {
      setTimeout(function() {
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
      }, 1000);
    }, false);

    loadingBar.style.display = "block";

    var showLoadingBar = false;

    if (!showLoadingBar)
      progressBarEmpty.style.display = "none";

    const rootPath = 'TemplateData';

    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        if (progress >= 0.9 && progress < 1) {
          textProgress.innerHTML = '100% - Running, Wait..' + ' <img src="' + rootPath + '/gears.gif" class="spinner" width="90" height="90" align = center float :none; />';
          progressBarEmpty.style.display = "none";
        } else {
          textProgress.innerHTML = 'Loading - ' + Math.floor(progress * 100) + '%' + ' <img src="' + rootPath + '/gears.gif" class="spinner" width="90" height="90" align = center float :none; />';
        }

        if (showLoadingBar)
          progressBarFull.style.width = 100 * progress + "%";

      }).then((unityInstance) => {
        loadingBar.style.display = "none";
        textProgress.style.display = "none";
      }).catch((message) => {
        alert(message);
      });
    };
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
        title="Racing Championship Game"
      />
    </div>
  );
};

export default RacingChampionshipGame;