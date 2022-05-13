import { createContext, useEffect, useState, useContext } from "react";
import { User } from "../types/user";
import { onAuthStateChanged } from "../services/firebase";
import { apiAgent } from "../services/adminApi";
import Router from "next/router";

type AuthContextProps = {
  user: User | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({ user: undefined });

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged((user) => setUser(user));
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export const AdminAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem("credentical");
    (async (token) => {
      apiAgent.setHeaders({ Authorization: `Bearer ${token}` });
      const result = await apiAgent.get("/login/status", {});
      if (result?.status !== "ok") {
        localStorage.removeItem("credentical");
        Router.push("/admin")
      }
    })(token);
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
