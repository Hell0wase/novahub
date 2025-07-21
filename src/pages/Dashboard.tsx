import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Users, 
  Gamepad2, 
  Bell, 
  Plus, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Star,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Notes Created', value: 24, icon: BookOpen, color: 'text-blue-500' },
    { label: 'Study Groups', value: 3, icon: Users, color: 'text-green-500' },
    { label: 'Games Played', value: 12, icon: Gamepad2, color: 'text-purple-500' },
    { label: 'Hours Studied', value: 47, icon: Clock, color: 'text-orange-500' }
  ];

  const recentNotes = [
    { title: 'React Hooks Overview', subject: 'Computer Science', updated: '2 hours ago', shared: true },
    { title: 'Calculus Integration', subject: 'Mathematics', updated: '1 day ago', shared: false },
    { title: 'World War II Timeline', subject: 'History', updated: '3 days ago', shared: true },
  ];

  const studyGroups = [
    { name: 'CS Study Group', members: 12, nextSession: 'Today 3 PM', subject: 'Computer Science' },
    { name: 'Math Warriors', members: 8, nextSession: 'Tomorrow 2 PM', subject: 'Mathematics' },
    { name: 'History Buffs', members: 15, nextSession: 'Friday 4 PM', subject: 'History' },
  ];

  const achievements = [
    { name: 'Note Taker', description: 'Created 20+ notes', progress: 100, icon: BookOpen },
    { name: 'Team Player', description: 'Join 3 study groups', progress: 100, icon: Users },
    { name: 'Game Master', description: 'Play 10+ games', progress: 80, icon: Gamepad2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/30 border-b border-border/50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Welcome back, Alex!
              </h1>
              <p className="text-muted-foreground mt-1">
                Ready to continue your learning journey?
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell size={16} className="mr-2" />
                Notifications
              </Button>
              <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                <Plus size={16} className="mr-2" />
                Create Note
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Notes */}
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2" size={20} />
                Recent Notes
              </CardTitle>
              <CardDescription>Your latest study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotes.map((note, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-medium">{note.title}</h3>
                      <p className="text-sm text-muted-foreground">{note.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{note.updated}</p>
                      {note.shared && <Badge variant="secondary" className="mt-1">Shared</Badge>}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Notes
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions & Achievements */}
          <div className="space-y-6">
            {/* Study Groups */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2" size={20} />
                  Study Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studyGroups.slice(0, 2).map((group, index) => (
                    <div key={index} className="p-3 rounded-lg bg-background/50">
                      <h4 className="font-medium text-sm">{group.name}</h4>
                      <p className="text-xs text-muted-foreground">{group.members} members</p>
                      <p className="text-xs text-primary">{group.nextSession}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Groups
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2" size={20} />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon size={16} className="text-primary" />
                            <span className="text-sm font-medium">{achievement.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Feed */}
        <Card className="mt-6 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" size={20} />
              Recent Activity
            </CardTitle>
            <CardDescription>What's happening in your learning community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-background/30">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Sarah shared new notes in <span className="font-medium">React Hooks</span></p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-background/30">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">New study session scheduled for <span className="font-medium">CS Study Group</span></p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-background/30">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">You completed <span className="font-medium">JavaScript Quiz</span> with 95% score!</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;