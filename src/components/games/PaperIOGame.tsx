import { useRef, useEffect } from 'react';

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
        <title>Paper.io Style Game</title>
        <style>
          body { margin: 0; padding: 0; overflow: hidden; background: #222; }
          canvas { width: 100%; height: 100vh; display: block; }
        </style>
      </head>
      <body>
        <canvas id="canvas"></canvas>
        <script>
          const canvas = document.getElementById('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          
          const GRID_SIZE = 20;
          const COLS = Math.floor(canvas.width / GRID_SIZE);
          const ROWS = Math.floor(canvas.height / GRID_SIZE);
          
          class Player {
            constructor(x, y, color) {
              this.x = x;
              this.y = y;
              this.color = color;
              this.direction = { x: 1, y: 0 };
              this.trail = [];
              this.territory = new Set();
              this.score = 0;
              
              // Initialize starting territory
              for(let i = -2; i <= 2; i++) {
                for(let j = -2; j <= 2; j++) {
                  this.territory.add((x+i) + ',' + (y+j));
                }
              }
            }
            
            update() {
              // Move player
              this.x += this.direction.x;
              this.y += this.direction.y;
              
              // Wrap around
              if(this.x < 0) this.x = COLS - 1;
              if(this.x >= COLS) this.x = 0;
              if(this.y < 0) this.y = ROWS - 1;
              if(this.y >= ROWS) this.y = 0;
              
              const currentPos = this.x + ',' + this.y;
              
              // If we're in our territory, complete the trail
              if(this.territory.has(currentPos) && this.trail.length > 0) {
                this.completeTrail();
              } else if(!this.territory.has(currentPos)) {
                // Add to trail if we're outside territory
                this.trail.push({x: this.x, y: this.y});
              }
            }
            
            completeTrail() {
              // Simple flood fill to capture area
              if(this.trail.length > 2) {
                this.trail.forEach(pos => {
                  this.territory.add(pos.x + ',' + pos.y);
                });
                
                // Simple area capture (fill enclosed area)
                this.fillEnclosedArea();
                this.score = this.territory.size;
              }
              this.trail = [];
            }
            
            fillEnclosedArea() {
              // Simple implementation - just add adjacent cells
              const newCells = new Set();
              this.trail.forEach(pos => {
                for(let dx = -1; dx <= 1; dx++) {
                  for(let dy = -1; dy <= 1; dy++) {
                    const newX = pos.x + dx;
                    const newY = pos.y + dy;
                    if(newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS) {
                      newCells.add(newX + ',' + newY);
                    }
                  }
                }
              });
              
              newCells.forEach(cell => this.territory.add(cell));
            }
            
            draw() {
              // Draw territory
              ctx.fillStyle = this.color + '40'; // Semi-transparent
              this.territory.forEach(cell => {
                const [x, y] = cell.split(',').map(Number);
                ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
              });
              
              // Draw trail
              ctx.fillStyle = this.color + '80';
              this.trail.forEach(pos => {
                ctx.fillRect(pos.x * GRID_SIZE, pos.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
              });
              
              // Draw player
              ctx.fillStyle = this.color;
              ctx.fillRect(this.x * GRID_SIZE, this.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
              
              // Draw border around territory
              ctx.strokeStyle = this.color;
              ctx.lineWidth = 2;
              this.territory.forEach(cell => {
                const [x, y] = cell.split(',').map(Number);
                ctx.strokeRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
              });
            }
          }
          
          const player = new Player(
            Math.floor(COLS/2), 
            Math.floor(ROWS/2), 
            '#4CAF50'
          );
          
          // AI opponents
          const bots = [];
          for(let i = 0; i < 3; i++) {
            const bot = new Player(
              Math.floor(Math.random() * COLS),
              Math.floor(Math.random() * ROWS),
              ['#FF6B6B', '#4ECDC4', '#45B7D1'][i]
            );
            bots.push(bot);
          }
          
          // Controls
          document.addEventListener('keydown', (e) => {
            switch(e.key) {
              case 'ArrowUp':
                if(player.direction.y !== 1) player.direction = {x: 0, y: -1};
                break;
              case 'ArrowDown':
                if(player.direction.y !== -1) player.direction = {x: 0, y: 1};
                break;
              case 'ArrowLeft':
                if(player.direction.x !== 1) player.direction = {x: -1, y: 0};
                break;
              case 'ArrowRight':
                if(player.direction.x !== -1) player.direction = {x: 1, y: 0};
                break;
            }
          });
          
          function gameLoop() {
            // Clear canvas
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            for(let x = 0; x <= COLS; x++) {
              ctx.beginPath();
              ctx.moveTo(x * GRID_SIZE, 0);
              ctx.lineTo(x * GRID_SIZE, canvas.height);
              ctx.stroke();
            }
            for(let y = 0; y <= ROWS; y++) {
              ctx.beginPath();
              ctx.moveTo(0, y * GRID_SIZE);
              ctx.lineTo(canvas.width, y * GRID_SIZE);
              ctx.stroke();
            }
            
            // Update and draw player
            player.update();
            player.draw();
            
            // Simple bot AI
            bots.forEach(bot => {
              if(Math.random() < 0.02) { // Random direction change
                const directions = [{x:0,y:-1}, {x:0,y:1}, {x:-1,y:0}, {x:1,y:0}];
                bot.direction = directions[Math.floor(Math.random() * 4)];
              }
              bot.update();
              bot.draw();
            });
            
            // Draw UI
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + player.score, 20, 30);
            ctx.fillText('Territory: ' + player.territory.size + ' cells', 20, 60);
            
            requestAnimationFrame(gameLoop);
          }
          
          setInterval(gameLoop, 100); // Slower game speed
          
          // Instructions
          const instructions = document.createElement('div');
          instructions.style.position = 'absolute';
          instructions.style.top = '10px';
          instructions.style.right = '10px';
          instructions.style.color = 'white';
          instructions.style.fontFamily = 'Arial';
          instructions.style.fontSize = '14px';
          instructions.innerHTML = 'Use arrow keys to move<br>Capture territory by returning to your base!';
          document.body.appendChild(instructions);
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
        title="Paper.io Game"
      />
    </div>
  );
};

export default PaperIOGame;