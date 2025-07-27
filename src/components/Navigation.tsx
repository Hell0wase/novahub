import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, Users, Gamepad2, LogOut, User, Globe, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ThemeSettings from '@/components/ThemeSettings';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openAboutBlank = () => {
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>Fullscreen Embed</title>
        <style>
          html, body {
            height: 100%; /* Make sure the html and body take full height */
            margin: 0;     /* Remove default body margins */
            overflow: hidden; /* Prevent scrollbars if the embedded content is larger */
          }
          iframe {
            display: block; /* Prevent extra space below the iframe */
            width: 100%;
            height: 100%;
            border: none;   /* Remove the default border */
          }
        </style>
        </head>
        <body>
          <iframe src="${window.location.origin}/"></iframe>
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const navItems = [
    { href: '/notes', label: 'Notes', icon: BookOpen },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/games', label: 'Fun Zone', icon: Gamepad2 },
    { href: '/proxy', label: 'Application', icon: Globe },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      {/* About:Blank Button - Top Left Corner */}
      <Button
        variant="ghost"
        size="sm"
        onClick={openAboutBlank}
        className="absolute top-2 left-2 z-10 p-2 text-muted-foreground hover:text-foreground"
        title="Open in about:blank"
      >
        <ExternalLink size={16} />
      </Button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              NovaHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <ThemeSettings />
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <User size={16} />
                  <span>{user?.name}</span>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" className="bg-gradient-primary hover:opacity-90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-4 space-y-2">
              <div className="px-3">
                <ThemeSettings />
              </div>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 px-3 py-2 text-sm">
                    <User size={16} />
                    <span>{user?.name}</span>
                  </div>
                  <Button variant="ghost" className="w-full" onClick={() => { handleLogout(); setIsOpen(false); }}>
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button variant="default" className="w-full bg-gradient-primary hover:opacity-90">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;