import React, { useState, useEffect, useCallback } from 'react';
import FullscreenGame from '../FullscreenGame';

interface SnakeGameProps {
  onBack: () => void;
}

const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const GRID_COUNT = CANVAS_SIZE / GRID_SIZE;

interface Position {
  x: number;
  y: number;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ onBack }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_COUNT),
        y: Math.floor(Math.random() * GRID_COUNT),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || (direction.x === 0 && direction.y === 0)) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_COUNT || head.y < 0 || head.y >= GRID_COUNT) {
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
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snakeHighScore', newScore.toString());
          }
          return newScore;
        });
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, generateFood, highScore]);

  // Game loop
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          e.preventDefault();
          setDirection(prev => prev.y !== 1 ? { x: 0, y: -1 } : prev);
          break;
        case 's':
        case 'arrowdown':
          e.preventDefault();
          setDirection(prev => prev.y !== -1 ? { x: 0, y: 1 } : prev);
          break;
        case 'a':
        case 'arrowleft':
          e.preventDefault();
          setDirection(prev => prev.x !== 1 ? { x: -1, y: 0 } : prev);
          break;
        case 'd':
        case 'arrowright':
          e.preventDefault();
          setDirection(prev => prev.x !== -1 ? { x: 1, y: 0 } : prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver]);

  return (
    <FullscreenGame gameName="Snake Game" onBack={onBack}>
      <div className="w-full h-full flex flex-col items-center justify-center bg-background">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <span className="text-lg">Score: <span className="font-bold text-primary">{score}</span></span>
            <span className="text-lg">High Score: <span className="font-bold text-primary">{highScore}</span></span>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2"
            >
              Reset
            </button>
          </div>
        </div>

        <div 
          className="bg-background border-2 border-border rounded-lg relative"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
        >
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 rounded-lg z-10">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Game Over!</h3>
                <p className="text-lg mb-4">Final Score: {score}</p>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}

          {/* Game grid */}
          <div className="relative w-full h-full">
            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={index}
                className="absolute bg-primary rounded-sm"
                style={{
                  left: segment.x * GRID_SIZE,
                  top: segment.y * GRID_SIZE,
                  width: GRID_SIZE - 1,
                  height: GRID_SIZE - 1,
                }}
              />
            ))}

            {/* Food */}
            <div
              className="absolute bg-red-500 rounded-full"
              style={{
                left: food.x * GRID_SIZE,
                top: food.y * GRID_SIZE,
                width: GRID_SIZE - 1,
                height: GRID_SIZE - 1,
              }}
            />
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground mt-4">
          <p>Use WASD or Arrow Keys to control the snake</p>
        </div>
      </div>
    </FullscreenGame>
  );
};

export default SnakeGame;