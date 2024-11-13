"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  name: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  email: string;
  avatar: string | null;
  address: string | null;
  date_of_birth: string | null;
  active: boolean;
  role: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (userId: string, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("user");
    if (loggedInStatus === "true" && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userId: string, token: string) => {
    try {
      const response = await fetch(`http://localhost:8080/users/details?id=${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData: User = await response.json();
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
