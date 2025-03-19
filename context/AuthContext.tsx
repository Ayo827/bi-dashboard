"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";

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
  
    const storedUsers = Cookies.get("users");
    let users = storedUsers ? JSON.parse(storedUsers) : [];
  
    if (users.some((user: { email: string }) => user.email === email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email already registered. Please log in.",
      });
      return;
    }
  
    const newUser = { fullName, email, password: hashedPassword };
    users.push(newUser);
  
    Cookies.set("users", JSON.stringify(users), { expires: rememberMe ? 7 : undefined });
  
    setUser({ fullName, email });
    router.push("/dashboard");
  };
  
  const login = async (email: string, password: string, rememberMe: boolean) => {
    const storedUsers = Cookies.get("users");
    if (!storedUsers) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No users found. Please register.",
      });
      return;
    }
  
    const users = JSON.parse(storedUsers);
  
    const user = users.find((user: { email: string }) => user.email === email);
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User not found. Please check your register.",
      });
      return;
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid credentials",
      });
      return;
    }
  
    Cookies.set("user", JSON.stringify({ fullName: user.fullName, email: user.email }), { expires: rememberMe ? 7 : undefined });
  
    setUser({ fullName: user.fullName, email: user.email });
    router.push("/dashboard");
  };
  
 
  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    Cookies.remove("authToken");
    router.push("/");
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
