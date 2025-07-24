import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { 
  Play, 
  Trophy, 
  Target, 
  Zap, 
  Brain,
  Calculator,
  BookOpen,
  Globe,
  Star,
  Clock,
  ArrowLeft
} from 'lucide-react';
import SnakeGame from '@/components/games/SnakeGame';
import TetrisGame from '@/components/games/TetrisGame';
import QuizGame from '@/components/games/QuizGame';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const games = [
    {
      id: 'snake',
      title: 'Snake Classic',
      description: 'Guide the snake to eat food and grow longer without hitting walls',
      category: 'arcade',
      difficulty: 'Easy',
      time: '5 min',
      players: 1247,
      icon: Target,
      color: 'text-green-500',
      component: SnakeGame
    },
    {
      id: 'tetris',
      title: 'Tetris',
      description: 'Drop and arrange falling blocks to clear lines',
      category: 'puzzle',
      difficulty: 'Medium',
      time: '10 min',
      players: 892,
      icon: Brain,
      color: 'text-blue-500',
      component: TetrisGame
    },
    {
      id: 'quiz',
      title: 'Quick Quiz',
      description: 'Test your knowledge with rapid-fire questions',
      category: 'trivia',
      difficulty: 'Easy',
      time: '3 min',
      players: 1543,
      icon: BookOpen,
      color: 'text-purple-500',
      component: QuizGame
    },
    {
      id: 'granny',
      title: 'Granny Horror',
      description: 'Escape from Granny\'s house in this thrilling horror game',
      category: 'horror',
      difficulty: 'Hard',
      time: '20 min',
      players: 3456,
      icon: Brain,
      color: 'text-red-500',
      external: true,
      url: 'https://granny.online/'
    },
    {
      id: '1v1-lol',
      title: '1v1.LOL',
      description: 'Online multiplayer battle royale and building game',
      category: 'battle',
      difficulty: 'Medium',
      time: '15 min',
      players: 8921,
      icon: Target,
      color: 'text-blue-500',
      external: true,
      url: 'https://1v1.lol/'
    },
    {
      id: 'slope',
      title: 'Slope',
      description: 'Control a ball rolling down a steep slope',
      category: 'arcade',
      difficulty: 'Easy',
      time: '8 min',
      players: 5432,
      icon: Zap,
      color: 'text-green-500',
      external: true,
      url: 'https://slope-game.github.io/slope/'
    },
    {
      id: 'alien-invasion',
      title: 'Alien Invasion',
      description: 'Defend Earth from alien invaders in this action-packed shooter',
      category: 'action',
      difficulty: 'Medium',
      time: '10 min',
      players: 1234,
      icon: Zap,
      color: 'text-red-500',
      external: true,
      url: '/games/UGS_Files.zip'
    },
    {
      id: 'space-adventure',
      title: 'Space Adventure',
      description: 'Explore the cosmos in this thrilling space adventure',
      category: 'adventure',
      difficulty: 'Hard',
      time: '15 min',
      players: 892,
      icon: Globe,
      color: 'text-blue-500',
      external: true,
      url: '/games/UGS_Files.zip'
    },
    {
      id: 'puzzle-master',
      title: 'Puzzle Master',
      description: 'Challenge your mind with intricate puzzles',
      category: 'puzzle',
      difficulty: 'Easy',
      time: '5 min',
      players: 567,
      icon: Brain,
      color: 'text-purple-500',
      external: true,
      url: '/games/UGS_Files.zip'
    },
    {
      id: 'racing-championship',
      title: 'Racing Championship',
      description: 'High-speed racing action with realistic physics',
      category: 'racing',
      difficulty: 'Medium',
      time: '12 min',
      players: 2103,
      icon: Target,
      color: 'text-orange-500',
      external: true,
      url: '/games/UGS_Files.zip'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Games' },
    { id: 'arcade', label: 'Arcade' },
    { id: 'puzzle', label: 'Puzzle' },
    { id: 'trivia', label: 'Trivia' },
    { id: 'action', label: 'Action' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'racing', label: 'Racing' },
    { id: 'horror', label: 'Horror' },
    { id: 'battle', label: 'Battle Royale' }
  ];

  const achievements = [
    { name: 'First Victory', description: 'Win your first game', icon: Trophy, earned: true },
    { name: 'Speed Demon', description: 'Complete 10 quick games', icon: Zap, earned: true },
    { name: 'Scholar', description: 'Play 25 educational games', icon: BookOpen, earned: false },
    { name: 'Perfectionist', description: 'Get 100% on any quiz', icon: Star, earned: false }
  ];

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'Hard': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const handlePlayGame = (game: any) => {
    console.log('Playing game:', game.id, game);
    if (game.external) {
      if (game.url.includes('UGS_Files.zip')) {
        // Show message that HTML5 games are being prepared
        toast.info("HTML5 games are being prepared! The games from your ZIP file need to be extracted and set up. This will be available soon!");
      } else {
        // Open external games like Granny, 1v1.LOL, Slope in new tab
        window.open(game.url, '_blank');
      }
    } else {
      // For built-in games, switch to game component
      console.log('Setting current game to:', game.id);
      setCurrentGame(game.id);
    }
  };

  // Render specific game component
  if (currentGame) {
    console.log('Rendering game component for:', currentGame);
    const game = games.find(g => g.id === currentGame);
    console.log('Found game:', game);
    if (game && game.component) {
      const GameComponent = game.component;
      console.log('Rendering GameComponent:', GameComponent);
      return <GameComponent onBack={() => setCurrentGame(null)} />;
    } else {
      console.log('No component found for game:', currentGame);
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Fun Zone
          </h1>
          <p className="text-muted-foreground text-lg">
            Educational games to help you learn while having fun during your study breaks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2" size={20} />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        achievement.earned ? 'bg-primary/20' : 'bg-muted/30'
                      }`}
                    >
                      <Icon 
                        size={16} 
                        className={achievement.earned ? 'text-primary' : 'text-muted-foreground'} 
                      />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {achievement.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <Star size={12} className="text-yellow-500 fill-current" />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Games Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGames.map((game) => {
                const Icon = game.icon;
                return (
                  <Card 
                    key={game.id} 
                    className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center`}>
                          <Icon className="text-white" size={20} />
                        </div>
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {game.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {game.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {game.time}
                        </div>
                        <div className="flex items-center">
                          <Play size={14} className="mr-1" />
                          {game.players} playing
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-gradient-primary hover:opacity-90"
                        onClick={() => handlePlayGame(game)}
                      >
                        <Play size={16} className="mr-2" />
                        Play Now
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No games found in this category.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">127</div>
              <div className="text-sm text-muted-foreground">Games Played</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">89%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">42</div>
              <div className="text-sm text-muted-foreground">Hours Played</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">#156</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Games;