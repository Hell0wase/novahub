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
        <title>Minecraft Classic</title>
        <style>
          body { margin: 0; padding: 0; overflow: hidden; background: #000; }
          canvas { width: 100%; height: 100vh; display: block; }
        </style>
      </head>
      <body>
        <canvas id="canvas"></canvas>
        <script src="https://classic.minecraft.net/js/game.js"></script>
        <script>
          const canvas = document.getElementById('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          
          // Simple Minecraft-like demo
          const blockSize = 32;
          const world = [];
          
          // Initialize world
          for(let x = 0; x < 50; x++) {
            world[x] = [];
            for(let y = 0; y < 50; y++) {
              world[x][y] = Math.random() > 0.7 ? 1 : 0;
            }
          }
          
          let camera = { x: 0, y: 0 };
          
          function draw() {
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            for(let x = 0; x < 50; x++) {
              for(let y = 0; y < 50; y++) {
                if(world[x][y]) {
                  ctx.fillStyle = '#8B4513';
                  ctx.fillRect(
                    x * blockSize - camera.x, 
                    y * blockSize - camera.y, 
                    blockSize, 
                    blockSize
                  );
                }
              }
            }
            
            requestAnimationFrame(draw);
          }
          
          document.addEventListener('keydown', (e) => {
            const speed = 5;
            switch(e.key) {
              case 'ArrowUp': camera.y -= speed; break;
              case 'ArrowDown': camera.y += speed; break;
              case 'ArrowLeft': camera.x -= speed; break;
              case 'ArrowRight': camera.x += speed; break;
            }
          });
          
          canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left + camera.x) / blockSize);
            const y = Math.floor((e.clientY - rect.top + camera.y) / blockSize);
            if(x >= 0 && x < 50 && y >= 0 && y < 50) {
              world[x][y] = world[x][y] ? 0 : 1;
            }
          });
          
          draw();
          
          // Instructions
          const instructions = document.createElement('div');
          instructions.style.position = 'absolute';
          instructions.style.top = '10px';
          instructions.style.left = '10px';
          instructions.style.color = 'white';
          instructions.style.fontFamily = 'Arial';
          instructions.style.fontSize = '14px';
          instructions.innerHTML = 'Use arrow keys to move, click to place/remove blocks';
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
        title="Minecraft Game"
      />
    </div>
  );
};

export default MinecraftGame;