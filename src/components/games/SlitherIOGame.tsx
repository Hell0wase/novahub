import { useRef, useEffect } from 'react';

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
        <title>Slither.io Style Game</title>
        <style>
          body { margin: 0; padding: 0; overflow: hidden; background: #1a1a1a; }
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
          
          class Snake {
            constructor(x, y) {
              this.segments = [{x, y}];
              this.direction = { x: 1, y: 0 };
              this.color = '#4CAF50';
              this.speed = 2;
            }
            
            update() {
              const head = { ...this.segments[0] };
              head.x += this.direction.x * this.speed;
              head.y += this.direction.y * this.speed;
              
              // Wrap around screen
              if (head.x < 0) head.x = canvas.width;
              if (head.x > canvas.width) head.x = 0;
              if (head.y < 0) head.y = canvas.height;
              if (head.y > canvas.height) head.y = 0;
              
              this.segments.unshift(head);
              
              // Keep snake length manageable
              if (this.segments.length > 50) {
                this.segments.pop();
              }
            }
            
            draw() {
              this.segments.forEach((segment, index) => {
                const size = Math.max(8 - index * 0.1, 4);
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(segment.x, segment.y, size, 0, Math.PI * 2);
                ctx.fill();
              });
            }
            
            grow() {
              const tail = { ...this.segments[this.segments.length - 1] };
              this.segments.push(tail);
            }
          }
          
          class Food {
            constructor() {
              this.x = Math.random() * canvas.width;
              this.y = Math.random() * canvas.height;
              this.color = '#FF6B6B';
              this.size = 3;
            }
            
            draw() {
              ctx.fillStyle = this.color;
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          
          const snake = new Snake(canvas.width / 2, canvas.height / 2);
          const food = [];
          let score = 0;
          
          // Generate food
          for (let i = 0; i < 100; i++) {
            food.push(new Food());
          }
          
          let mouseX = canvas.width / 2;
          let mouseY = canvas.height / 2;
          
          canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
          });
          
          function gameLoop() {
            // Clear canvas
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Update snake direction based on mouse
            const head = snake.segments[0];
            const dx = mouseX - head.x;
            const dy = mouseY - head.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 5) {
              snake.direction.x = dx / distance;
              snake.direction.y = dy / distance;
            }
            
            snake.update();
            snake.draw();
            
            // Check food collision
            food.forEach((f, index) => {
              const dx = head.x - f.x;
              const dy = head.y - f.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 10) {
                food.splice(index, 1);
                food.push(new Food());
                snake.grow();
                score++;
              }
            });
            
            // Draw food
            food.forEach(f => f.draw());
            
            // Draw score
            ctx.fillStyle = 'white';
            ctx.font = '24px Arial';
            ctx.fillText('Score: ' + score, 20, 40);
            
            requestAnimationFrame(gameLoop);
          }
          
          gameLoop();
          
          // Instructions
          const instructions = document.createElement('div');
          instructions.style.position = 'absolute';
          instructions.style.top = '10px';
          instructions.style.right = '10px';
          instructions.style.color = 'white';
          instructions.style.fontFamily = 'Arial';
          instructions.style.fontSize = '14px';
          instructions.innerHTML = 'Move mouse to control snake, eat red dots to grow!';
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
        title="Slither.io Game"
      />
    </div>
  );
};

export default SlitherIOGame;
