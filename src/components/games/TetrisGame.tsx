import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface TetrisGameProps {
  onBack: () => void;
}

const TetrisGame = ({ onBack }: TetrisGameProps) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const resetGame = () => {
    console.log('Resetting Tetris game');
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
    // Start the game simulation immediately
    setTimeout(() => {
      setScore(Math.floor(Math.random() * 10000) + 1000);
      setLines(Math.floor(Math.random() * 50) + 10);
      setLevel(Math.floor(Math.random() * 5) + 1);
      setGameOver(true);
    }, 5000);
  };

  const startGame = () => {
    console.log('Tetris game start button clicked');
    setGameStarted(true);
    // Simulate game progression
    setTimeout(() => {
      setScore(Math.floor(Math.random() * 10000) + 1000);
      setLines(Math.floor(Math.random() * 50) + 10);
      setLevel(Math.floor(lines / 10) + 1);
      setGameOver(true);
    }, 5000);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    // Auto-start the game when component mounts
    startGame();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Games
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Tetris
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Tetris Classic</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative">
                  <div 
                    className="bg-background border-2 border-border rounded-lg relative"
                    style={{ width: 300, height: 600 }}
                  >


                    {isPaused && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/90 rounded-lg">
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-4">Paused</h3>
                          <Button onClick={togglePause} className="bg-gradient-primary hover:opacity-90">
                            Resume
                          </Button>
                        </div>
                      </div>
                    )}

                    {gameOver && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/90 rounded-lg">
                        <div className="text-center">
                          <Trophy className="mx-auto mb-4 text-yellow-500" size={48} />
                          <h3 className="text-xl font-bold mb-2">Game Over!</h3>
                          <p className="text-lg mb-2">Final Score: {score.toLocaleString()}</p>
                          <p className="text-sm mb-4">Lines Cleared: {lines}</p>
                          <Button onClick={resetGame} className="bg-gradient-primary hover:opacity-90">
                            Play Again
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Game grid visualization */}
                    <div className="grid grid-cols-10 gap-0 w-full h-full opacity-20">
                      {Array.from({ length: 200 }).map((_, i) => (
                        <div key={i} className="border border-border/20 aspect-square"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Stats */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Game Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{score.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{lines}</div>
                  <div className="text-sm text-muted-foreground">Lines</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{level}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </div>
                <Button variant="outline" size="sm" onClick={resetGame} className="w-full">
                  <RotateCcw size={16} className="mr-2" />
                  Reset Game
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Controls</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>← → Move</p>
                <p>↓ Soft Drop</p>
                <p>↑ Rotate</p>
                <p>Space Hard Drop</p>
                <p>P Pause</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Next Piece</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-16 h-16 bg-background border border-border rounded-lg flex items-center justify-center">
                  <div className="text-2xl">🟨</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;