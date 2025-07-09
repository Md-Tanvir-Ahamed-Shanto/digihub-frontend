
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'developer';
  isAdmin?: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check - in a real app this would check authentication state
    const checkAuth = () => {
      // For demo purposes, assume admin is logged in
      const adminUser: User = {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        isAdmin: true
      };
      setUser(adminUser);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (email: string, password: string) => {
    // Mock login - in a real app this would call an API
    const user: User = {
      id: '1',
      email,
      name: 'Admin User',
      role: 'admin',
      isAdmin: true
    };
    setUser(user);
    return Promise.resolve(user);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.isAdmin === true
  };
};
