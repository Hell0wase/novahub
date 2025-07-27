import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle, Trophy, Globe } from 'lucide-react';

interface SocialStudiesQuizGameProps {
  onBack: () => void;
}

const SocialStudiesQuizGame = ({ onBack }: SocialStudiesQuizGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const questions = [
    {
      question: "Which document begins with 'We the People'?",
      options: ["Declaration of Independence", "Bill of Rights", "Constitution", "Articles of Confederation"],
      correct: 2
    },
    {
      question: "What is the longest river in the world?",
      options: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
      correct: 1
    },
    {
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "John Adams", "Benjamin Franklin", "George Washington"],
      correct: 3
    },
    {
      question: "Which continent is Egypt located on?",
      options: ["Asia", "Africa", "Europe", "South America"],
      correct: 1
    },
    {
      question: "What caused the American Civil War?",
      options: ["Taxation", "Slavery and states' rights", "Trade disputes", "Religious differences"],
      correct: 1
    },
    {
      question: "Which mountain range separates Europe from Asia?",
      options: ["Himalayas", "Alps", "Ural Mountains", "Rocky Mountains"],
      correct: 2
    },
    {
      question: "What year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correct: 1
    },
    {
      question: "Which ancient civilization built Machu Picchu?",
      options: ["Aztecs", "Mayans", "Incas", "Olmecs"],
      correct: 2
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      correct: 2
    },
    {
      question: "Which explorer is credited with 'discovering' America in 1492?",
      options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Marco Polo"],
      correct: 1
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
    if (percentage >= 90) return "History Master! 📚";
    if (percentage >= 80) return "Geography Genius! 🗺️";
    if (percentage >= 70) return "Social Studies Star! ⭐";
    if (percentage >= 60) return "Good Citizen! 🏛️";
    return "Keep Learning! 🌍";
  };

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Games
          </Button>
          <Globe className="mr-3 text-primary" size={32} />
          <h1 className="text-3xl font-bold gradient-text">
            Social Studies Quiz
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>6th-8th Grade Social Studies Challenge</span>
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
                <h3 className="text-2xl font-bold">Social Studies Quiz Complete!</h3>
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

export default SocialStudiesQuizGame;