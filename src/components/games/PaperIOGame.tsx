import { useRef, useEffect } from 'react';
import FullscreenGame from '../FullscreenGame';

interface PaperIOGameProps {
  onBack: () => void;
}

const PaperIOGame = ({ onBack }: PaperIOGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta content="#2d3331" name="theme-color">
    <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport">
    <title>Paper.io 2</title>
    <link href="https://cdn.jsdelivr.net/gh/MartinTintin3/melvin-games@e4de505d194355c344977981cdf3b2cfe5075c52/games/paper.io-2/css/style3.css" rel="stylesheet" type="text/css">
    <style>
        #right_side { 
            position: absolute; 
            top: 0; 
            bottom: 0; 
            right: 0; 
            width: 220px; 
            height: 200px; 
            z-index: 3; 
            padding-top: 12px; 
            padding-right: 12px; 
            text-align: right;
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
<body dir="ltr">
    <script src="https://cdn.jsdelivr.net/gh/bobydob/JSEngine@dcbe63e923bb7f943bf4e1feceb996ddff033f48/build/ppo2/app-new-gm.js" type="text/javascript"></script>

    <div id="game">
        <canvas class="fadein" id="view" width="100%" height="100%"></canvas>
        <div id="ui_overlay"></div>
        <div id="ui" class="">
            <div id="left_side"></div>
            <div class="uibox">
                <div class="logo">
                    <img src="https://cdn.jsdelivr.net/gh/MartinTintin3/melvin-games@e4de505d194355c344977981cdf3b2cfe5075c52/games/paper.io-2/images/logo.png">
                </div>
                <div class="tips">
                    <div class="tip">Bite enemy tails but don't let them bite yours!</div>
                </div>
                <form class="play">
                    <input type="text" id="nick" name="nick" autocomplete="off" placeholder="Your name" maxlength="12">
                    <button id="play" name="play" class="yellow">PLAY</button>
                </form>
                <div id="adbanner"></div>
            </div>
            <div id="right_side"></div>
        </div>
        <div id="footer">
            <ul id="lng">
                <li class="active">EN</li>
                <li class="">RU</li>
                <li class="">TR</li>
                <li class="">SP</li>
                <li class="">FR</li>
                <li class="">NL</li>
                <li class="">PT</li>
                <li class="">DE</li>
                <li class="">IT</li>
            </ul>
            <div id="bottom">
                <a href="#about">About game</a>&nbsp; &nbsp;
                <a href="/privacy.php" target="_blank">Privacy policy</a>
            </div>
        </div>
        <div id="overlay"></div>
    </div>
    
    <div id="about">
        <div class="text">
            <h1>Paper.io 2 online game</h1>
            <p>Paper.io 2 is a sequel to what might be the most popular mobile game played by people from all around the world. Its simple premise, flawless execution and great optimization made it extremely appealing to both hardcore gamers and regular users who's devices aren't always equipped with the latest hardware.</p>
            <p>At its core this is definitely a casual game: after all, all you need to do is steer a colored square on a blank sheet of paper, covering it with paint, effectively identifying your captured territories. Start a line somewhere outside of your area, make a full circle and whatever you outlined will be yours. The difficult part is avoiding attacks from your enemies – a chunk of land is equally easy to capture for several players, so how the round plays out depends solely on the skills, wit and strategy of everyone involved.</p>
            <p>To make things even more complicated, Paper.io 2 is also a browser game which allows laptop and desktop users to join the fun wherever they are. Even if you don't have an internet connection, there is a way for one player to enjoy all the same mechanics, only he or she would be competing with AI. It might be less intense, but is still a great way to kill some time when you're bored.</p>
            <p>Among the thousands of IO games this one stands out because of its tight gameplay that combines action with tactics. The fact that the visuals and the play style are inspired by some of the most renowned classic arcade titles helps too. Basically, you can be a stay at home mom, a hardened MMO player or schoolkid in an IT class – chances are, you will enjoy the experience and have fun in multiplayer battles.</p>
            <p>What started as an indie game became a worldwide phenomenon and Paper.io 2 is its rightful successor. The graphics are still colorful and smooth, the controls are responsive and the gameplay is better than ever, so now is a great time to check it out if you haven't already!</p>
            <p>
                <a href="#close" onclick="document.getElementById('about').style.display ='none'; return false;">
                    Close window
                </a>
            </p>
        </div>
    </div>
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
    <FullscreenGame gameName="Paper.io 2" onBack={onBack}>
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        frameBorder="0"
        title="Paper.io 2 Game"
      />
    </FullscreenGame>
  );
};

export default PaperIOGame;