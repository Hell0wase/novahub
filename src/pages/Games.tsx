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
import FullscreenGame from '@/components/FullscreenGame';
import SnakeGame from '@/components/games/SnakeGame';
import TetrisGame from '@/components/games/TetrisGame';
import QuizGame from '@/components/games/QuizGame';
import MathQuizGame from '@/components/games/MathQuizGame';
import ScienceQuizGame from '@/components/games/ScienceQuizGame';
import SocialStudiesQuizGame from '@/components/games/SocialStudiesQuizGame';
import ReadingQuizGame from '@/components/games/ReadingQuizGame';
import GrannyGameHTML from '@/components/games/GrannyGameHTML';
import Granny2Game from '@/components/games/Granny2Game';
import OneVOneGame from '@/components/games/OneVOneGame';
import DuckLifeGame from '@/components/games/DuckLifeGame';
import DuckLife2Game from '@/components/games/DuckLife2Game';
import DuckLife3Game from '@/components/games/DuckLife3Game';
import DuckLife4Game from '@/components/games/DuckLife4Game';
import TombOfTheMaskGame from '@/components/games/TombOfTheMaskGame';
import AngryBirdsGame from '@/components/games/AngryBirdsGame';
import BobTheRobberGame from '@/components/games/BobTheRobberGame';
import BlockBlastGame from '@/components/games/BlockBlastGame';
import BitlifeGame from '@/components/games/BitlifeGame';
import BlackOpsGame from '@/components/games/BlackOpsGame';
import UnicycleHeroGame from '@/components/games/UnicycleHeroGame';
import AppleShooterGame from '@/components/games/AppleShooterGame';
import SlopeGame from '@/components/games/SlopeGame';
import RetroBowlGame from '@/components/games/RetroBowlGame';
import SnowRiderGame from '@/components/games/SnowRiderGame';
import PolytrackGame from '@/components/games/PolytrackGame';
import BasketballStarsGame from '@/components/games/BasketballStarsGame';
import DriveMadGame from '@/components/games/DriveMadGame';
import HTMLGameComponent from '@/components/games/HTMLGameComponent';
import MinecraftGame from '@/components/games/MinecraftGame';
import SlitherIOGame from '@/components/games/SlitherIOGame';
import CookieClickerGame from '@/components/games/CookieClickerGame';
import PaperIOGame from '@/components/games/PaperIOGame';
import DriftHuntersGame from '@/components/games/DriftHuntersGame';
import RagdollArchersGame from '@/components/games/RagdollArchersGame';
import RooftopSnipersGame from '@/components/games/RooftopSnipersGame';
import BasketballRandomGame from '@/components/games/BasketballRandomGame';
import AgeOfWarGame from '@/components/games/AgeOfWarGame';
import AgeOfWar2Game from '@/components/games/AgeOfWar2Game';
import SmallWorldCupGame from '@/components/games/SmallWorldCupGame';
import DogeMinerGame from '@/components/games/DogeMinerGame';
import FireboyWatergirlGame from '@/components/games/FireboyWatergirlGame';
import NuggetClickerGame from '@/components/games/NuggetClickerGame';
import StickmanDuelGame from '@/components/games/StickmanDuelGame';
import CarKingArenaGame from '@/components/games/CarKingArenaGame';
import SuperHotGame from '@/components/games/SuperHotGame';
import SubwaySurfersGame from '@/components/games/SubwaySurfersGame';
import PlantsVsZombiesGame from '@/components/games/PlantsVsZombiesGame';
import CrossyRoadsGame from '@/components/games/CrossyRoadsGame';
import HoleIOGame from '@/components/games/HoleIOGame';
import MotoX3MGame from '@/components/games/MotoX3MGame';
import RagdollIOGame from '@/components/games/RagdollIOGame';
import IdleMinerGame from '@/components/games/IdleMinerGame';
import Fifa07Game from '@/components/games/Fifa07Game';
import GetawayShootoutGame from '@/components/games/GetawayShootoutGame';
import GunspinGame from '@/components/games/GunspinGame';
import NbaJamGame from '@/components/games/NbaJamGame';
import StreetFighterGame from '@/components/games/StreetFighterGame';
import StreetFighterTurboGame from '@/components/games/StreetFighterTurboGame';
import GtaEmulatedGame from '@/components/games/GtaEmulatedGame';
import MiniCrosswordGame from '@/components/games/MiniCrosswordGame';
import SkibidiToiletGame from '@/components/games/SkibidiToiletGame';
import BasketballLegendsGame from '@/components/games/BasketballLegendsGame';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [visibleGames, setVisibleGames] = useState(12); // Start with 12 games
  const GAMES_PER_LOAD = 12; // Load 12 more games each time

  const games = [
    {
      id: 'granny2',
      title: 'Granny 2',
      description: 'Escape from Granny\'s house in this horror sequel',
      category: 'horror',
      difficulty: 'Hard',
      time: '20 min',
      players: 4521,
      icon: Brain,
      color: 'text-red-500',
      component: Granny2Game
    },
    {
      id: 'drift-hunters',
      title: 'Drift Hunters',
      description: 'High-speed drifting racing game',
      category: 'racing',
      difficulty: 'Medium',
      time: '15 min',
      players: 3241,
      icon: Target,
      color: 'text-blue-500',
      component: DriftHuntersGame
    },
    {
      id: 'paper-io',
      title: 'Paper.io',
      description: 'Capture territory in this multiplayer game',
      category: 'arcade',
      difficulty: 'Easy',
      time: '10 min',
      players: 2156,
      icon: Target,
      color: 'text-orange-500',
      component: PaperIOGame
    },
    {
      id: 'slither-io',
      title: 'Slither.io',
      description: 'Grow your snake and dominate the arena',
      category: 'arcade',
      difficulty: 'Medium',
      time: '12 min',
      players: 5432,
      icon: Target,
      color: 'text-green-500',
      component: SlitherIOGame
    },
    {
      id: 'duck-life',
      title: 'Duck Life',
      description: 'Train your duck in this adventure game',
      category: 'adventure',
      difficulty: 'Easy',
      time: '25 min',
      players: 1876,
      icon: Brain,
      color: 'text-yellow-500',
      component: DuckLifeGame
    },
    {
      id: 'cookie-clicker',
      title: 'Cookie Clicker',
      description: 'Click cookies to build your empire',
      category: 'idle',
      difficulty: 'Easy',
      time: '30 min',
      players: 3456,
      icon: Target,
      color: 'text-brown-500',
      component: CookieClickerGame
    },
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
      id: 'math-quiz',
      title: 'Math Quiz',
      description: '6th-8th grade math problems and equations',
      category: 'trivia',
      difficulty: 'Medium',
      time: '10 min',
      players: 2341,
      icon: Calculator,
      color: 'text-blue-500',
      component: MathQuizGame
    },
    {
      id: 'science-quiz',
      title: 'Science Quiz',
      description: 'Biology, chemistry, and physics for middle school',
      category: 'trivia',
      difficulty: 'Medium',
      time: '10 min',
      players: 1987,
      icon: Brain,
      color: 'text-green-500',
      component: ScienceQuizGame
    },
    {
      id: 'social-studies-quiz',
      title: 'Social Studies Quiz',
      description: 'History, geography, and civics knowledge',
      category: 'trivia',
      difficulty: 'Medium',
      time: '10 min',
      players: 1654,
      icon: Globe,
      color: 'text-orange-500',
      component: SocialStudiesQuizGame
    },
    {
      id: 'reading-quiz',
      title: 'Reading Quiz',
      description: 'Language arts and literature comprehension',
      category: 'trivia',
      difficulty: 'Medium',
      time: '10 min',
      players: 1432,
      icon: BookOpen,
      color: 'text-purple-500',
      component: ReadingQuizGame
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
      component: GrannyGameHTML
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
      component: OneVOneGame
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
      component: SlopeGame
    },
    {
      id: 'retro-bowl',
      title: 'Retro Bowl',
      description: 'American football management and gameplay',
      category: 'sports',
      difficulty: 'Medium',
      time: '20 min',
      players: 7891,
      icon: Target,
      color: 'text-orange-500',
      component: RetroBowlGame
    },
    {
      id: 'snow-rider',
      title: 'Snow Rider 3D',
      description: 'Thrilling sled ride down snowy mountains',
      category: 'arcade',
      difficulty: 'Easy',
      time: '10 min',
      players: 4567,
      icon: Zap,
      color: 'text-blue-500',
      component: SnowRiderGame
    },
    {
      id: 'polytrack',
      title: 'Polytrack',
      description: 'Low-poly racing with challenging tracks',
      category: 'racing',
      difficulty: 'Medium',
      time: '15 min',
      players: 3241,
      icon: Target,
      color: 'text-purple-500',
      component: PolytrackGame
    },
    {
      id: 'basketball-stars',
      title: 'Basketball Stars',
      description: 'Multiplayer basketball competition',
      category: 'sports',
      difficulty: 'Medium',
      time: '12 min',
      players: 6789,
      icon: Target,
      color: 'text-orange-500',
      component: BasketballStarsGame
    },
    {
      id: 'drive-mad',
      title: 'Drive Mad',
      description: 'Crazy car stunts and obstacle courses',
      category: 'arcade',
      difficulty: 'Hard',
      time: '18 min',
      players: 5123,
      icon: Zap,
      color: 'text-red-500',
      component: DriveMadGame
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
      component: (props: any) => <HTMLGameComponent {...props} title="Alien Invasion" gameId="alien-invasion" />
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
      component: (props: any) => <HTMLGameComponent {...props} title="Space Adventure" gameId="space-adventure" />
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
      component: (props: any) => <HTMLGameComponent {...props} title="Puzzle Master" gameId="puzzle-master" />
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
      component: (props: any) => <HTMLGameComponent {...props} title="Racing Championship" gameId="racing-championship" />
    },
    {
      id: 'duck-life-2',
      title: 'Duck Life 2',
      description: 'Train your duck to become world champion',
      category: 'adventure',
      difficulty: 'Easy',
      time: '25 min',
      players: 1654,
      icon: Brain,
      color: 'text-yellow-500',
      component: DuckLife2Game
    },
    {
      id: 'duck-life-3',
      title: 'Duck Life 3',
      description: 'Evolution edition with new training methods',
      category: 'adventure',
      difficulty: 'Medium',
      time: '30 min',
      players: 1432,
      icon: Brain,
      color: 'text-yellow-500',
      component: DuckLife3Game
    },
    {
      id: 'duck-life-4',
      title: 'Duck Life 4',
      description: 'Space edition with alien races',
      category: 'adventure',
      difficulty: 'Medium',
      time: '35 min',
      players: 1298,
      icon: Brain,
      color: 'text-yellow-500',
      component: DuckLife4Game
    },
    {
      id: 'tomb-of-the-mask',
      title: 'Tomb of the Mask',
      description: 'Navigate through ancient tombs with special masks',
      category: 'arcade',
      difficulty: 'Hard',
      time: '15 min',
      players: 2341,
      icon: Target,
      color: 'text-purple-500',
      component: TombOfTheMaskGame
    },
    {
      id: 'angry-birds',
      title: 'Angry Birds',
      description: 'Launch birds at structures to defeat the pigs',
      category: 'puzzle',
      difficulty: 'Easy',
      time: '20 min',
      players: 7654,
      icon: Target,
      color: 'text-red-500',
      component: AngryBirdsGame
    },
    {
      id: 'bob-the-robber',
      title: 'Bob the Robber',
      description: 'Help Bob sneak through buildings and steal treasures',
      category: 'adventure',
      difficulty: 'Medium',
      time: '18 min',
      players: 1987,
      icon: Brain,
      color: 'text-gray-500',
      component: BobTheRobberGame
    },
    {
      id: 'block-blast',
      title: 'Block Blast',
      description: 'Fill lines and clear the board in this puzzle game',
      category: 'puzzle',
      difficulty: 'Easy',
      time: '15 min',
      players: 3456,
      icon: Brain,
      color: 'text-blue-500',
      component: BlockBlastGame
    },
    {
      id: 'bitlife',
      title: 'BitLife',
      description: 'Live a virtual life and make choices that shape your destiny',
      category: 'adventure',
      difficulty: 'Easy',
      time: '40 min',
      players: 5432,
      icon: Brain,
      color: 'text-green-500',
      component: BitlifeGame
    },
    {
      id: 'black-ops',
      title: 'Black Ops',
      description: 'Call of Duty tactical shooting game',
      category: 'action',
      difficulty: 'Hard',
      time: '30 min',
      players: 2341,
      icon: Target,
      color: 'text-red-500',
      component: BlackOpsGame
    },
    {
      id: 'unicycle-hero',
      title: 'Unicycle Hero',
      description: 'Balance and perform stunts on your unicycle',
      category: 'arcade',
      difficulty: 'Medium',
      time: '12 min',
      players: 1876,
      icon: Target,
      color: 'text-orange-500',
      component: UnicycleHeroGame
    },
    {
      id: 'apple-shooter',
      title: 'Apple Shooter',
      description: 'Aim carefully and shoot the apple off your friend\'s head',
      category: 'action',
      difficulty: 'Hard',
      time: '10 min',
      players: 2109,
      icon: Target,
      color: 'text-red-500',
      component: AppleShooterGame
    },
    {
      id: 'ragdollarchers',
      title: 'Ragdoll Archers',
      description: 'Physics-based archery combat with ragdoll mechanics',
      category: 'action',
      difficulty: 'Medium',
      time: '12 min',
      players: 892,
      icon: Target,
      color: 'text-red-500',
      component: RagdollArchersGame
    },
    {
      id: 'rooftop-snipers',
      title: 'Rooftop Snipers',
      description: 'Two-player sniper duel on the rooftops',
      category: 'action',
      difficulty: 'Easy',
      time: '8 min',
      players: 3421,
      icon: Target,
      color: 'text-red-500',
      component: RooftopSnipersGame
    },
    {
      id: 'basketball-random',
      title: 'Basketball Random',
      description: 'Chaotic basketball with random physics',
      category: 'sports',
      difficulty: 'Medium',
      time: '10 min',
      players: 2341,
      icon: Target,
      color: 'text-orange-500',
      component: BasketballRandomGame
    },
    {
      id: 'age-of-war',
      title: 'Age of War',
      description: 'Command troops through different ages of warfare',
      category: 'strategy',
      difficulty: 'Medium',
      time: '25 min',
      players: 1876,
      icon: Brain,
      color: 'text-yellow-500',
      component: AgeOfWarGame
    },
    {
      id: 'age-of-war-2',
      title: 'Age of War 2',
      description: 'The sequel with improved graphics and new civilizations',
      category: 'strategy',
      difficulty: 'Medium',
      time: '30 min',
      players: 1543,
      icon: Brain,
      color: 'text-yellow-500',
      component: AgeOfWar2Game
    },
    {
      id: 'small-world-cup',
      title: 'Small World Cup',
      description: 'Football simulation with different countries',
      category: 'sports',
      difficulty: 'Easy',
      time: '15 min',
      players: 4321,
      icon: Target,
      color: 'text-green-500',
      component: SmallWorldCupGame
    },
    {
      id: 'doge-miner',
      title: 'Doge Miner',
      description: 'Mine dogecoins and build your cryptocurrency empire',
      category: 'idle',
      difficulty: 'Easy',
      time: '30 min',
      players: 2843,
      icon: Target,
      color: 'text-yellow-500',
      component: DogeMinerGame
    },
    {
      id: 'fireboy-watergirl',
      title: 'Fireboy & Watergirl',
      description: 'Cooperative puzzle platformer with elemental powers',
      category: 'puzzle',
      difficulty: 'Medium',
      time: '20 min',
      players: 6754,
      icon: Brain,
      color: 'text-red-500',
      component: FireboyWatergirlGame
    },
    {
      id: 'nugget-clicker',
      title: 'Nugget Clicker',
      description: 'Click nuggets to build your fast food empire',
      category: 'idle',
      difficulty: 'Easy',
      time: '25 min',
      players: 1932,
      icon: Target,
      color: 'text-orange-500',
      component: NuggetClickerGame
    },
    {
      id: 'stickman-duel',
      title: 'Stickman Duel',
      description: 'Epic stickman fighting battles',
      category: 'action',
      difficulty: 'Medium',
      time: '12 min',
      players: 4123,
      icon: Target,
      color: 'text-red-500',
      component: StickmanDuelGame
    },
    {
      id: 'car-king-arena',
      title: 'Car King Arena',
      description: 'Vehicular combat in destructible arenas',
      category: 'action',
      difficulty: 'Hard',
      time: '18 min',
      players: 3654,
      icon: Target,
      color: 'text-blue-500',
      component: CarKingArenaGame
    },
    {
      id: 'superhot',
      title: 'SuperHot',
      description: 'Time moves only when you move in this unique shooter',
      category: 'action',
      difficulty: 'Hard',
      time: '25 min',
      players: 5321,
      icon: Zap,
      color: 'text-red-500',
      component: SuperHotGame
    },
    {
      id: 'subway-surfers',
      title: 'Subway Surfers',
      description: 'Endless running game through subway tracks',
      category: 'arcade',
      difficulty: 'Easy',
      time: '15 min',
      players: 9876,
      icon: Zap,
      color: 'text-blue-500',
      component: SubwaySurfersGame
    },
    {
      id: 'plants-vs-zombies',
      title: 'Plants vs Zombies',
      description: 'Tower defense with plants against zombie invasion',
      category: 'strategy',
      difficulty: 'Medium',
      time: '35 min',
      players: 7432,
      icon: Brain,
      color: 'text-green-500',
      component: PlantsVsZombiesGame
    },
    {
      id: 'crossy-roads',
      title: 'Crossy Roads',
      description: 'Help the chicken cross busy roads and rivers',
      category: 'arcade',
      difficulty: 'Easy',
      time: '10 min',
      players: 4567,
      icon: Target,
      color: 'text-orange-500',
      component: CrossyRoadsGame
    },
    {
      id: 'hole-io',
      title: 'Hole.io',
      description: 'Control a black hole and swallow everything in your path',
      category: 'arcade',
      difficulty: 'Easy',
      time: '8 min',
      players: 6234,
      icon: Target,
      color: 'text-purple-500',
      component: HoleIOGame
    },
    {
      id: 'motox3m',
      title: 'MotoX3M',
      description: 'Extreme motorcycle racing with stunts and obstacles',
      category: 'racing',
      difficulty: 'Medium',
      time: '16 min',
      players: 4891,
      icon: Target,
      color: 'text-orange-500',
      component: MotoX3MGame
    },
    {
      id: 'ragdoll-io',
      title: 'Ragdoll.io',
      description: 'Physics-based ragdoll fighting arena',
      category: 'action',
      difficulty: 'Medium',
      time: '12 min',
      players: 3456,
      icon: Target,
      color: 'text-red-500',
      component: RagdollIOGame
    },
    {
      id: 'idle-miner',
      title: 'Idle Miner',
      description: 'Build and manage your mining empire',
      category: 'idle',
      difficulty: 'Easy',
      time: '45 min',
      players: 2134,
      icon: Target,
      color: 'text-yellow-500',
      component: IdleMinerGame
    },
    {
      id: 'fifa-07',
      title: 'FIFA 07',
      description: 'Classic football simulation game',
      category: 'sports',
      difficulty: 'Medium',
      time: '30 min',
      players: 5678,
      icon: Target,
      color: 'text-green-500',
      component: Fifa07Game
    },
    {
      id: 'getaway-shootout',
      title: 'Getaway Shootout',
      description: 'Chaotic multiplayer racing with weapons',
      category: 'action',
      difficulty: 'Medium',
      time: '14 min',
      players: 4321,
      icon: Target,
      color: 'text-red-500',
      component: GetawayShootoutGame
    },
    {
      id: 'gunspin',
      title: 'Gunspin',
      description: 'Physics-based gun spinning shooter',
      category: 'action',
      difficulty: 'Hard',
      time: '12 min',
      players: 2987,
      icon: Target,
      color: 'text-red-500',
      component: GunspinGame
    },
    {
      id: 'nba-jam',
      title: 'NBA Jam',
      description: 'Classic arcade basketball with over-the-top action',
      category: 'sports',
      difficulty: 'Medium',
      time: '20 min',
      players: 3456,
      icon: Target,
      color: 'text-orange-500',
      component: NbaJamGame
    },
    {
      id: 'street-fighter',
      title: 'Street Fighter II',
      description: 'Classic fighting game with iconic characters',
      category: 'action',
      difficulty: 'Hard',
      time: '15 min',
      players: 4567,
      icon: Target,
      color: 'text-red-500',
      component: StreetFighterGame
    },
    {
      id: 'street-fighter-turbo',
      title: 'Street Fighter II Turbo',
      description: 'Enhanced version with faster gameplay and new moves',
      category: 'action',
      difficulty: 'Hard',
      time: '18 min',
      players: 3892,
      icon: Target,
      color: 'text-red-500',
      component: StreetFighterTurboGame
    },
    {
      id: 'gta-emulated',
      title: 'Grand Theft Auto',
      description: 'Classic open-world crime game',
      category: 'action',
      difficulty: 'Hard',
      time: '40 min',
      players: 6789,
      icon: Target,
      color: 'text-gray-500',
      component: GtaEmulatedGame
    },
    {
      id: 'mini-crossword',
      title: 'Mini Crossword',
      description: 'Quick and fun crossword puzzles',
      category: 'puzzle',
      difficulty: 'Easy',
      time: '8 min',
      players: 2345,
      icon: Brain,
      color: 'text-blue-500',
      component: MiniCrosswordGame
    },
    {
      id: 'skibidi-toilet',
      title: 'Skibidi Toilet',
      description: 'Quirky action game with viral internet character',
      category: 'arcade',
      difficulty: 'Easy',
      time: '10 min',
      players: 8765,
      icon: Target,
      color: 'text-purple-500',
      component: SkibidiToiletGame
    },
    {
      id: 'basketball-legends',
      title: 'Basketball Legends',
      description: 'Play as legendary basketball players',
      category: 'sports',
      difficulty: 'Medium',
      time: '15 min',
      players: 5432,
      icon: Target,
      color: 'text-orange-500',
      component: BasketballLegendsGame
    },
    {
      id: 'minecraft',
      title: 'Minecraft',
      description: 'Build and explore in this creative sandbox world',
      category: 'adventure',
      difficulty: 'Easy',
      time: '60 min',
      players: 12345,
      icon: Brain,
      color: 'text-green-500',
      component: MinecraftGame
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
    { id: 'battle', label: 'Battle Royale' },
    { id: 'sports', label: 'Sports' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'idle', label: 'Idle' }
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
  
  // Show only a limited number of games for performance
  const displayedGames = filteredGames.slice(0, visibleGames);
  const hasMoreGames = filteredGames.length > visibleGames;

  const loadMoreGames = () => {
    setVisibleGames(prev => Math.min(prev + GAMES_PER_LOAD, filteredGames.length));
  };

  // Reset visible games when category changes
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setVisibleGames(12); // Reset to initial amount
  };

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
    // All games now have components, switch to game component
    console.log('Setting current game to:', game.id);
    setCurrentGame(game.id);
  };

  // Render specific game component in fullscreen
  if (currentGame) {
    console.log('Rendering game component for:', currentGame);
    const game = games.find(g => g.id === currentGame);
    console.log('Found game:', game);
    if (game && game.component) {
      const GameComponent = game.component;
      console.log('Rendering GameComponent:', GameComponent);
      return (
        <FullscreenGame gameName={game.title} onBack={() => setCurrentGame(null)}>
          <GameComponent onBack={() => setCurrentGame(null)} />
        </FullscreenGame>
      );
    } else {
      console.log('No component found for game:', currentGame);
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating-animation" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/15 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-primary/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center slide-in-up">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            🎮 Fun Zone
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto glass-card p-6 rounded-xl">
            Educational games to help you learn while having fun during your study breaks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-500 zoom-in">
              <CardHeader>
                <CardTitle className="text-lg gradient-text flex items-center">
                  <Target className="mr-2 h-5 w-5 neon-glow" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className={`w-full justify-start transition-all duration-300 ${
                      selectedCategory === category.id 
                        ? 'bg-gradient-primary text-primary-foreground neon-glow' 
                        : 'hover:bg-primary/10 hover:border-primary/30'
                    }`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-500 zoom-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gradient-text">
                  <Trophy className="mr-2 neon-glow" size={20} />
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
              {displayedGames.map((game) => {
                const Icon = game.icon;
                return (
                  <Card 
                    key={game.id} 
                    className="glass-card border-primary/20 hover:border-primary/50 transition-all duration-500 group cursor-pointer zoom-in hover:scale-105"
                    style={{ animationDelay: `${game.id.length * 0.05}s` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 neon-glow">
                          <Icon className="text-white" size={24} />
                        </div>
                        <Badge className={`${getDifficultyColor(game.difficulty)} border-primary/20`}>
                          {game.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                        {game.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
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
                        variant="default"
                        className="w-full bg-gradient-primary hover:opacity-90 group-hover:scale-105 transition-all duration-500 neon-glow"
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

            {/* Load More Button */}
            {hasMoreGames && (
              <div className="text-center mt-8">
                <Button 
                  onClick={loadMoreGames}
                  variant="outline"
                  className="px-8 py-3 text-lg glass-card border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  Load More Games ({filteredGames.length - visibleGames} remaining)
                </Button>
              </div>
            )}

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