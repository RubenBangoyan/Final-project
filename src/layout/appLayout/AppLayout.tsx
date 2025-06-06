import ScrollToTop from "../../components/common/ScrollToTop";
import AnimatedRoutes from "../../routes/AnimatedRoutes.tsx";
import LoadingRouter from "../../routes/LoadingRouter";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./AppLayout.css";

const AppLayout = () => {
    const { authLoading } = useAuth();

    if (authLoading) return <LoadingRouter />;

    return (
        <>
            <Header />
            <main style={{ minHeight: "calc(100vh - 128px)", position: "relative", overflow: "hidden" }}>
                <ScrollToTop />
                <AnimatedRoutes />
            </main>
            <Footer />
        </>
    );
};

export default AppLayout;
