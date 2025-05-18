import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";

interface AuthContextType {
  isAuth: boolean;
  email: string | null;
  token: string | null;
  id: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  email: null,
  token: null,
  id: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { email, token, id } = useSelector((state: any) => state.user);

  const contextValue: AuthContextType = {
    isAuth: !!email,
    email,
    token,
    id,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
