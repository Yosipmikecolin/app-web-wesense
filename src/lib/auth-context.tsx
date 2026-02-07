"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRecord, mockUsers } from "./mock-user";

interface AuthContextType {
  user: UserRecord | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing saved user", e);
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 800));

    const foundUser = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    // Para simplificar, cualquier password funciona si el email coincide con un mock user
    // o si es admin@sistema.com (que simularemos como Carlos Mendoza)
    let authenticatedUser = foundUser;

    if (!authenticatedUser && email === "admin@sistema.com") {
      authenticatedUser = mockUsers[0]; // Carlos Alberto Mendoza
    }

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem("auth_user", JSON.stringify(authenticatedUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
