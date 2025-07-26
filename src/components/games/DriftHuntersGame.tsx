import React, { useRef, useEffect } from 'react';

interface DriftHuntersGameProps {
  onBack: () => void;
}

const DriftHuntersGame = ({ onBack }: DriftHuntersGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drift Hunters</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        #gameContainer {
            width: 100vw;
            height: 100vh;
            position: relative;
            background: linear-gradient(45deg, #1a1a2e, #16213e);
        }
        canvas {
            display: block;
            margin: 0 auto;
            background: #0f0f23;
            border: 2px solid #333;
        }
        .hud {
            position: absolute;
            top: 20px;
            left: 20px;
            color: white;
            font-size: 18px;
            z-index: 10;
        }
        .controls {
            position: absolute;
            bottom: 20px;
            left: 20px;
            color: white;
            font-size: 14px;
            z-index: 10;
        }
    </style>
</head>
<body>
    <div id="gameContainer">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <div class="hud">
            <div>Speed: <span id="speed">0</span> km/h</div>
            <div>Score: <span id="score">0</span></div>
            <div>Drift Points: <span id="drift">0</span></div>
        </div>
        <div class="controls">
            <div>Controls: WASD or Arrow Keys to drive</div>
            <div>Hold SPACE to handbrake</div>
        </div>
    </div>

    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        // Resize canvas to fill container
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Game state
        const game = {
            car: {
                x: canvas.width / 2,
                y: canvas.height / 2,
                angle: 0,
                speed: 0,
                maxSpeed: 8,
                acceleration: 0.2,
                friction: 0.95,
                turnSpeed: 0.05,
                isDrifting: false
            },
            score: 0,
            driftPoints: 0,
            keys: {},
            obstacles: []
        };

        // Create obstacles/track boundaries
        for (let i = 0; i < 20; i++) {
            game.obstacles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                width: 60,
                height: 20,
                angle: Math.random() * Math.PI * 2
            });
        }

        // Input handling
        document.addEventListener('keydown', (e) => {
            game.keys[e.code] = true;
        });

        document.addEventListener('keyup', (e) => {
            game.keys[e.code] = false;
        });

        function updateCar() {
            const car = game.car;
            
            // Acceleration
            if (game.keys['KeyW'] || game.keys['ArrowUp']) {
                car.speed = Math.min(car.speed + car.acceleration, car.maxSpeed);
            }
            if (game.keys['KeyS'] || game.keys['ArrowDown']) {
                car.speed = Math.max(car.speed - car.acceleration, -car.maxSpeed / 2);
            }
            
            // Turning
            if (game.keys['KeyA'] || game.keys['ArrowLeft']) {
                car.angle -= car.turnSpeed * (car.speed / car.maxSpeed);
            }
            if (game.keys['KeyD'] || game.keys['ArrowRight']) {
                car.angle += car.turnSpeed * (car.speed / car.maxSpeed);
            }
            
            // Handbrake drift
            if (game.keys['Space']) {
                car.isDrifting = true;
                car.speed *= 0.98;
                if (Math.abs(car.speed) > 2) {
                    game.driftPoints += Math.floor(Math.abs(car.speed));
                }
            } else {
                car.isDrifting = false;
            }
            
            // Apply friction
            car.speed *= car.friction;
            
            // Move car
            car.x += Math.cos(car.angle) * car.speed;
            car.y += Math.sin(car.angle) * car.speed;
            
            // Keep car on screen
            if (car.x < 0) car.x = canvas.width;
            if (car.x > canvas.width) car.x = 0;
            if (car.y < 0) car.y = canvas.height;
            if (car.y > canvas.height) car.y = 0;
            
            // Update score
            game.score += Math.floor(Math.abs(car.speed));
        }

        function drawCar() {
            const car = game.car;
            
            ctx.save();
            ctx.translate(car.x, car.y);
            ctx.rotate(car.angle);
            
            // Car body
            ctx.fillStyle = car.isDrifting ? '#ff6b6b' : '#4ecdc4';
            ctx.fillRect(-15, -8, 30, 16);
            
            // Car details
            ctx.fillStyle = '#333';
            ctx.fillRect(-12, -6, 8, 4);
            ctx.fillRect(-12, 2, 8, 4);
            ctx.fillRect(8, -6, 8, 4);
            ctx.fillRect(8, 2, 8, 4);
            
            // Drift smoke
            if (car.isDrifting && Math.abs(car.speed) > 2) {
                for (let i = 0; i < 5; i++) {
                    const opacity = 0.3 - i * 0.06;
                    ctx.fillStyle = 'rgba(200, 200, 200, ' + opacity + ')';
                    ctx.beginPath();
                    ctx.arc(-20 - i * 5, 0, 8 - i, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            ctx.restore();
        }

        function drawObstacles() {
            ctx.fillStyle = '#666';
            game.obstacles.forEach(obstacle => {
                ctx.save();
                ctx.translate(obstacle.x, obstacle.y);
                ctx.rotate(obstacle.angle);
                ctx.fillRect(-obstacle.width/2, -obstacle.height/2, obstacle.width, obstacle.height);
                ctx.restore();
            });
        }

        function drawTrack() {
            // Draw track lines
            ctx.strokeStyle = '#444';
            ctx.lineWidth = 3;
            ctx.setLineDash([20, 10]);
            
            // Circular track
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 200, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 300, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.setLineDash([]);
        }

        function updateHUD() {
            document.getElementById('speed').textContent = Math.floor(Math.abs(game.car.speed * 20));
            document.getElementById('score').textContent = game.score;
            document.getElementById('drift').textContent = game.driftPoints;
        }

        function gameLoop() {
            // Clear canvas
            ctx.fillStyle = '#0f0f23';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw
            updateCar();
            drawTrack();
            drawObstacles();
            drawCar();
            updateHUD();
            
            requestAnimationFrame(gameLoop);
        }

        // Start game
        gameLoop();
    </script>
</body>
</html>`;

    const blob = new Blob([gameHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
    
    return () => URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="w-full h-full bg-background">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Drift Hunters Game"
      />
    </div>
  );
};

export default DriftHuntersGame;
