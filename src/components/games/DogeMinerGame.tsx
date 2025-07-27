import React, { useRef, useEffect } from 'react';

interface DogeMinerGameProps {
  onBack: () => void;
}

const DogeMinerGame: React.FC<DogeMinerGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<!--[if lt IE 7]>      <html  lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html  lang="en" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html  lang="en" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>Dogeminer</title>
	<meta name="description"
		content="How to mine dogecoins? Find out in Dogeminer: The Dogecoin Mining Simulator. Very wow. To the moon!" />
	<meta name="keywords"
		content="dogeminer,doge miner,dogecoin,dogecoins,dogeminer game,wow,doge game,dogecoin game,dogecoins game,mining game,bitcoin,bitcoin game,funny game,amaze game,doge game,doge clicker, dodge miner, dodgecoin, to the moon,to the moon game,mining game,doge mining game, doge clicking game,clicking game,incremental, incremental game,idle game,cookie clicker, free to play, free to play game, free to play doge, f2p game, free web game, no install game" />
	<meta name="viewport"
		content="width=device-width, minimum-scale=1, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui, shrink-to-fit=no, height=device-height" />
	<meta property="og:title" content="Dogeminer: The Dogecoin Mining Simulator" />
	<meta property="og:site_name" content="Dogeminer: The Dogecoin Mining Simulator" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="" />
	<meta property="og:image" content="" />
	<meta property="og:image:secure_url" content="" />
	<meta property="og:image:width" content="300" />
	<meta property="og:image:height" content="300" />
	<meta property="og:description"
		content="How to mine dogecoins? Find out in Dogeminer: The Dogecoin Mining Simulator. Very wow. To the moon!" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<link rel="canonical" href="" />
	<link rel="icon"
		href="https://cdn.jsdelivr.net/gh/Nailington/3kh0-assets@aeb371b7e88542fd5e61eeed9e967a446d84fe1b/DogeMiner/favicon.ico"
		type="image/x-icon" />
	<link rel="image_src"
		href="https://cdn.jsdelivr.net/gh/Nailington/3kh0-assets@aeb371b7e88542fd5e61eeed9e967a446d84fe1b/DogeMiner/img/dogeminer_300x300.png" />
	<link rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/Nailington/3kh0-assets@aeb371b7e88542fd5e61eeed9e967a446d84fe1b/DogeMiner/css/main-v1-0-2-bs.css" />

	<link id="stylesheet"
		href="https://cdn.jsdelivr.net/gh/Nailington/3kh0-assets@aeb371b7e88542fd5e61eeed9e967a446d84fe1b/DogeMiner/css/sunny/jquery-ui-1.10.4.custom.min.css"
		rel="stylesheet" />

	<script>
		var loadtimer = setTimeout(function () {
                //If onload hasn't been triggered for 10 seconds, force it. Most likely a straggling ad or social button that is sleeping... this behaviour will change for update
                console.log("Forcing window.onload");
                window.dispatchEvent(new Event("load"));
            }, 10000);
	</script>
	<script
		src="https://cdn.jsdelivr.net/gh/Nailington/3kh0-assets@aeb371b7e88542fd5e61eeed9e967a446d84fe1b/js/main.js">
	</script>
</head>

