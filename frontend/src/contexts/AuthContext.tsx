import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token validity
      api.get('/auth/verify')
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login for now since backend isn't connected
      if (email && password) {
        const mockUser = {
          id: '1',
          email: email,
          name: email.split('@')[0]
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        setUser(mockUser);
        return;
      }
      
      throw new Error('Please enter valid credentials');
    } catch (error: any) {
      throw new Error('Login failed - Backend not connected yet');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Mock registration for now since backend isn't connected
      if (name && email && password) {
        const mockUser = {
          id: '1',
          email: email,
          name: name
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        setUser(mockUser);
        return;
      }
      
      throw new Error('Please fill all fields');
    } catch (error: any) {
      throw new Error('Registration failed - Backend not connected yet');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}