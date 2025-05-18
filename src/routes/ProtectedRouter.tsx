import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "./paths";

export const ProtectedRouter = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={ROUTES.SIGN_IN_PATH} replace />;
};
