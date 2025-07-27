import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Settings as SettingsIcon, 
  User, 
  Mail, 
  Lock, 
  Type, 
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface UserSettings {
  username: string;
  email: string;
  font: string;
}

const Settings = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [settings, setSettings] = useState<UserSettings>({
    username: user?.name || '',
    email: user?.email || '',
    font: 'inter'
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const fontOptions = [
    { value: 'inter', label: 'Inter (Default)', family: 'Inter' },
    { value: 'playfair', label: 'Playfair Display', family: 'Playfair Display' },
    { value: 'roboto', label: 'Roboto', family: 'Roboto' },
    { value: 'opensans', label: 'Open Sans', family: 'Open Sans' },
    { value: 'poppins', label: 'Poppins', family: 'Poppins' },
    { value: 'montserrat', label: 'Montserrat', family: 'Montserrat' }
  ];

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(prev => ({ ...prev, ...parsed }));
      
      // Apply the saved font
      if (parsed.font) {
        applyFont(parsed.font);
      }
    }
  }, []);

  const applyFont = (fontValue: string) => {
    const fontOption = fontOptions.find(f => f.value === fontValue);
    if (fontOption) {
      document.documentElement.style.setProperty('--font-family', fontOption.family);
      document.body.style.fontFamily = `${fontOption.family}, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    }
  };

  const handleSettingsChange = (field: keyof UserSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Validate username and email
    if (!settings.username.trim()) {
      toast.error('Username cannot be empty');
      return;
    }

    if (!settings.email.trim() || !settings.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Save to localStorage (in a real app, this would be an API call)
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    // Apply font change
    applyFont(settings.font);
    
    toast.success('Profile settings saved successfully!');
  };

  const handleChangePassword = () => {
    if (!passwords.current) {
      toast.error('Current password is required');
      return;
    }

    if (passwords.new.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    // In a real app, this would validate current password and update via API
    setPasswords({ current: '', new: '', confirm: '' });
    toast.success('Password changed successfully!');
  };

  const handleFontPreview = (fontValue: string) => {
    applyFont(fontValue);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 flex items-center">
            <SettingsIcon className="mr-3" size={40} />
            Settings
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your account preferences and customize your experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" size={20} />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={settings.username}
                  onChange={(e) => handleSettingsChange('username', e.target.value)}
                  placeholder="Enter your username"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingsChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>

              <Button onClick={handleSaveProfile} className="w-full">
                <Save className="mr-2" size={16} />
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Password Settings */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2" size={20} />
                Change Password
              </CardTitle>
              <CardDescription>
                Update your account password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                    placeholder="Enter current password"
                    className="mt-1 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-1 h-7 w-7 px-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => handlePasswordChange('new', e.target.value)}
                  placeholder="Enter new password"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                    placeholder="Confirm new password"
                    className="mt-1 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-1 h-7 w-7 px-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button onClick={handleChangePassword} variant="outline" className="w-full">
                <Lock className="mr-2" size={16} />
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* Font Settings */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Type className="mr-2" size={20} />
                Font Preferences
              </CardTitle>
              <CardDescription>
                Choose your preferred font for the website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="font-select">Select Font</Label>
                  <Select
                    value={settings.font}
                    onValueChange={(value) => {
                      handleSettingsChange('font', value);
                      handleFontPreview(value);
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose a font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem 
                          key={font.value} 
                          value={font.value}
                          style={{ fontFamily: font.family }}
                        >
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Preview */}
                <div className="border rounded-lg p-4 bg-accent/20">
                  <Label className="text-sm font-medium">Preview</Label>
                  <div className="mt-2 space-y-2" style={{ fontFamily: fontOptions.find(f => f.value === settings.font)?.family }}>
                    <h3 className="text-lg font-semibold">The quick brown fox jumps over the lazy dog</h3>
                    <p className="text-sm text-muted-foreground">
                      This is how your text will appear throughout the NovaHub interface. 
                      Choose a font that feels comfortable for reading and studying.
                    </p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="font-light">Light 300</span>
                      <span className="font-normal">Regular 400</span>
                      <span className="font-medium">Medium 500</span>
                      <span className="font-semibold">Semibold 600</span>
                      <span className="font-bold">Bold 700</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleSaveProfile} className="flex-1">
                    <Save className="mr-2" size={16} />
                    Apply Font
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSettings(prev => ({ ...prev, font: 'inter' }));
                      applyFont('inter');
                    }}
                  >
                    Reset to Default
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Account Information */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your current account details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Account Status</Label>
                <p className="font-medium text-green-600">Active</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Member Since</Label>
                <p className="font-medium">January 2024</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Last Login</Label>
                <p className="font-medium">Today at 2:30 PM</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Notes Created</Label>
                <p className="font-medium">15 notes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;