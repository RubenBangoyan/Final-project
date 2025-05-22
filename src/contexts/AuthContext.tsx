import React, { createContext, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, setUser } from "../features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebse-config";
import { signOut } from "firebase/auth";
import { message } from "antd";

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
    });

    return () => unsubscribe();
  }, [dispatch]);

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
