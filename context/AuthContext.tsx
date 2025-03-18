import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const keepMeLoggedIn = localStorage.getItem("keepLoggedIn");

    if (storedUser && keepMeLoggedIn) {
      setUser(JSON.parse(storedUser));
      setKeepLoggedIn(JSON.parse(keepMeLoggedIn));
    }
  }, []);

  const login = (email: string, password: string, rememberMe: boolean) => {
    const mockUser: User = { email, name: "John Doe" };
    setUser(mockUser);
    setKeepLoggedIn(rememberMe);
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("keepLoggedIn", JSON.stringify(rememberMe));
    resetTimeout();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("keepLoggedIn");
    router.push("/login");
  };

  const resetTimeout = () => {
    if (!keepLoggedIn) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => logout(), 60000); // Auto logout after 1 min
    }
  };

  useEffect(() => {
    if (!keepLoggedIn) {
      document.addEventListener("mousemove", resetTimeout);
      document.addEventListener("keydown", resetTimeout);
      resetTimeout();
    }
    return () => {
      document.removeEventListener("mousemove", resetTimeout);
      document.removeEventListener("keydown", resetTimeout);
    };
  }, [keepLoggedIn]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
