import { useAuth } from "../../contexts/AuthContext";
import LoadingRouter from "../../routes/LoadingRouter";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./AppLayout.css";

const AppLayout = () => {
  const { authLoading } = useAuth();

  if (authLoading) return <LoadingRouter />;

  return (
    <>
      <Header />
      <main style={{ minHeight: "calc(100vh - 128px)" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
