import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('novahub_user');
    const rememberMe = localStorage.getItem('novahub_remember');
    if (savedUser && rememberMe === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, name: string, remember: boolean = false) => {
    const userData = { email, name };
    localStorage.setItem('novahub_user', JSON.stringify(userData));
    localStorage.setItem('novahub_remember', remember.toString());
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('novahub_user');
    localStorage.removeItem('novahub_remember');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout
  };
};