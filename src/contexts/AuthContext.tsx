
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/booking';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  getCurrentUser: () => User | null;
  addBookingToUser: (userId: string, booking: any) => void;
  getUserBookings: (userId: string) => any[];
}

const defaultAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage key for saving user data
const USER_STORAGE_KEY = 'nurse_connect_users';
const CURRENT_USER_KEY = 'nurse_connect_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
  
  // Load saved authentication state on initial load
  useEffect(() => {
    const storedUserJson = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUserJson) {
      try {
        const storedUser = JSON.parse(storedUserJson);
        setAuthState({
          user: storedUser,
          isAuthenticated: true,
        });
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    }
  }, []);

  // Get all users from local storage
  const getUsers = (): Record<string, User> => {
    const usersJson = localStorage.getItem(USER_STORAGE_KEY);
    if (usersJson) {
      try {
        return JSON.parse(usersJson);
      } catch (e) {
        console.error('Failed to parse users:', e);
      }
    }
    return {};
  };

  // Save users to local storage
  const saveUsers = (users: Record<string, User>) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  };

  // Login a user
  const login = (email: string, password: string): boolean => {
    // In a real app, we would validate credentials against a backend
    // Here we're just checking if the user exists in local storage
    const users = getUsers();
    
    // Find user by email
    const foundUser = Object.values(users).find(user => user.email === email);
    
    if (foundUser) {
      // In a real app, we would compare hashed passwords
      // For this demo, we'll just assume the password is correct
      setAuthState({
        user: foundUser,
        isAuthenticated: true,
      });
      
      // Save current user to local storage
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
      
      toast({
        title: "Logged In",
        description: `Welcome back, ${foundUser.name}!`,
      });
      
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    
    return false;
  };

  // Register a new user
  const register = (name: string, email: string, password: string): boolean => {
    const users = getUsers();
    
    // Check if user with this email already exists
    if (Object.values(users).some(user => user.email === email)) {
      toast({
        title: "Registration Failed",
        description: "A user with this email already exists",
        variant: "destructive",
      });
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: `user-${Math.random().toString(36).substring(2, 9)}`,
      name,
      email,
      bookings: [],
    };
    
    // Add user to storage
    users[newUser.id] = newUser;
    saveUsers(users);
    
    // Log in the new user
    setAuthState({
      user: newUser,
      isAuthenticated: true,
    });
    
    // Save current user to local storage
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    
    toast({
      title: "Registration Successful",
      description: `Welcome, ${name}!`,
    });
    
    return true;
  };

  // Logout the current user
  const logout = () => {
    setAuthState(defaultAuthState);
    localStorage.removeItem(CURRENT_USER_KEY);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  // Get the current logged-in user
  const getCurrentUser = (): User | null => {
    return authState.user;
  };

  // Add a booking to a user's bookings
  const addBookingToUser = (userId: string, booking: any) => {
    const users = getUsers();
    const user = users[userId];
    
    if (user) {
      user.bookings.push(booking);
      users[userId] = user;
      saveUsers(users);
      
      // If this is the current user, update the auth state
      if (authState.user && authState.user.id === userId) {
        const updatedUser = { ...authState.user, bookings: [...authState.user.bookings, booking] };
        setAuthState({
          ...authState,
          user: updatedUser,
        });
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
      }
    }
  };

  // Get all bookings for a user
  const getUserBookings = (userId: string): any[] => {
    const users = getUsers();
    const user = users[userId];
    return user ? user.bookings : [];
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        register,
        logout,
        getCurrentUser,
        addBookingToUser,
        getUserBookings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
