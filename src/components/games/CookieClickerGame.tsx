import { useRef, useEffect } from 'react';

interface CookieClickerGameProps {
  onBack: () => void;
}

const CookieClickerGame = ({ onBack }: CookieClickerGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Cookie Clicker</title>
        <style>
          body { 
            margin: 0; 
            padding: 20px; 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #FFE4B5, #DEB887); 
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .game-container {
            text-align: center;
            background: rgba(255,255,255,0.9);
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            max-width: 500px;
            width: 100%;
          }
          .cookie {
            width: 200px;
            height: 200px;
            background: #D2691E;
            border-radius: 50%;
            margin: 20px auto;
            cursor: pointer;
            transition: transform 0.1s;
            position: relative;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          }
          .cookie:hover {
            transform: scale(1.05);
          }
          .cookie:active {
            transform: scale(0.95);
          }
          .cookie::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: #8B4513;
            border-radius: 50%;
            top: 30px;
            left: 50px;
          }
          .cookie::after {
            content: '';
            position: absolute;
            width: 15px;
            height: 15px;
            background: #8B4513;
            border-radius: 50%;
            bottom: 60px;
            right: 40px;
          }
          .chip {
            position: absolute;
            width: 12px;
            height: 12px;
            background: #654321;
            border-radius: 50%;
          }
          .chip1 { top: 80px; left: 120px; }
          .chip2 { top: 120px; left: 80px; }
          .chip3 { bottom: 100px; left: 100px; }
          .score {
            font-size: 2em;
            font-weight: bold;
            color: #8B4513;
            margin: 20px 0;
          }
          .cps {
            font-size: 1.2em;
            color: #666;
            margin: 10px 0;
          }
          .upgrades {
            margin-top: 30px;
          }
          .upgrade {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #F5DEB3;
            margin: 10px 0;
            padding: 15px;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.2s;
          }
          .upgrade:hover {
            background: #DEB887;
          }
          .upgrade.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .upgrade-info {
            text-align: left;
          }
          .upgrade-name {
            font-weight: bold;
            color: #8B4513;
          }
          .upgrade-desc {
            font-size: 0.9em;
            color: #666;
          }
          .upgrade-cost {
            font-weight: bold;
            color: #D2691E;
          }
        </style>
      </head>
      <body>
        <div class="game-container">
          <h1 style="color: #8B4513; margin-bottom: 10px;">Cookie Clicker</h1>
          <div class="score" id="score">0 cookies</div>
          <div class="cps" id="cps">0 cookies per second</div>
          
          <div class="cookie" id="cookie" onclick="clickCookie()">
            <div class="chip chip1"></div>
            <div class="chip chip2"></div>
            <div class="chip chip3"></div>
          </div>
          
          <div class="upgrades">
            <div class="upgrade" id="cursor" onclick="buyUpgrade('cursor')">
              <div class="upgrade-info">
                <div class="upgrade-name">Cursor</div>
                <div class="upgrade-desc">Auto-clicks the cookie</div>
              </div>
              <div class="upgrade-cost" id="cursorCost">15 cookies</div>
            </div>
            
            <div class="upgrade" id="grandma" onclick="buyUpgrade('grandma')">
              <div class="upgrade-info">
                <div class="upgrade-name">Grandma</div>
                <div class="upgrade-desc">Bakes cookies for you</div>
              </div>
              <div class="upgrade-cost" id="grandmaCost">100 cookies</div>
            </div>
            
            <div class="upgrade" id="farm" onclick="buyUpgrade('farm')">
              <div class="upgrade-info">
                <div class="upgrade-name">Farm</div>
                <div class="upgrade-desc">Grows cookie ingredients</div>
              </div>
              <div class="upgrade-cost" id="farmCost">1100 cookies</div>
            </div>
          </div>
        </div>
        
        <script>
          let cookies = 0;
          let cookiesPerSecond = 0;
          let clickPower = 1;
          
          const upgrades = {
            cursor: { cost: 15, owned: 0, cps: 0.1 },
            grandma: { cost: 100, owned: 0, cps: 1 },
            farm: { cost: 1100, owned: 0, cps: 8 }
          };
          
          function clickCookie() {
            cookies += clickPower;
            updateDisplay();
            
            // Add click animation
            const cookie = document.getElementById('cookie');
            cookie.style.transform = 'scale(0.95)';
            setTimeout(() => {
              cookie.style.transform = 'scale(1)';
            }, 100);
          }
          
          function buyUpgrade(type) {
            const upgrade = upgrades[type];
            if (cookies >= upgrade.cost) {
              cookies -= upgrade.cost;
              upgrade.owned++;
              upgrade.cost = Math.floor(upgrade.cost * 1.15);
              cookiesPerSecond += upgrade.cps;
              updateDisplay();
            }
          }
          
          function updateDisplay() {
            document.getElementById('score').textContent = Math.floor(cookies) + ' cookies';
            document.getElementById('cps').textContent = cookiesPerSecond.toFixed(1) + ' cookies per second';
            
            // Update upgrade costs and availability
            Object.keys(upgrades).forEach(type => {
              const upgrade = upgrades[type];
              const element = document.getElementById(type);
              const costElement = document.getElementById(type + 'Cost');
              
              costElement.textContent = upgrade.cost + ' cookies';
              
              if (cookies >= upgrade.cost) {
                element.classList.remove('disabled');
              } else {
                element.classList.add('disabled');
              }
              
              if (upgrade.owned > 0) {
                element.querySelector('.upgrade-name').textContent = 
                  element.querySelector('.upgrade-name').textContent.split(' (')[0] + ' (' + upgrade.owned + ')';
              }
            });
          }
          
          // Auto-generate cookies
          setInterval(() => {
            cookies += cookiesPerSecond / 10;
            updateDisplay();
          }, 100);
          
          updateDisplay();
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
    <div className="w-full h-full bg-background">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        frameBorder="0"
        title="Cookie Clicker Game"
      />
    </div>
  );
};

export default CookieClickerGame;