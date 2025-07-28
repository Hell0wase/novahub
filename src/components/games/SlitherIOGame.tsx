import { useRef, useEffect } from 'react';
import FullscreenGame from '../FullscreenGame';

interface SlitherIOGameProps {
  onBack: () => void;
}

const SlitherIOGame = ({ onBack }: SlitherIOGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <title>Slither.io</title>
    <meta content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" name="viewport">
    <meta content="true" name="HandheldFriendly">
    <meta content="yes" name="mobile-web-app-capable">
    <style type="text/css">
        * {
            padding: 0;
            margin: 0;
        }
        html, body {
            background: #000;
            color: #fff;
            overflow: hidden;
            touch-action: none;
            -ms-touch-action: none;
        }
        canvas {
            touch-action-delay: none;
            touch-action: none;
            -ms-touch-action: none;
        }
        @font-face {
            font-family: Oswald Regular;
            src: url(https://26515722-282596139816136697.preview.editmysite.com/uploads/b/7547235-562404422326578714/files/oswald_regular.ttf);
        }
        html, body {
            padding: 0;
            margin: 0;
            overflow: hidden;
            background: #000000;
        }
        html, body, canvas {
            touch-action: none;
            touch-action-delay: none;
        }
        #button {
            display:none;
        }
        .imgb_vis {
            animation: imgb-animation 7s linear;
        }
        @keyframes imgb-animation {
            10% { transform: translateX(0); }
            20% { transform: translateX(100px); }
            90% { transform: translateX(100px); }
            100% { transform: translateX(0); }
        }
    </style>
</head>
<body dir="ltr" style="cursor: auto;"> 
    <div id="fb-root"></div>
    
    <script src="https://26515722-282596139816136697.preview.editmysite.com/uploads/b/7547235-562404422326578714/files/offlineClient.js"></script>
    
    <script>
        var isGameLoaded = false;
        
        function On_GameLoaded() {
            isGameLoaded = true;
        }
        
        function Show_Ads() {
            c2_callFunction("On_GameResumed");
            showad1();
        }

        // Issue a warning if trying to preview an exported project on disk.
        (function(){
            // Check for running exported on file protocol
            if (window.location.protocol.substr(0, 4) ==="file") {
                alert("Exported games won't work until you upload them. (When running on the file:/// protocol, browsers block many features from working for security reasons.)");
            }
        })();
    </script>
    
    <!-- The canvas must be inside a div called c2canvasdiv -->
    <div id="c2canvasdiv" style="width: 100vw; height: 100vh; margin-left: 0px; margin-top: 0px;">
        <!-- The canvas the project will render to -->
        <canvas id="c2canvas" style="width: 100%; height: 100%;">
            <h1>Your browser does not appear to support HTML5. Try upgrading your browser to the latest version. <a href="http://www.whatbrowser.org">What is a browser?</a>
            <br><br><a href="http://www.microsoft.com/windows/internet-explorer/default.aspx">Microsoft Internet Explorer</a><br>
            <a href="http://www.mozilla.com/firefox/">Mozilla Firefox</a><br>
            <a href="http://www.google.com/chrome/">Google Chrome</a><br>
            <a href="http://www.apple.com/safari/download/">Apple Safari</a></h1>
        </canvas>
        
        <input type="text" id="" autocomplete="off" placeholder="Your Name Here" title="" spellcheck="false" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 373px; height: 35px; border: none; background-color: rgba(0, 0, 0, 0); color: rgb(255, 255, 255); font-size: 20px; font-family: Oswald; padding: 10px; border-radius: 100px;">
    </div>
    
    <!-- Construct 2 exported games require jQuery -->
    <script src="https://26515722-282596139816136697.preview.editmysite.com/uploads/b/7547235-562404422326578714/files/jquery-2.1.1.min.js"></script>
    
    <!-- The runtime script -->
    <script src="https://26515722-282596139816136697.preview.editmysite.com/uploads/b/7547235-562404422326578714/files/c2runtime.js"></script>

    <script>
        // Start the Construct 2 project running on window load.
        jQuery(document).ready(function () {            
            // Create new runtime using the c2canvas
            cr_createRuntime("c2canvas");
        });
        
        // Pause and resume on page becoming visible/invisible
        function onVisibilityChanged() {
            if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden)
                cr_setSuspended(true);
            else
                cr_setSuspended(false);
        };
        
        document.addEventListener("visibilitychange", onVisibilityChanged, false);
        document.addEventListener("mozvisibilitychange", onVisibilityChanged, false);
        document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
        document.addEventListener("msvisibilitychange", onVisibilityChanged, false);
        
        function OnRegisterSWError(e) {
            console.warn("Failed to register service worker: ", e);
        };
        
        // Runtime calls this global method when ready to start caching (i.e. after startup).
        window.C2_RegisterSW = function C2_RegisterSW() {
            if (!navigator.serviceWorker)
                return;        // no SW support, ignore call
            
            try {
                navigator.serviceWorker.register("sw.js", { scope: "./" })
                .then(function (reg) {
                    console.log("Registered service worker on " + reg.scope);
                })
                .catch(OnRegisterSWError);
            }
            catch (e) {
                OnRegisterSWError(e);
            }
        };
    </script>
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
    <FullscreenGame gameName="Slither.io" onBack={onBack}>
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        frameBorder="0"
        title="Slither.io Game"
      />
    </FullscreenGame>
  );
};

export default SlitherIOGame;
