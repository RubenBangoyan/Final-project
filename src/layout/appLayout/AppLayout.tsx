import { useAuth } from "../../contexts/AuthContext";
import LoadingRouter from "../../routes/LoadingRouter";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import AnimatedRoutes from "../../routes/AnimatedRoutes.tsx";
import "./AppLayout.css";

const AppLayout = () => {
    const { authLoading } = useAuth();

    if (authLoading) return <LoadingRouter />;

    return (
        <>
            <Header />
            <main style={{ minHeight: "calc(100vh - 128px)", position: "relative", overflow: "hidden" }}>
                <AnimatedRoutes />
            </main>
            <Footer />
        </>
    );
};

export default AppLayout;
