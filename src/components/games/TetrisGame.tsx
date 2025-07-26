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
    <div className="w-full h-full bg-background p-6 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full h-full flex items-center justify-center">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full h-full max-h-[calc(100vh-8rem)]">
          {/* Game Board */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Tetris Classic</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative">
                  <div 
                    className="bg-background border-2 border-border rounded-lg relative"
                    style={{ width: 400, height: 700 }}
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

                    {/* Active Tetris Game Display */}
                    <div className="w-full h-full bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
                      {/* Falling pieces animation */}
                      <div className="absolute inset-0">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-8 h-8 bg-gradient-primary rounded opacity-80"
                            style={{
                              left: `${(i * 35) % 260}px`,
                              top: `${-40 + (i * 80)}px`,
                              animation: `tetrisFall ${3 + i}s linear infinite`,
                              animationDelay: `${i * 0.5}s`
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Game grid */}
                      <div className="grid grid-cols-10 gap-0 w-full h-full opacity-30">
                        {Array.from({ length: 200 }).map((_, i) => (
                          <div key={i} className="border border-border/10"></div>
                        ))}
                      </div>
                      
                      {/* Stacked blocks at bottom */}
                      <div className="absolute bottom-0 left-0 right-0">
                        <div className="grid grid-cols-10 gap-0">
                          {Array.from({ length: 30 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-6 ${
                                Math.random() > 0.7 
                                  ? 'bg-primary/60' 
                                  : Math.random() > 0.5 
                                    ? 'bg-nova-cyan/60' 
                                    : 'bg-nova-green/60'
                              } ${Math.random() > 0.3 ? 'opacity-80' : 'opacity-0'}`}
                            />
                          ))}
                        </div>
                      </div>
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