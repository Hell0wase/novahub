import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface SnakeGameProps {
  onBack: () => void;
}

const SnakeGame = ({ onBack }: SnakeGameProps) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameStarted, setGameStarted] = useState(false);

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400;

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setDirection({ x: 0, y: 1 });
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted || (direction.x === 0 && direction.y === 0)) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameStarted, generateFood]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake, gameStarted, gameOver]);

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Games
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Snake Game
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Snake Classic</span>
              <div className="flex items-center space-x-4">
                <span className="text-sm">Score: {score}</span>
                <Button variant="outline" size="sm" onClick={resetGame}>
                  <RotateCcw size={16} className="mr-2" />
                  Reset
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div 
              className="bg-background border-2 border-border rounded-lg mb-4 relative"
              style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
            >
              {!gameStarted && !gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Ready to Play?</h3>
                    <p className="text-muted-foreground mb-4">Use arrow keys to control the snake</p>
                    <Button onClick={startGame} className="bg-gradient-primary hover:opacity-90">
                      Start Game
                    </Button>
                  </div>
                </div>
              )}

              {gameStarted && !gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                  <div className="text-center">
                    <div className="animate-pulse text-2xl mb-2">🐍</div>
                    <p className="text-lg">Playing...</p>
                    <p className="text-sm text-muted-foreground">Score: {score}</p>
                  </div>
                </div>
              )}

              {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/90 rounded-lg">
                  <div className="text-center">
                    <Trophy className="mx-auto mb-4 text-yellow-500" size={48} />
                    <h3 className="text-xl font-bold mb-2">Game Over!</h3>
                    <p className="text-lg mb-4">Final Score: {score}</p>
                    <Button onClick={resetGame} className="bg-gradient-primary hover:opacity-90">
                      Play Again
                    </Button>
                  </div>
                </div>
              )}

              {/* Game grid */}
              <div className="relative w-full h-full">
                {/* Snake */}
                {snake.map((segment, index) => (
                  <div
                    key={index}
                    className={`absolute ${index === 0 ? 'bg-green-400' : 'bg-green-600'} rounded-sm`}
                    style={{
                      left: `${(segment.x / GRID_SIZE) * 100}%`,
                      top: `${(segment.y / GRID_SIZE) * 100}%`,
                      width: `${100 / GRID_SIZE}%`,
                      height: `${100 / GRID_SIZE}%`,
                    }}
                  />
                ))}
                {/* Food */}
                <div
                  className="absolute bg-red-500 rounded-full"
                  style={{
                    left: `${(food.x / GRID_SIZE) * 100}%`,
                    top: `${(food.y / GRID_SIZE) * 100}%`,
                    width: `${100 / GRID_SIZE}%`,
                    height: `${100 / GRID_SIZE}%`,
                  }}
                />
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
                    <div key={`v-${i}`} className="absolute border-l border-border" style={{ left: `${(i / GRID_SIZE) * 100}%`, height: '100%' }} />
                  ))}
                  {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
                    <div key={`h-${i}`} className="absolute border-t border-border" style={{ top: `${(i / GRID_SIZE) * 100}%`, width: '100%' }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Use WASD or Arrow Keys to move</p>
              <p>Eat the red food to grow and increase your score!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SnakeGame;