<body style="background-color: #222222;">
	<div id="fb-root"></div>
	<div id="BG" class="gpurender animated fadeIn duration-30"></div>
	<div id="BG2" class="gpurender animated fadeIn duration-30"></div>

	<div class="introcontainer">
		<div id="intro-mm" class="below-intro animated fadeIn delay-12 duration-15">
			<div class="da-container"></div>
		</div>
	</div>
	<div id="introscreen" class="animated fadeInDown ui-widget ui-widget-content ui-corner-all tenpadding noselect">
		<div class="first-part">
			<div style="visibility: hidden;" class="md-modal md-effect-1" id="modal-cookies">
				<div class="md-content">
					<div class="cookies-long">
						<h3>Cookies and HTML local storage use</h3>
						<h4>Short version</h4>
						<ul>
							<li>
								The game saves your progress to the browsers HTML local storage.
								<a href="https://www.w3schools.com/html/html5_webstorage.asp"
									title="W3 Schools definition of local storage" target="_blank" rel="nofollow">What
									is local storage?</a>
							</li>
							<li>The game integrates with 3rd party services provided by Google, Facebook and Twitter,
								which in turn uses cookies to provide social media features, analyse traffic and
								personalise content &amp; ads.</li>
							<li>
								Information gathering is <em>only</em> done by these services. These parties may know
								you visited this website, if you use their services. They may and probably will share
								this data with their partners.
								We can't control them but we don't believe this knowledge poses any threat to you.
							</li>
						</ul>
						<p>Those are the key points. If you want to know more, keep reading.</p>
						<h4>Statistics tracking</h4>
						<p>
							This game measures visitors by using Google Analytics. This records what pages you view
							within the game, how you arrived at the game and some basic information about your computer.
							All of that information is
							anonymous &ndash; so we don't know who you are; just
							that&nbsp;<em>somebody&nbsp;</em>visited the game.
						</p>
						<p>The information collected from analytics helps us understand what parts of the game are doing
							well, how people arrive at the game etc. Like most games, we use this information to make it
							better.</p>
						<p>
							You can learn more about&nbsp;<a href="https://www.google.com/analytics/learn/privacy.html"
								title="Google Analytics' privacy policy" target="_blank">Google
								Analytics</a>&nbsp;or&nbsp;
							<a href="https://tools.google.com/dlpage/gaoptout"
								title="How to opt out of google analytics" target="_blank" rel="nofollow">opt out if you
								wish</a>.
						</p>
						<button class="md-close">OK</button>
					</div>
				</div>
			</div>
			<div class="md-overlay"></div>
			<h1>Welcome to
				<img alt="Dogecoin" src="https://cdn.jsdelivr.net/gh/Nailington/3kh0-assets@aeb371b7e88542fd5e61eeed9e967a446d84fe1b/DogeMiner/img/dogecoin-d.png" style="height: 70px; width: 70px;" /> DOGEMINER</h1>
				<p>The Dogecoin Mining Simulator</p>
				<div class="intro-doge level1 level1-doge_mine1u0 noselect animated fadeIn"></div>

				<div id="loading-indicator">
					<div class="loadingwrap">
						<div class="l">L</div>
						<div class="o">O</div>
						<div class="a">A</div>
						<div class="d">D</div>
						<div class="i">I</div>
						<div class="n">N</div>
						<div class="g">G</div>
					</div>
					<div id="loadingwhat"></div>
					<script type="text/javascript">
						var dotstr = '<span class="animated flash delay-8 duration-10">.</span><span class="animated flash delay-9 duration-10">.</span><span class="animated flash delay-10 duration-10">.</span>';
                        var loadArr = [
                            "Calibrating pickaxe",
                            "Adding <strong>wow</strong> to every sentence",
                            "Gathering shibes",
                            "Enslaving kittens",
                            "Analyzing users browser history",
                            "Just kidding, Dave",
                            "Initializing Artificial Intelligence matrix",
                            "We seem to be stuck in loading. Investigating options",
                            "Options limited. Stalling for time",
                            "Manually overriding loading system",
                        ];
                        var loadcursor = 0;

                        function nextLoaderText() {
                            console.log("Loader-timer tick.");
                            //Check if element still exists (if not, we are done!)
                            var tmp_element = document.getElementById("loadingwhat");
                            if (typeof tmp_element != "undefined" && tmp_element !== null) {
                                tmp_element.className = "animated zoomOut duration-5";

                                setTimeout(function () {
                                    tmp_element.innerHTML = loadArr[loadcursor] + dotstr;
                                    if (loadcursor++ >= loadArr.length - 1) {
                                        //reached the end, way too long to load, manual override required
                                        //game might not work 100% but atleast the button might
                                        var override_button = document.getElementById("start-playing");
                                        override_button.className += " animated fadeInDown duration-5";
                                        override_button.style.marginTop = "75px";
                                        override_button.style.display = "block";
                                        override_button.style.visibility = "visible";

                                        tmp_element.innerHTML = "Stuck in loading, but you can try the button. Godspeed.";
                                        tmp_element.className = "animated zoomIn duration-5";
                                    } else {
                                        tmp_element.className = "animated zoomIn duration-5";
                                        //call function again
                                        setTimeout(function () {
                                            nextLoaderText();
                                        }, 3000 + Math.random() * 2500);
                                    }
                                }, 501);
                            }
                        }
                        setTimeout(function () {
                            nextLoaderText();
                        }, 3000);
					</script>
				</div>
				<button style="visibility: hidden;" id="start-playing">START PLAYING</button>
				<div class="cookies-consent">
					<strong>Notice:</strong> By playing this game you are agreeing to the use of cookies in order to
					save your progress and provide other features.
					<em class="md-trigger" data-modal="modal-cookies">Click here for details.</em>
				</div>
		</div>

		<div class="second-part" style="display: none;">
			<h2 class="animated fadeInDown duration-10 delay-15">This is your target.</h2>
			<h3 class="animated fadeInDown duration-10 delay-30">The moon.</h3>
			<h3 class="animated fadeInDown duration-10 delay-45">You need to go there!</h3>
			<img class="intro-rocket animated bounceInUp duration-10 delay-55" src="https://cdn.jsdelivr.net/gh/Nailington/3kh0-assets@aeb371b7e88542fd5e61eeed9e967a446d84fe1b/DogeMiner/img/flyingrocket.png" alt="Flying Doge rocket" height="500" width="187" style="position: absolute; left: 200px; top: 250px;" />
			<button id="second-part-button" class="animated fadeInDown duration-10 delay-65">GOT IT</button>
		</div>
		<div class="third-part" style="display: none;">
			<h3>The cost to go to the moon is
				<strong class="animated flash delay-15 duration-10">50,000,000,000 dogecoin.</strong></h3>
			<h4 class="animated fadeInDown delay-25">That's
				<strong class="animated flash delay-35 duration-5">50 billion</strong> dogecoin! Wow, such many.</h4>
			<div class="third-part-doge">
				<h2 class="animated fadeInDown delay-40">To mine dogecoin, just click on Doge</h2>
				<div class="wowcontainer"></div>
				<div id="tutminer" class="level1 level1-doge_mine1u0 noselect animated fadeIn delay-40"></div>
				<div class="hand hand-hand1 animated bounceInDown delay-50 duration-10"></div>
				<button id="third-part-button" class="animated fadeInUp delay-60 duration-10">GOT IT</button>
			</div>
			<div class="third-part-shop" style="display: none;">
				<h2>Mine faster by hiring helpers:</h2>
				<div class="space-maker">
					<div class="miniwowcontainer"></div>
					<div class="shibes-example">
						<div style="left: 10px; top: 19px; position: absolute; width: 50px; height: 50px;"
							class="animated bounceIn delay-5 level1 level1-shibe0"></div>
						<div style="left: 40px; top: 18px; position: absolute; width: 50px; height: 50px;"
							class="animated bounceIn delay-14 level1 level1-shibe0"></div>
						<div style="left: 54px; top: 13px; position: absolute; width: 50px; height: 50px;"
							class="animated bounceIn delay-2 level1 level1-shibe0"></div>
						<div style="left: 77px; top: 28px; position: absolute; width: 50px; height: 50px;"
							class="animated bounceIn delay-6 level1 level1-shibe0"></div>
						<div style="left: 93px; top: 15px; position: absolute; width: 50px; height: 50px;"
							class="animated bounceIn delay-12 level1 level1-shibe0"></div>
						<div tyle="left:111px;top:16px;position:absolute;width:50px;height:50px;"
							class="animated bounceIn delay-17 level1 level1-shibe0"></div>
						<div style="left: 129px; top: 13px; position: absolute; width: 50px; height: 50px;"
							class="animated bounceIn delay-23 level1 level1-shibe0"></div>
						<div style="left: 160px; top: 18px; position: absolute; width: 50px; height: 50px;"
							class="animated bounceIn delay-25 level1 level1-shibe0"></div>
					</div>
				</div>
				<h5 class="animated fadeInDown delay-45">The helpers, your pickaxe &amp; more can be
					<span id="upgraded-example" class="animated flash delay-70 duration-10">upgraded</span> for
					increased income.</h5>
				<button id="last-part-button" class="animated fadeInUp duration-10 delay-90">LETS GO</button>
			</div>
		</div>
	</div>
	<script
		src="https://cdn.jsdelivr.net/gh/Nailington/3kh0-assets@aeb371b7e88542fd5e61eeed9e967a446d84fe1b/DogeMiner/js/plugins.js">
	</script>
	<script
		src="https://cdn.jsdelivr.net/gh/Nailington/3kh0-assets@aeb371b7e88542fd5e61eeed9e967a446d84fe1b/DogeMiner/js/main.js">
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
        title="Doge Miner Game"
      />
    </div>
  );
};

export default DogeMinerGame;