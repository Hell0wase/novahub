import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, User, Lock, Mail, Type, Palette } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

const UserSettings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user, login } = useAuth();
  const { themeColor, setThemeColor, themes } = useTheme();
  
  // Form states
  const [username, setUsername] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedFont, setSelectedFont] = useState('default');

  const fonts = [
    { value: 'default', name: 'Default (Inter)', class: 'font-sans' },
    { value: 'serif', name: 'Serif (Georgia)', class: 'font-serif' },
    { value: 'mono', name: 'Monospace (Courier)', class: 'font-mono' },
    { value: 'roboto', name: 'Roboto', class: 'font-roboto' },
    { value: 'opensans', name: 'Open Sans', class: 'font-opensans' },
    { value: 'playfair', name: 'Playfair Display', class: 'font-playfair' },
    { value: 'poppins', name: 'Poppins', class: 'font-poppins' }
  ];

  const handleSaveProfile = () => {
    if (user) {
      login(email, username, true);
      toast.success('Profile updated successfully!');
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }
    // In a real app, you would validate current password and update it
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast.success('Password changed successfully!');
  };

  const handleFontChange = (fontValue: string) => {
    setSelectedFont(fontValue);
    const selectedFontClass = fonts.find(f => f.value === fontValue)?.class || 'font-sans';
    
    // Apply font to the root element
    document.documentElement.className = selectedFontClass;
    
    toast.success('Font updated successfully!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8">
          <Settings size={16} className="mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings size={20} className="mr-2" />
            User Settings
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-1">
              <User size={14} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Lock size={14} />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-1">
              <Palette size={14} />
              Theme
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-1">
              <Type size={14} />
              Font
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={18} />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and account details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User size={14} />
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail size={14} />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <Button onClick={handleSaveProfile} className="w-full">
                  Save Profile Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock size={18} />
                  Change Password
                </CardTitle>
                <CardDescription>
                  Update your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                <Button onClick={handleChangePassword} className="w-full">
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette size={18} />
                  Theme Color
                </CardTitle>
                <CardDescription>
                  Choose your preferred color theme for the application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => setThemeColor(theme.value)}
                      className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                        themeColor === theme.value 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-border/80'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, hsl(${theme.primaryHsl}), hsl(189 94% 55%))`
                      }}
                    >
                      <div className="text-white font-medium text-sm">
                        {theme.name}
                      </div>
                      {themeColor === theme.value && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-background rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type size={18} />
                  Font Family
                </CardTitle>
                <CardDescription>
                  Choose your preferred font for the application interface.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="font-select">Font Family</Label>
                  <Select value={selectedFont} onValueChange={handleFontChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          <span className={font.class}>{font.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                  <p className={`text-lg ${fonts.find(f => f.value === selectedFont)?.class}`}>
                    The quick brown fox jumps over the lazy dog. 1234567890
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button onClick={() => setOpen(false)} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettings;