import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import authAPI from "../../service/api/auth";
type AuthProviderProps = {
  children: React.ReactNode;
};
type AuthContextProps = {};
export const AuthContext = React.createContext<any>({} as any);
export function AuthProvider({ children }: AuthProviderProps) {
  const { pathname } = useLocation(); //path ปัจจุบัน
  const isPublic = pathname === "/login";

  const token = getToken();

  if (!token && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

//getToken
export const getToken = () => {
  return localStorage.getItem("token");
};
