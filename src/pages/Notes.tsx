import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Search, 
  BookOpen, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Bot,
  Send,
  FileText,
  Star,
  Calendar,
  Tag
} from 'lucide-react';
import AIAssistant from '@/components/AIAssistant';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  starred: boolean;
}

interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Chemistry - Periodic Table',
      content: 'Elements are arranged by atomic number. Groups have similar properties...',
      tags: ['chemistry', 'science'],
      createdAt: '2024-01-15',
      starred: true
    },
    {
      id: '2', 
      title: 'History - World War II',
      content: 'Started in 1939, ended in 1945. Major powers involved were...',
      tags: ['history', 'world-war'],
      createdAt: '2024-01-14',
      starred: false
    },
    {
      id: '3',
      title: 'Math - Quadratic Equations',
      content: 'ax² + bx + c = 0. The quadratic formula is x = (-b ± √(b²-4ac))/2a',
      tags: ['math', 'algebra'],
      createdAt: '2024-01-13', 
      starred: true
    }
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hi! I\'m your AI study assistant. I can help you with your notes, explain concepts, create summaries, and answer questions about your studies!',
      isBot: true,
      timestamp: new Date().toISOString()
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setEditForm({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', ')
    });
    setIsEditing(true);
  };

  const handleSaveNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.map(note => 
        note.id === selectedNote.id 
          ? {
              ...note,
              title: editForm.title,
              content: editForm.content,
              tags: editForm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
            }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote(null);
      setIsEditing(false);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setIsEditing(false);
    }
  };

  const handleStarNote = (noteId: string) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, starred: !note.starred } : note
    ));
  };

  const handleAIMessage = async () => {
    if (!aiInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: aiInput,
      isBot: false,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setAiInput('');

    // Show typing indicator
    const typingMessage: ChatMessage = {
      id: 'typing',
      message: 'AI is thinking...',
      isBot: true,
      timestamp: new Date().toISOString()
    };
    setChatMessages(prev => [...prev, typingMessage]);

    try {
      // Enhanced AI logic for comprehensive study help
      let response = '';
      const input = aiInput.toLowerCase().trim();
      
      // Math operations and algebra
      if (input.includes('+') || input.includes('-') || input.includes('*') || input.includes('x') || input.includes('/') || input.includes('÷') || input.includes('divided by') || input.includes('=') || /\d/.test(input)) {
        try {
          // Handle algebraic expressions and basic math
          if ((input.includes('x') && input.includes('=')) || input.includes('algebra')) {
            response = "For algebraic equations, I can help explain the steps:\n\n• Linear equations: ax + b = c\n• Quadratic formula: x = (-b ± √(b²-4ac))/2a\n• Factor by grouping\n• Solve for the variable\n\nWhat specific algebraic problem would you like help with?";
          } else {
            // Handle multiplication with 'x' symbol and division with various symbols
            let cleanInput = input;
            
            // Replace 'x' with '*' for multiplication when surrounded by numbers or spaces
            cleanInput = cleanInput.replace(/(\d+)\s*x\s*(\d+)/g, '$1 * $2');
            cleanInput = cleanInput.replace(/(\d+)x(\d+)/g, '$1 * $2');
            
            // Replace division symbols and words
            cleanInput = cleanInput.replace(/(\d+)\s*÷\s*(\d+)/g, '$1 / $2');
            cleanInput = cleanInput.replace(/(\d+)÷(\d+)/g, '$1 / $2');
            cleanInput = cleanInput.replace(/(\d+)\s*divided\s*by\s*(\d+)/g, '$1 / $2');
            
            // Clean the input for safe evaluation
            cleanInput = cleanInput.replace(/[^0-9+\-*/().\s]/g, '').trim();
            
            if (cleanInput && /^[0-9+\-*/().\s]+$/.test(cleanInput)) {
              try {
                // Handle simple division
                if (cleanInput.includes('/') && !cleanInput.includes('*') && !cleanInput.includes('+') && !cleanInput.includes('-') && !cleanInput.includes('(')) {
                  const parts = cleanInput.split('/');
                  if (parts.length === 2) {
                    const numerator = parseFloat(parts[0].trim());
                    const denominator = parseFloat(parts[1].trim());
                    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                      const result = numerator / denominator;
                      // Show division symbol in response
                      let originalExpression = input;
                      originalExpression = originalExpression.replace(/(\d+)\s*÷\s*(\d+)/g, '$1 ÷ $2');
                      originalExpression = originalExpression.replace(/(\d+)\s*divided\s*by\s*(\d+)/g, '$1 ÷ $2');
                      originalExpression = originalExpression.replace(/(\d+)\s*\/\s*(\d+)/g, '$1 ÷ $2');
                      
                      // Show result with decimal places if needed
                      if (Number.isInteger(result)) {
                        response = `${originalExpression} = ${result}`;
                      } else {
                        response = `${originalExpression} = ${result.toFixed(4).replace(/\.?0+$/, '')}`;
                      }
                    } else if (denominator === 0) {
                      response = "Error: Cannot divide by zero!";
                    } else {
                      response = "Invalid division. Please check the format.";
                    }
                  } else {
                    response = "Please format division as 'number ÷ number' or 'number / number' (e.g., '12 ÷ 3')";
                  }
                } else {
                  // Handle complex expressions with division
                  const result = new Function('return ' + cleanInput)();
                  if (typeof result === 'number' && !isNaN(result)) {
                    // Show the original input format in the response
                    let originalExpression = input;
                    originalExpression = originalExpression.replace(/(\d+)\s*x\s*(\d+)/g, '$1 × $2');
                    originalExpression = originalExpression.replace(/(\d+)\s*÷\s*(\d+)/g, '$1 ÷ $2');
                    originalExpression = originalExpression.replace(/(\d+)\s*divided\s*by\s*(\d+)/g, '$1 ÷ $2');
                    originalExpression = originalExpression.replace(/(\d+)\s*\/\s*(\d+)/g, '$1 ÷ $2');
                    
                    // Show result with appropriate decimal places
                    if (Number.isInteger(result)) {
                      response = `${originalExpression} = ${result}`;
                    } else {
                      response = `${originalExpression} = ${result.toFixed(4).replace(/\.?0+$/, '')}`;
                    }
                  } else {
                    response = "I couldn't calculate that. Please check the format.";
                  }
                }
              } catch (error) {
                response = "I couldn't solve that math problem. Please check the format and try again.";
              }
            } else {
              response = "I can help with math operations like:\n• Addition: 5 + 3\n• Subtraction: 10 - 4\n• Multiplication: 6 * 7 or 6 x 7\n• Division: 20 / 4 or 20 ÷ 4 or 20 divided by 4\n• Fractions: 3/4\n• Complex: (15 + 5) ÷ 4\n\nTry one of these formats!";
            }
          }
        } catch (error) {
          response = "I couldn't solve that math problem. Please check the format and try again.";
        }
      }
      // Cooking and daily life questions
      else if (input.includes('cook') || input.includes('recipe') || input.includes('boiled eggs')) {
        if (input.includes('boiled eggs') || input.includes('boil eggs')) {
          response = "How to cook perfect boiled eggs:\n\n1. Place eggs in a pot and cover with cold water\n2. Bring water to a rolling boil\n3. For soft-boiled: 4-6 minutes\n4. For medium-boiled: 7-9 minutes\n5. For hard-boiled: 10-12 minutes\n6. Transfer to ice bath to stop cooking\n7. Peel when cool\n\nTip: Older eggs (1 week+) are easier to peel!";
        } else {
          response = "I can help with cooking tips! Try asking about:\n• How to boil eggs\n• Basic cooking techniques\n• Kitchen safety tips\n• Recipe conversions\n\nWhat would you like to cook today?";
        }
      }
      // History questions
      else if (input.includes('history') || input.includes('war') || input.includes('when did') || input.includes('who was')) {
        if (input.includes('world war') || input.includes('ww2') || input.includes('wwii')) {
          response = "World War II (1939-1945):\n\n• Started: September 1, 1939 (Germany invaded Poland)\n• Major Allied Powers: UK, US, Soviet Union, China\n• Major Axis Powers: Germany, Japan, Italy\n• Key events: Pearl Harbor (1941), D-Day (1944), Holocaust\n• Ended: August 15, 1945 (Japan surrendered)\n\nWhat specific aspect would you like to learn more about?";
        } else {
          response = "I can help with history topics! Ask me about:\n• World Wars\n• Ancient civilizations\n• Important historical figures\n• Key dates and events\n• Historical periods\n\nWhat historical topic interests you?";
        }
      }
      // Reading comprehension
      else if (input.includes('read') || input.includes('comprehension') || input.includes('analyze') || input.includes('text')) {
        response = "Reading comprehension strategies:\n\n1. **Preview**: Look at titles, headings, images\n2. **Active reading**: Take notes, ask questions\n3. **Main idea**: What's the central point?\n4. **Supporting details**: What evidence supports the main idea?\n5. **Context clues**: Use surrounding text to understand unfamiliar words\n6. **Summarize**: Restate in your own words\n\nWhat text would you like help analyzing?";
      }
      // Study techniques
      else if (input.includes('study') || input.includes('learn') || input.includes('help') || input.includes('tips')) {
        response = "Effective study techniques:\n\n• **Pomodoro Technique**: 25 min study, 5 min break\n• **Active recall**: Quiz yourself without looking\n• **Spaced repetition**: Review material at increasing intervals\n• **Mind mapping**: Create visual connections\n• **Teaching method**: Explain concepts to someone else\n• **Cornell notes**: Divide page into notes, cues, summary\n\nWhat subject are you studying?";
      }
      // Science explanations
      else if (input.includes('science') || input.includes('explain') || input.includes('what is') || input.includes('define')) {
        response = "I can explain scientific concepts! Try asking about:\n\n• **Physics**: Forces, energy, waves, electricity\n• **Chemistry**: Elements, reactions, acids/bases\n• **Biology**: Cells, genetics, ecosystems\n• **Earth Science**: Weather, geology, astronomy\n• **Math concepts**: Algebra, geometry, calculus\n\nWhat concept would you like me to explain?";
      }
      // Default helpful response
      else {
        response = "I'm your comprehensive AI study assistant! I can help with:\n\n📚 **Academic Subjects**\n• Math (basic to algebra/calculus)\n• Science (physics, chemistry, biology)\n• History (events, dates, analysis)\n• Reading comprehension strategies\n\n🍳 **Daily Life**\n• Cooking instructions\n• Practical tips and how-tos\n\n📖 **Study Skills**\n• Note-taking techniques\n• Study strategies\n• Time management\n\nWhat would you like help with today?";
      }

      // Remove typing indicator and add real response
      setTimeout(() => {
        setChatMessages(prev => {
          const withoutTyping = prev.filter(msg => msg.id !== 'typing');
          return [...withoutTyping, {
            id: Date.now().toString(),
            message: response,
            isBot: true,
            timestamp: new Date().toISOString()
          }];
        });
      }, 1000);

    } catch (error) {
      // Remove typing indicator and show error
      setTimeout(() => {
        setChatMessages(prev => {
          const withoutTyping = prev.filter(msg => msg.id !== 'typing');
          return [...withoutTyping, {
            id: Date.now().toString(),
            message: "Sorry, I encountered an error. Please try again.",
            isBot: true,
            timestamp: new Date().toISOString()
          }];
        });
      }, 1000);
    }

  };

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: 'Start typing your notes here...',
      tags: [],
      createdAt: new Date().toISOString().split('T')[0],
      starred: false
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setEditForm({
      title: newNote.title,
      content: newNote.content,
      tags: ''
    });
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Study Notes
          </h1>
          <p className="text-muted-foreground text-lg">
            Organize your study materials and get AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search & Actions */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Notes</CardTitle>
                  <Button size="sm" onClick={handleNewNote} variant="default">
                    <Plus size={16} className="mr-1" />
                    New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  variant={showAI ? "default" : "outline"} 
                  className="w-full"
                  onClick={() => setShowAI(!showAI)}
                >
                  <Bot size={16} className="mr-2" />
                  Helpful Resources
                </Button>
              </CardContent>
            </Card>

            {/* Notes List */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Your Notes ({filteredNotes.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedNote?.id === note.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50 hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedNote(note)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm truncate">{note.title}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStarNote(note.id);
                        }}
                      >
                        <Star 
                          size={12} 
                          className={note.starred ? 'text-yellow-500 fill-current' : 'text-muted-foreground'} 
                        />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {note.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {note.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{note.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{note.createdAt}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {!showAI ? (
              /* Note Editor */
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2" size={20} />
                      {selectedNote ? selectedNote.title : 'Select a note'}
                    </CardTitle>
                    {selectedNote && (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditNote(selectedNote)}
                        >
                          <Edit size={16} className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteNote(selectedNote.id)}
                        >
                          <Trash2 size={16} className="mr-1" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing && selectedNote ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Title</label>
                        <Input
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          placeholder="Note title..."
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Content</label>
                        <Textarea
                          value={editForm.content}
                          onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                          placeholder="Write your notes here..."
                          rows={15}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                        <Input
                          value={editForm.tags}
                          onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                          placeholder="math, science, history..."
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveNote} className="bg-gradient-primary hover:opacity-90">
                          <Save size={16} className="mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          <X size={16} className="mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : selectedNote ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {selectedNote.createdAt}
                        </div>
                        <div className="flex items-center">
                          <Tag size={14} className="mr-1" />
                          {selectedNote.tags.length} tags
                        </div>
                      </div>
                      <Separator />
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {selectedNote.content}
                      </div>
                      <Separator />
                      <div className="flex flex-wrap gap-2">
                        {selectedNote.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Select a note to view or create a new one</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* AI Assistant */
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="mr-2" size={20} />
                    Helpful Resources
                  </CardTitle>
                  <CardDescription>
                    Get help with your studies, ask questions, and create summaries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Chat Messages */}
                    <div className="h-96 overflow-y-auto space-y-4 p-4 bg-background/50 rounded-lg">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isBot
                                ? 'bg-muted text-foreground'
                                : 'bg-primary text-primary-foreground'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="flex space-x-2">
                      <Input
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        placeholder="Ask me about your studies..."
                        onKeyPress={(e) => e.key === 'Enter' && handleAIMessage()}
                      />
                      <Button onClick={handleAIMessage} className="bg-gradient-primary hover:opacity-90">
                        <Send size={16} />
                      </Button>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setAiInput("Summarize my chemistry notes")}
                      >
                        📝 Summarize
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setAiInput("Explain quadratic equations")}
                      >
                        🧮 Explain Math
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setAiInput("Create a study plan")}
                      >
                        📅 Study Plan
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setAiInput("Quiz me on history")}
                      >
                        🎯 Quiz Me
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;