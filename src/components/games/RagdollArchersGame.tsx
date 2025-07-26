import React, { useRef, useEffect } from 'react';

interface RagdollArchersGameProps {
  onBack: () => void;
}

const RagdollArchersGame = ({ onBack }: RagdollArchersGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ragdoll Archers</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(to bottom, #87CEEB, #90EE90);
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        #gameContainer {
            width: 100vw;
            height: 100vh;
            position: relative;
        }
        canvas {
            display: block;
            margin: 0 auto;
            background: linear-gradient(to bottom, #87CEEB, #90EE90);
        }
        .hud {
            position: absolute;
            top: 20px;
            left: 20px;
            color: #333;
            font-size: 18px;
            font-weight: bold;
            z-index: 10;
        }
        .controls {
            position: absolute;
            bottom: 20px;
            left: 20px;
            color: #333;
            font-size: 14px;
            z-index: 10;
        }
        .power-bar {
            position: absolute;
            top: 60px;
            left: 20px;
            width: 200px;
            height: 20px;
            border: 2px solid #333;
            background: #fff;
            z-index: 10;
        }
        .power-fill {
            height: 100%;
            background: linear-gradient(to right, #green, #yellow, #red);
            width: 0%;
            transition: width 0.1s;
        }
    </style>
</head>
<body>
    <div id="gameContainer">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <div class="hud">
            <div>Player <span id="currentPlayer">1</span> Turn</div>
            <div>Wind: <span id="wind">0</span></div>
        </div>
        <div class="power-bar">
            <div class="power-fill" id="powerFill"></div>
        </div>
        <div class="controls">
            <div>Click and drag to aim, release to shoot</div>
            <div>Arrow keys to adjust angle</div>
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
            currentPlayer: 1,
            wind: (Math.random() - 0.5) * 0.02,
            power: 0,
            powerIncreasing: true,
            isAiming: false,
            isDragging: false,
            arrows: [],
            players: [
                {
                    x: 100,
                    y: canvas.height - 150,
                    angle: 0,
                    health: 100,
                    color: '#ff6b6b'
                },
                {
                    x: canvas.width - 100,
                    y: canvas.height - 150,
                    angle: Math.PI,
                    health: 100,
                    color: '#4ecdc4'
                }
            ],
            terrain: []
        };

        // Generate terrain
        for (let x = 0; x < canvas.width; x += 10) {
            const height = Math.sin(x * 0.01) * 50 + Math.random() * 20 + canvas.height - 100;
            game.terrain.push({ x, y: height });
        }

        // Arrow class
        class Arrow {
            constructor(x, y, vx, vy) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.trail = [];
                this.stuck = false;
            }

            update() {
                if (this.stuck) return;

                this.trail.push({ x: this.x, y: this.y });
                if (this.trail.length > 10) this.trail.shift();

                this.vy += 0.3; // gravity
                this.vx += game.wind; // wind effect
                
                this.x += this.vx;
                this.y += this.vy;

                // Check terrain collision
                const terrainY = getTerrainHeight(this.x);
                if (this.y >= terrainY) {
                    this.stuck = true;
                    this.y = terrainY;
                }

                // Check player collision
                game.players.forEach((player, index) => {
                    const dx = this.x - player.x;
                    const dy = this.y - player.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 30 && !this.stuck) {
                        this.stuck = true;
                        player.health -= 25;
                        
                        // Ragdoll effect
                        player.x += this.vx * 2;
                        player.y += this.vy * 2;
                        
                        if (player.health <= 0) {
                            alert('Player ' + (index + 1) + ' is defeated! Player ' + (game.currentPlayer === 1 ? 2 : 1) + ' wins!');
                            location.reload();
                        }
                    }
                });

                // Remove if off screen
                if (this.x < 0 || this.x > canvas.width || this.y > canvas.height) {
                    this.stuck = true;
                }
            }

            draw() {
                // Draw trail
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                this.trail.forEach((point, index) => {
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                });
                ctx.stroke();

                // Draw arrow
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(Math.atan2(this.vy, this.vx));
                
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(-15, -2, 25, 4);
                
                ctx.fillStyle = '#666';
                ctx.fillRect(8, -5, 8, 10);
                
                ctx.restore();
            }
        }

        function getTerrainHeight(x) {
            const index = Math.floor(x / 10);
            if (index >= 0 && index < game.terrain.length) {
                return game.terrain[index].y;
            }
            return canvas.height - 100;
        }

        // Input handling
        let mouseX = 0, mouseY = 0;
        let startX = 0, startY = 0;

        canvas.addEventListener('mousedown', (e) => {
            const rect = canvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            game.isDragging = true;
        });

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseup', (e) => {
            if (game.isDragging) {
                const player = game.players[game.currentPlayer - 1];
                const dx = mouseX - startX;
                const dy = mouseY - startY;
                
                const power = Math.min(Math.sqrt(dx * dx + dy * dy) / 10, 15);
                const angle = Math.atan2(dy, dx);
                
                const arrow = new Arrow(
                    player.x,
                    player.y - 20,
                    Math.cos(angle) * power,
                    Math.sin(angle) * power
                );
                
                game.arrows.push(arrow);
                game.currentPlayer = game.currentPlayer === 1 ? 2 : 1;
                game.wind = (Math.random() - 0.5) * 0.02;
                
                game.isDragging = false;
            }
        });

        function drawTerrain() {
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            
            game.terrain.forEach(point => {
                ctx.lineTo(point.x, point.y);
            });
            
            ctx.lineTo(canvas.width, canvas.height);
            ctx.fill();
            
            // Grass
            ctx.fillStyle = '#90EE90';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            
            game.terrain.forEach(point => {
                ctx.lineTo(point.x, point.y - 5);
            });
            
            ctx.lineTo(canvas.width, canvas.height);
            ctx.fill();
        }

        function drawPlayer(player, index) {
            // Body
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x - 10, player.y - 30, 20, 30);
            
            // Head
            ctx.beginPath();
            ctx.arc(player.x, player.y - 35, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Bow
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(player.x + (index === 0 ? 15 : -15), player.y - 20, 12, 0, Math.PI * 2);
            ctx.stroke();
            
            // Health bar
            ctx.fillStyle = 'red';
            ctx.fillRect(player.x - 15, player.y - 50, 30, 5);
            ctx.fillStyle = 'green';
            ctx.fillRect(player.x - 15, player.y - 50, (player.health / 100) * 30, 5);
        }

        function drawAimLine() {
            if (game.isDragging) {
                const player = game.players[game.currentPlayer - 1];
                
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(player.x, player.y - 20);
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }

        function updateHUD() {
            document.getElementById('currentPlayer').textContent = game.currentPlayer;
            document.getElementById('wind').textContent = (game.wind * 1000).toFixed(1);
        }

        function gameLoop() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw game elements
            drawTerrain();
            
            game.players.forEach((player, index) => {
                drawPlayer(player, index);
            });
            
            game.arrows.forEach(arrow => {
                arrow.update();
                arrow.draw();
            });
            
            drawAimLine();
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
        title="Ragdoll Archers Game"
      />
    </div>
  );
};

export default RagdollArchersGame;