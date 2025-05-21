import React, { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../features/user/userSlice";

interface AuthContextType {
  isAuth: boolean;
  email: string | null;
  token: string | null;
  id: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  email: null,
  token: null,
  id: null,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { email, token, id } = useSelector((state: any) => state.user);

  const logout = () => {
    dispatch(removeUser());
  };

  const contextValue: AuthContextType = {
    isAuth: !!email,
    email,
    token,
    id,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
