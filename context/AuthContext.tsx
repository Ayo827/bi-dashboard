"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";

interface User {
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signup: (fullName: string, email: string, password: string, rememberMe: boolean) => void;
  login: (email: string, password: string, rememberMe: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (fullName: string, email: string, password: string, rememberMe: boolean) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    // const userData = { fullName, email, password: hashedPassword };

    Cookies.set("user", JSON.stringify({ fullName, email }), { expires: rememberMe ? 7 : undefined });
    Cookies.set("authToken", hashedPassword, { expires: rememberMe ? 7 : undefined });

    setUser({ fullName, email });
    router.push("/dashboard");
  };

  const login = async (email: string, password: string, rememberMe: boolean) => {
    const storedUser = Cookies.get("user");
    const storedHashedPassword = Cookies.get("authToken");

    if (!storedUser || !storedHashedPassword) {
      alert("User not found. Please sign up first.");
      return;
    }

    const userData = JSON.parse(storedUser);
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!passwordMatch) {
      alert("Invalid credentials");
      return;
    }

    Cookies.set("user", JSON.stringify(userData), { expires: rememberMe ? 7 : undefined });
    setUser(userData);
    router.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    Cookies.remove("authToken");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
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
