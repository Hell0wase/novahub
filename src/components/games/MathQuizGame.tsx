import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle, Trophy, Calculator } from 'lucide-react';

interface MathQuizGameProps {
  onBack: () => void;
}

const MathQuizGame = ({ onBack }: MathQuizGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const questions = [
    {
      question: "What is 15% of 240?",
      options: ["36", "32", "40", "35"],
      correct: 0
    },
    {
      question: "If a triangle has angles of 60° and 80°, what is the third angle?",
      options: ["40°", "45°", "50°", "35°"],
      correct: 0
    },
    {
      question: "Solve for x: 3x + 12 = 27",
      options: ["x = 4", "x = 5", "x = 6", "x = 3"],
      correct: 1
    },
    {
      question: "What is the area of a rectangle with length 8 cm and width 5 cm?",
      options: ["40 cm²", "26 cm²", "13 cm²", "45 cm²"],
      correct: 0
    },
    {
      question: "Which fraction is equivalent to 0.75?",
      options: ["2/3", "3/4", "4/5", "7/10"],
      correct: 1
    },
    {
      question: "What is the greatest common factor (GCF) of 24 and 36?",
      options: ["6", "8", "12", "18"],
      correct: 2
    },
    {
      question: "If you roll two dice, what is the probability of getting a sum of 7?",
      options: ["1/6", "1/12", "5/36", "1/8"],
      correct: 0
    },
    {
      question: "What is 2³ × 3²?",
      options: ["72", "64", "54", "36"],
      correct: 0
    },
    {
      question: "The circumference of a circle with radius 4 cm is approximately:",
      options: ["12.6 cm", "25.1 cm", "50.3 cm", "16.8 cm"],
      correct: 1
    },
    {
      question: "What is the slope of a line passing through points (2, 3) and (6, 11)?",
      options: ["2", "3", "4", "1/2"],
      correct: 0
    }
  ];

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / 100) * 100;
    if (percentage >= 90) return "Math Genius! 🧮";
    if (percentage >= 80) return "Excellent work! 🏆";
    if (percentage >= 70) return "Great job! 👍";
    if (percentage >= 60) return "Good effort! 📊";
    return "Keep practicing! 💪";
  };

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Games
          </Button>
          <Calculator className="mr-3 text-primary" size={32} />
          <h1 className="text-3xl font-bold gradient-text">
            Math Quiz
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>6th-8th Grade Math Challenge</span>
              <div className="text-sm text-muted-foreground">
                Score: {score}/100
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!gameComplete ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <div className="w-32 bg-background rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(189 94% 55%))'
                      }}
                    ></div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-6">
                    {questions[currentQuestion].question}
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    {questions[currentQuestion].options.map((option, index) => {
                      let buttonClass = "w-full p-4 text-left transition-all duration-200";
                      
                      if (showResult) {
                        if (index === questions[currentQuestion].correct) {
                          buttonClass += " bg-green-500/20 border-green-500 text-green-300";
                        } else if (index === selectedAnswer) {
                          buttonClass += " bg-red-500/20 border-red-500 text-red-300";
                        } else {
                          buttonClass += " opacity-50";
                        }
                      } else {
                        buttonClass += " hover:bg-accent hover:border-primary";
                      }

                      return (
                        <Button
                          key={index}
                          variant="outline"
                          className={buttonClass}
                          onClick={() => handleAnswerClick(index)}
                          disabled={showResult}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{option}</span>
                            {showResult && (
                              <span>
                                {index === questions[currentQuestion].correct ? (
                                  <CheckCircle size={20} className="text-green-500" />
                                ) : index === selectedAnswer ? (
                                  <XCircle size={20} className="text-red-500" />
                                ) : null}
                              </span>
                            )}
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <Trophy className="mx-auto text-yellow-500" size={64} />
                <h3 className="text-2xl font-bold">Math Quiz Complete!</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-primary">{score}/100</p>
                  <p className="text-lg">{getScoreMessage()}</p>
                  <p className="text-muted-foreground">
                    You got {score/10} out of {questions.length} questions correct
                  </p>
                </div>
                <Button onClick={resetGame} className="bg-[hsl(var(--primary))] text-white hover:opacity-90">
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MathQuizGame;