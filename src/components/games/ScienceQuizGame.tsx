import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle, Trophy, Microscope } from 'lucide-react';

interface ScienceQuizGameProps {
  onBack: () => void;
}

const ScienceQuizGame = ({ onBack }: ScienceQuizGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const questions = [
    {
      question: "What process do plants use to make their own food?",
      options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
      correct: 1
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Earth", "Mercury", "Mars"],
      correct: 2
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      correct: 0
    },
    {
      question: "Which type of rock is formed by heat and pressure?",
      options: ["Igneous", "Sedimentary", "Metamorphic", "Volcanic"],
      correct: 2
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"],
      correct: 1
    },
    {
      question: "Which gas makes up most of Earth's atmosphere?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      correct: 2
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      correct: 2
    },
    {
      question: "Which organ in the human body produces insulin?",
      options: ["Liver", "Kidney", "Pancreas", "Heart"],
      correct: 2
    },
    {
      question: "What type of energy is stored in food?",
      options: ["Kinetic energy", "Chemical energy", "Electrical energy", "Nuclear energy"],
      correct: 1
    },
    {
      question: "Which phase of matter has particles that are closely packed but can slide past each other?",
      options: ["Solid", "Liquid", "Gas", "Plasma"],
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
    if (percentage >= 90) return "Future Scientist! 🧪";
    if (percentage >= 80) return "Science Star! 🌟";
    if (percentage >= 70) return "Great Discovery! 🔬";
    if (percentage >= 60) return "Good Observation! 👁️";
    return "Keep Experimenting! 🧬";
  };

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Games
          </Button>
          <Microscope className="mr-3 text-primary" size={32} />
          <h1 className="text-3xl font-bold gradient-text">
            Science Quiz
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>6th-8th Grade Science Challenge</span>
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
                <h3 className="text-2xl font-bold">Science Quiz Complete!</h3>
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

export default ScienceQuizGame;