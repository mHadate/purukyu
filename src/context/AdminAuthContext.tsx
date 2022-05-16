import { createContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { apiAgent } from "../services/adminApi";
import Router from "next/router";

type AuthContextProps = {
  user: User | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({ user: undefined });

export const AdminAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem("credentical");
    (async (token) => {
      apiAgent.setHeaders({ Authorization: `Bearer ${token}` });
      const result = await apiAgent.get("/login/status", {});
      if (result?.status !== "ok") {
        localStorage.removeItem("credentical");
        Router.push("/admin");
      }
    })(token);
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
