import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthUser } from "@/types/auth";
import { authService } from "@/services/auth-service";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("mp-token");
    const storedUser = localStorage.getItem("mp-user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await authService.signIn({ email, password });
    setToken(response.access_token);
    setUser(response.user);
    localStorage.setItem("mp-token", response.access_token);
    localStorage.setItem("mp-user", JSON.stringify(response.user));
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("mp-token");
    localStorage.removeItem("mp-user");
  };

  const value = useMemo(() => ({ user, token, signIn, signOut }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de AuthProvider");
  }
  return context;
};
