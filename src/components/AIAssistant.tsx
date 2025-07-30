import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  Send, 
  User, 
  BookOpen, 
  Lightbulb,
  Calculator,
  MapPin,
  Heart,
  Clock,
  Sparkles,
  Copy,
  ThumbsUp,
  Code,
  Terminal
} from 'lucide-react';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: string;
  category?: string;
}

interface AIAssistantProps {
  onClose?: () => void;
}

const AIAssistant = ({ onClose }: AIAssistantProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: "Hi! I'm your helpful resource assistant! I can help you with:\n\n🍳 **Cooking & Recipes** - Step-by-step cooking instructions\n💻 **Programming & Code** - Debug, explain, and write code\n📚 **Study Help** - Homework, explanations, and learning\n💡 **Life Advice** - Decision making and problem solving\n🔢 **Math & Calculations** - From basic math to complex equations\n🌍 **General Knowledge** - Facts, trivia, and explanations\n🎯 **Goal Planning** - Task management and productivity\n\nWhat would you like help with today?",
      isBot: true,
      timestamp: new Date().toISOString(),
      category: 'welcome'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const MAX_CHARACTERS = 50000;

  const quickActions = [
    { icon: BookOpen, label: 'Recipe Help', query: 'How do I cook ' },
    { icon: Code, label: 'Code Help', query: 'Explain this code: ' },
    { icon: Calculator, label: 'Math Help', query: 'Calculate ' },
    { icon: BookOpen, label: 'Study Tips', query: 'Explain ' },
    { icon: Lightbulb, label: 'Life Advice', query: 'What should I do about ' },
    { icon: Heart, label: 'Health Tips', query: 'Is it healthy to ' }
  ];

  const getEnhancedResponse = async (userInput: string): Promise<{ message: string; category: string }> => {
    const input = userInput.toLowerCase().trim();
    
    // MVP and ChatGPT Concepts
    if (input.includes('mvp') || input.includes('minimum viable product') || input.includes('chatgpt') || input.includes('ai') || input.includes('artificial intelligence') || input.includes('llm') || input.includes('language model')) {
      if (input.includes('mvp') || input.includes('minimum viable product')) {
        return {
          message: "🚀 **MVP (Minimum Viable Product) Explained:**\n\n**What is an MVP?**\nThe simplest version of a product that delivers value to early adopters while requiring minimal resources to build.\n\n**🧠 ChatGPT as an MVP Example:**\n\n**Core Problem Solved:** People want fast, intelligent answers to questions, help with writing, coding, and more.\n\n**Early Adopters:** Developers, writers, students, customer support teams, and productivity-focused users.\n\n**Core Functionality:**\n• Takes natural language input\n• Returns relevant, helpful responses\n\n**Stripped-Down Features:**\n• No memory or history\n• No plugin tools or image generation\n• Simple Q&A capability\n\n**Delivery Platform:** A web interface or API (e.g. chat.openai.com)\n\n**Feedback Loop:** User thumbs up/down and usage metrics help refine responses\n\n**Monetization:** Freemium model - Basic chat is free, premium offers advanced features\n\n✅ **MVP Success:** Proves the concept that \"AI can understand you and help you in natural language.\"\n\nWant to learn more about MVP development or AI concepts?",
          category: 'education'
        };
      } else if (input.includes('chatgpt') || input.includes('ai') || input.includes('artificial intelligence')) {
        return {
          message: "🤖 **Understanding ChatGPT & AI:**\n\n**What is ChatGPT?**\nA conversational AI built on large language models (LLMs), capable of understanding and generating human-like text.\n\n**How it Works (Simplified):**\n1. **Training:** Learns from billions of text examples\n2. **Understanding:** Processes your input to find patterns\n3. **Generation:** Creates responses based on learned patterns\n4. **Context:** Maintains conversation flow\n\n**Key Capabilities:**\n• Natural language understanding\n• Code generation and debugging\n• Creative writing assistance\n• Educational explanations\n• Problem-solving guidance\n\n**Limitations to Remember:**\n• Knowledge cutoff dates\n• Can make mistakes or \"hallucinate\"\n• No real-time internet access (in basic versions)\n• No memory between separate conversations\n\n**Educational Value:**\n• Great for learning programming concepts\n• Helps explain complex topics simply\n• Provides study assistance and tutoring\n• Offers writing feedback and suggestions\n\nWant to know more about how AI can help with your specific studies or projects?",
          category: 'education'
        };
      } else if (input.includes('llm') || input.includes('language model')) {
        return {
          message: "🧠 **Large Language Models (LLMs) Explained:**\n\n**What is an LLM?**\nA type of AI trained on massive amounts of text to understand and generate human-like language.\n\n**How LLMs Learn:**\n1. **Pre-training:** Read billions of text examples from books, articles, websites\n2. **Pattern Recognition:** Learn grammar, facts, reasoning patterns\n3. **Fine-tuning:** Specialized training for specific tasks\n4. **Alignment:** Training to be helpful, harmless, and honest\n\n**Key Features:**\n• **Scale:** Billions of parameters (adjustable values)\n• **Versatility:** Can handle multiple types of tasks\n• **Emergence:** Complex behaviors arise from simple training\n• **Context:** Can maintain conversation threads\n\n**Real-World Applications:**\n• Educational tutoring and explanations\n• Code assistance and debugging\n• Writing and editing help\n• Research and information synthesis\n• Creative content generation\n\n**Study Applications:**\n• Explain difficult concepts in simple terms\n• Generate practice problems and quizzes\n• Help with essay structure and ideas\n• Code learning and debugging assistance\n\nWhat aspect of AI or language models interests you most?",
          category: 'education'
        };
      }
    }
    
    // Programming and Coding Help
    if (input.includes('code') || input.includes('programming') || input.includes('javascript') || input.includes('python') || input.includes('html') || input.includes('css') || input.includes('react') || input.includes('function') || input.includes('variable') || input.includes('array') || input.includes('loop') || input.includes('debug') || input.includes('error')) {
      if (input.includes('javascript') || input.includes('js')) {
        return {
          message: "💻 **JavaScript Help:**\n\n**Basic Concepts:**\n```javascript\n// Variables\nlet name = \"John\";\nconst age = 25;\nvar city = \"NYC\";\n\n// Functions\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\n// Arrays\nlet numbers = [1, 2, 3, 4, 5];\nnumbers.push(6); // Add to end\n\n// Objects\nlet person = {\n  name: \"Alice\",\n  age: 30,\n  greet: function() {\n    console.log(\"Hi!\");\n  }\n};\n```\n\n**Common Issues:**\n• Use `const` for values that don't change\n• Use `let` for variables that will change\n• Remember semicolons `;`\n• Check for typos in variable names\n\nWhat specific JavaScript concept do you need help with?",
          category: 'programming'
        };
      } else if (input.includes('python')) {
        return {
          message: "🐍 **Python Help:**\n\n**Basic Syntax:**\n```python\n# Variables\nname = \"Alice\"\nage = 25\n\n# Functions\ndef greet(name):\n    return f\"Hello, {name}!\"\n\n# Lists\nnumbers = [1, 2, 3, 4, 5]\nnumbers.append(6)  # Add to end\n\n# Dictionaries\nperson = {\n    \"name\": \"Bob\",\n    \"age\": 30\n}\n\n# Loops\nfor i in range(5):\n    print(i)\n\nfor item in numbers:\n    print(item)\n```\n\n**Key Points:**\n• Indentation matters in Python!\n• Use 4 spaces for indentation\n• No semicolons needed\n• Variables are dynamically typed\n\nWhat Python concept would you like me to explain?",
          category: 'programming'
        };
      } else if (input.includes('html')) {
        return {
          message: "🌐 **HTML Help:**\n\n**Basic Structure:**\n```html\n<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Welcome!</h1>\n    <p>This is a paragraph.</p>\n    \n    <!-- Links -->\n    <a href=\"https://example.com\">Click here</a>\n    \n    <!-- Images -->\n    <img src=\"image.jpg\" alt=\"Description\">\n    \n    <!-- Lists -->\n    <ul>\n        <li>Item 1</li>\n        <li>Item 2</li>\n    </ul>\n    \n    <!-- Divs for structure -->\n    <div class=\"container\">\n        <p>Content goes here</p>\n    </div>\n</body>\n</html>\n```\n\n**Important Tags:**\n• `<h1>` to `<h6>` for headings\n• `<p>` for paragraphs\n• `<div>` for containers\n• `<span>` for inline elements\n• Always close your tags!\n\nWhat HTML element do you need help with?",
          category: 'programming'
        };
      } else if (input.includes('css')) {
        return {
          message: "🎨 **CSS Help:**\n\n**Basic Styling:**\n```css\n/* Targeting elements */\nh1 {\n    color: blue;\n    font-size: 24px;\n}\n\n/* Classes */\n.container {\n    width: 100%;\n    max-width: 1200px;\n    margin: 0 auto;\n}\n\n/* IDs */\n#header {\n    background-color: #f0f0f0;\n    padding: 20px;\n}\n\n/* Flexbox */\n.flex-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n/* Responsive */\n@media (max-width: 768px) {\n    .container {\n        padding: 10px;\n    }\n}\n```\n\n**Key Concepts:**\n• Selectors: target HTML elements\n• Properties: what to change\n• Values: how to change it\n• Box model: margin, border, padding, content\n\nWhat CSS property do you need help with?",
          category: 'programming'
        };
      } else if (input.includes('react')) {
        return {
          message: "⚛️ **React Help:**\n\n**Basic Component:**\n```jsx\nimport React, { useState } from 'react';\n\nfunction MyComponent() {\n  const [count, setCount] = useState(0);\n  \n  const handleClick = () => {\n    setCount(count + 1);\n  };\n  \n  return (\n    <div>\n      <h1>Counter: {count}</h1>\n      <button onClick={handleClick}>\n        Click me\n      </button>\n    </div>\n  );\n}\n\nexport default MyComponent;\n```\n\n**Key Concepts:**\n• **Components**: Reusable pieces of UI\n• **State**: Data that can change\n• **Props**: Data passed to components\n• **Hooks**: Special functions (useState, useEffect)\n• **JSX**: HTML-like syntax in JavaScript\n\n**Common Mistakes:**\n• Forgetting to import React\n• Not using key props in lists\n• Directly mutating state\n\nWhat React concept needs clarification?",
          category: 'programming'
        };
      } else if (input.includes('debug') || input.includes('error')) {
        return {
          message: "🐛 **Debugging Help:**\n\n**Common Debugging Steps:**\n1. **Read the error message carefully**\n   • Look for line numbers\n   • Understand what it's telling you\n\n2. **Console/Print debugging**\n   ```javascript\n   console.log(\"Variable value:\", myVariable);\n   ```\n   ```python\n   print(f\"Variable value: {my_variable}\")\n   ```\n\n3. **Check common issues:**\n   • Typos in variable names\n   • Missing semicolons (JavaScript)\n   • Wrong indentation (Python)\n   • Unclosed brackets/parentheses\n   • Case sensitivity\n\n4. **Use browser dev tools:**\n   • F12 to open developer tools\n   • Check Console tab for errors\n   • Use Network tab for API issues\n\n**Debugging Mindset:**\n• Start with the first error\n• Change one thing at a time\n• Test frequently\n• Don't guess - investigate!\n\nWhat specific error are you encountering?",
          category: 'programming'
        };
      } else {
        return {
          message: "💻 **Programming Help Available!**\n\nI can help you with:\n\n**Languages:**\n• **JavaScript/TypeScript** - Web development, React, Node.js\n• **Python** - Basics, data structures, algorithms\n• **HTML/CSS** - Web structure and styling\n• **SQL** - Database queries\n\n**Topics:**\n• Code explanation and debugging\n• Best practices and conventions\n• Algorithm explanations\n• Project structure advice\n• Error troubleshooting\n\n**How to ask:**\n• \"Explain this JavaScript function\"\n• \"How do I create a loop in Python?\"\n• \"Fix this CSS layout issue\"\n• \"What does this error mean?\"\n\nShare your code or specific question and I'll help you out!",
          category: 'programming'
        };
      }
    }
    // Recipe and Cooking Help
    if (input.includes('recipe') || input.includes('cook') || input.includes('bake') || input.includes('food') || input.includes('ingredient')) {
      if (input.includes('pasta') || input.includes('spaghetti')) {
        return {
          message: "🍝 **Basic Pasta Recipe:**\n\n**Ingredients:**\n• 1 lb pasta\n• Salt for water\n• Your choice of sauce\n\n**Instructions:**\n1. Boil large pot of salted water\n2. Add pasta, stir occasionally\n3. Cook 8-12 minutes (check package)\n4. Taste test - should be al dente\n5. Drain and serve with sauce\n\n**Pro Tips:**\n• Salt water like the sea\n• Save pasta water for sauce\n• Don't rinse pasta after draining\n\nWant a specific sauce recipe?",
          category: 'cooking'
        };
      } else if (input.includes('chicken')) {
        return {
          message: "🐔 **Basic Chicken Cooking Guide:**\n\n**Baked Chicken (375°F):**\n• Season with salt, pepper, herbs\n• Bake 20-25 min (165°F internal temp)\n\n**Pan-Fried Chicken:**\n• Heat oil in pan over medium-high\n• Cook 6-7 min per side\n• Check internal temp reaches 165°F\n\n**Safety Tips:**\n• Always wash hands after handling\n• Use separate cutting boards\n• Cook to 165°F internal temperature\n\nWhat specific chicken dish are you making?",
          category: 'cooking'
        };
      } else if (input.includes('egg')) {
        return {
          message: "🥚 **Egg Cooking Guide:**\n\n**Scrambled:**\n• Low heat, constant stirring\n• Add butter/oil, whisk eggs\n• Cook slowly for creamy texture\n\n**Boiled:**\n• Soft: 4-6 minutes\n• Medium: 7-9 minutes\n• Hard: 10-12 minutes\n• Ice bath to stop cooking\n\n**Fried:**\n• Heat pan, add oil/butter\n• Crack egg into pan\n• Cook to desired doneness\n\nWhich style would you like detailed steps for?",
          category: 'cooking'
        };
      } else {
        return {
          message: "🍳 **I can help with cooking!** Tell me:\n\n• What ingredient you want to cook\n• What type of dish you're making\n• Your cooking skill level\n• Any dietary restrictions\n\n**Popular recipes I can help with:**\n• Pasta dishes\n• Chicken recipes\n• Egg preparations\n• Vegetarian meals\n• Baking basics\n• Quick meals\n\nWhat would you like to cook today?",
          category: 'cooking'
        };
      }
    }

    // Math and Calculations
    else if (input.includes('+') || input.includes('-') || input.includes('*') || input.includes('×') || input.includes('÷') || input.includes('/') || input.includes('calculate') || input.includes('math')) {
      try {
        // Enhanced math handling
        let cleanInput = input.replace(/calculate|math|equals|equal|is|\?/g, '').trim();
        
        // Handle word problems
        if (input.includes('percent') || input.includes('%')) {
          return {
            message: "📊 **Percentage Calculator:**\n\nTo calculate percentages:\n• **X% of Y:** (X ÷ 100) × Y\n• **X is what % of Y:** (X ÷ Y) × 100\n• **Tip calculation:** Bill × (Tip% ÷ 100)\n\n**Examples:**\n• 15% of 80 = (15 ÷ 100) × 80 = 12\n• 20% tip on $50 = $50 × 0.20 = $10\n\nGive me specific numbers and I'll calculate it!",
            category: 'math'
          };
        }

        // Basic math operations
        cleanInput = cleanInput.replace(/x/g, '*').replace(/÷/g, '/');
        if (/^[0-9+\-*/().\s]+$/.test(cleanInput)) {
          const result = new Function('return ' + cleanInput)();
          return {
            message: `🔢 **Calculation Result:**\n\n${cleanInput} = **${result}**\n\nNeed help with more complex math? I can explain:\n• Algebra equations\n• Geometry formulas\n• Percentage calculations\n• Word problems`,
            category: 'math'
          };
        }
      } catch (error) {
        return {
          message: "🔢 **Math Help Available!**\n\nI can help with:\n• Basic arithmetic (+, -, ×, ÷)\n• Percentage calculations\n• Algebra problems\n• Geometry formulas\n• Word problems\n• Unit conversions\n\nTry: \"Calculate 15% of 80\" or \"Solve 2x + 5 = 15\"",
          category: 'math'
        };
      }
    }

    // Study and Educational Help
    else if (input.includes('study') || input.includes('homework') || input.includes('explain') || input.includes('learn') || input.includes('school')) {
      return {
        message: "📚 **Study & Learning Support:**\n\n**Study Techniques:**\n• **Pomodoro:** 25 min focus, 5 min break\n• **Active recall:** Test yourself without notes\n• **Spaced repetition:** Review at intervals\n• **Mind maps:** Visual connections\n\n**Homework Help:**\n• Break big tasks into smaller steps\n• Start with easiest or hardest (your choice)\n• Use timers to stay focused\n• Take regular breaks\n\n**Subject-Specific Help:**\n• Math problems and explanations\n• Science concepts\n• History facts and dates\n• Reading comprehension\n\nWhat subject do you need help with?",
        category: 'education'
      };
    }

    // Life Advice and Decision Making
    else if (input.includes('advice') || input.includes('should i') || input.includes('what do i do') || input.includes('help me decide') || input.includes('problem')) {
      return {
        message: "💡 **Life Advice & Decision Making:**\n\n**Decision Framework:**\n1. **Clarify the situation** - What exactly is the problem?\n2. **List your options** - What can you realistically do?\n3. **Consider pros/cons** - What are the benefits/risks?\n4. **Think long-term** - How will this affect your future?\n5. **Trust your gut** - What feels right?\n\n**Common Life Areas:**\n• School/career choices\n• Relationship issues\n• Time management\n• Goal setting\n• Stress management\n\nTell me more about your specific situation and I'll give tailored advice!",
        category: 'advice'
      };
    }

    // Health and Wellness
    else if (input.includes('health') || input.includes('exercise') || input.includes('diet') || input.includes('sleep') || input.includes('stress')) {
      return {
        message: "💪 **Health & Wellness Tips:**\n\n**Basic Health Habits:**\n• **Sleep:** 7-9 hours per night\n• **Water:** 8 glasses daily\n• **Exercise:** 30 min most days\n• **Nutrition:** Balanced meals with variety\n\n**Stress Management:**\n• Deep breathing exercises\n• Regular physical activity\n• Adequate sleep schedule\n• Time for hobbies/relaxation\n\n**Quick Energy Boosters:**\n• 10-minute walk\n• Healthy snack (nuts, fruit)\n• 5 deep breaths\n• Stretching\n\n⚠️ **Note:** This is general advice. Consult healthcare professionals for medical concerns.\n\nWhat specific aspect of health are you interested in?",
        category: 'health'
      };
    }

    // Time Management and Productivity
    else if (input.includes('time') || input.includes('productive') || input.includes('organize') || input.includes('schedule') || input.includes('plan')) {
      return {
        message: "⏰ **Time Management & Productivity:**\n\n**Time Blocking:**\n• Schedule specific times for activities\n• Include breaks and buffer time\n• Protect high-focus time slots\n\n**Priority Matrix:**\n• **Urgent + Important:** Do first\n• **Important + Not Urgent:** Schedule\n• **Urgent + Not Important:** Delegate\n• **Neither:** Eliminate\n\n**Productivity Tips:**\n• Start with hardest task when energy is high\n• Use the 2-minute rule (do it now if <2 min)\n• Batch similar tasks together\n• Remove distractions during focus time\n\nWhat area of your life needs better organization?",
        category: 'productivity'
      };
    }

    // General Knowledge and Trivia
    else if (input.includes('what is') || input.includes('who is') || input.includes('when did') || input.includes('where is') || input.includes('how does')) {
      return {
        message: "🌍 **General Knowledge Help:**\n\nI can help explain:\n\n**Science & Nature:**\n• How things work in nature\n• Basic scientific principles\n• Weather and climate\n• Animals and ecosystems\n\n**History & Culture:**\n• Historical events and figures\n• Cultural practices\n• Geography and countries\n• Art and literature basics\n\n**Technology:**\n• How devices work\n• Internet and social media\n• Apps and software basics\n\n**Current Events:**\n• General world knowledge\n• Famous people and achievements\n\nBe more specific with your question and I'll give you a detailed explanation!",
        category: 'knowledge'
      };
    }

    // Fun and Entertainment
    else if (input.includes('game') || input.includes('fun') || input.includes('joke') || input.includes('entertainment') || input.includes('bored')) {
      return {
        message: "🎮 **Fun & Entertainment Ideas:**\n\n**Quick Games:**\n• 20 Questions (I think of something, you guess)\n• Word Association\n• Riddles and brain teasers\n• Trivia questions\n\n**Creative Activities:**\n• Write a short story together\n• Create a bucket list\n• Plan an imaginary trip\n• Design your dream room\n\n**Learning Fun:**\n• Fun facts about animals\n• Interesting historical stories\n• Cool science experiments\n• Language learning games\n\nWhat sounds fun to you right now?",
        category: 'entertainment'
      };
    }

    // Default comprehensive response
    else {
      return {
        message: "🤖 **I'm here to help with anything!**\n\nTry asking me about:\n\n💻 **Programming:** \"Explain JavaScript functions\" \"Debug my Python code\"\n🍳 **Cooking:** \"How do I make pasta?\" \"Cook chicken safely\"\n🔢 **Math:** \"Calculate 15% of 80\" \"Solve algebra problems\"\n📚 **Learning:** \"Study tips\" \"Explain photosynthesis\"\n💡 **Advice:** \"Help me decide\" \"What should I do about...\"\n💪 **Health:** \"Exercise tips\" \"Healthy eating habits\"\n⏰ **Productivity:** \"Time management\" \"How to organize\"\n🌍 **Knowledge:** \"What is...\" \"How does... work?\"\n🎮 **Fun:** \"I'm bored\" \"Tell me a fun fact\"\n\nJust tell me what's on your mind and I'll do my best to help!",
        category: 'general'
      };
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: input,
      isBot: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getEnhancedResponse(input);
      
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: response.message,
          isBot: true,
          timestamp: new Date().toISOString(),
          category: response.category
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: "Sorry, I encountered an error. Please try again!",
          isBot: true,
          timestamp: new Date().toISOString(),
          category: 'error'
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
  };

  const copyMessage = (message: string) => {
    navigator.clipboard.writeText(message);
    toast.success('Message copied to clipboard!');
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      programming: Code,
      cooking: BookOpen,
      math: Calculator,
      advice: Lightbulb,
      health: Heart,
      productivity: Clock,
      knowledge: Sparkles,
      entertainment: '🎮',
      welcome: Sparkles,
      general: Bot
    };
    const IconComponent = icons[category as keyof typeof icons] || Bot;
    return typeof IconComponent === 'string' ? IconComponent : <IconComponent size={16} />;
  };

  return (
    <Card className="h-[600px] flex flex-col bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Bot size={20} className="text-white" />
            </div>
            Helpful Resources
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-auto py-2 flex flex-col items-center gap-1"
              onClick={() => handleQuickAction(action.query)}
            >
              <action.icon size={14} />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.isBot && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot
                      ? 'bg-muted/50 border border-border/50'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {message.category && message.isBot && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/30">
                      {getCategoryIcon(message.category)}
                      <Badge variant="secondary" className="text-xs">
                        {message.category}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.message}
                  </div>
                  
                  {message.isBot && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/30">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => copyMessage(message.message)}
                      >
                        <Copy size={12} className="mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                      >
                        <ThumbsUp size={12} className="mr-1" />
                        Helpful
                      </Button>
                    </div>
                  )}
                </div>

                {!message.isBot && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-muted/50 border border-border/50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="text-sm text-muted-foreground ml-2">Nova is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Ask me anything...</span>
            <span className={`${input.length > MAX_CHARACTERS * 0.9 ? 'text-destructive' : ''}`}>
              {input.length}/{MAX_CHARACTERS}
            </span>
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARACTERS) {
                  setInput(e.target.value);
                }
              }}
              placeholder="Ask me anything..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isLoading || input.length > MAX_CHARACTERS}
              className="bg-[hsl(var(--primary))] text-white hover:opacity-90"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;