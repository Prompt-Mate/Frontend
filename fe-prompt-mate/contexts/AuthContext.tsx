"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  isAuthenticated,
  getUserInfo,
  clearAuthData,
  type UserInfo,
} from "@/lib/auth";

interface AuthContextType {
  user: UserInfo | null;
  isAuth: boolean;
  logout: () => void;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const refreshAuth = () => {
    // const auth = isAuthenticated();
    // const userInfo = getUserInfo();
    // setIsAuth(auth);
    // setUser(userInfo);
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    setIsAuth(false);
    router.push("/login");
  };

  useEffect(() => {
    refreshAuth();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, isAuth, logout, refreshAuth }}>
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


