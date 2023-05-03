import React, { useContext } from "react";
import { throwResponse } from "../../config/axios/axios.config";
import { AuthContext } from "../../provider/auth/Auth.Provider";
export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
