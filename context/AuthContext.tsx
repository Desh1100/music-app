import React, { createContext, useState, useContext, ReactNode } from "react";
import { router } from "expo-router";

// Types
type User = { username: string } | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Login function with simpler implementation
  const login = async (username: string, password: string) => {
    if (!username || !password) return;

    setIsLoading(true);

    // Simple delay to simulate API call
    setTimeout(() => {
      setUser({ username });
      setIsLoading(false);
      router.replace("/(app)");
    }, 1000);
  };

  // Simplified logout
  const logout = () => {
    setUser(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
