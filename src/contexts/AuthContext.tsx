import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, setUser } from "../features/user/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebse-config";
import { message } from "antd";

interface AuthContextType {
  isAuth: boolean;
  email: string | null;
  token: string | null;
  id: string | null;
  logout: () => void;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  email: null,
  token: null,
  id: null,
  logout: () => {},
  authLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { email, token, id } = useSelector((state: any) => state.user);
  const [authLoading, setAuthLoading] = useState(true);

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      message.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      message.error("Logout failed");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        dispatch(
          setUser({
            email: user.email || "",
            token,
            id: user.uid,
          })
        );
      } else {
        dispatch(removeUser());
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const contextValue: AuthContextType = {
    isAuth: !!email,
    email,
    token,
    id,
    logout,
    authLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
