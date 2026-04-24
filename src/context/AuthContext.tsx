import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import api, { API_BASE_URL } from "@/lib/api";

// Constants for localStorage keys
const AUTH_SESSION_KEY = "eventhub.session.v1";
const AUTH_TOKEN_KEY = "eventhub.token.v1";

// The standard API client in @/lib/api handles authorization automatically.
// We keep axios interceptors here only if you need them for other side effects,
// but the new 'api' instance is preferred.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_SESSION_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to restore session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    try {
      const res = await api.post("/auth/signup", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      if (res.data?.success) {
        // Account created, but don't log in yet. User must go to login page.
      } else {
        throw new Error(res.data?.message || "Signup failed");
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Internal server error");
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      if (res.data?.success) {
        const { token, user: userData } = res.data.data;
        setUser(userData);
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(userData));
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      } else {
        throw new Error(res.data?.message || "Invalid credentials");
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Invalid email or password");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_SESSION_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
