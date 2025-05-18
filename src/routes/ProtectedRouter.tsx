import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SIGN_IN_PATH } from "./paths";

export const ProtectedRouter = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={SIGN_IN_PATH} replace />;
};
