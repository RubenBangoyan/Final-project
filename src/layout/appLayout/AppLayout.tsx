import { useAuth } from "../../contexts/AuthContext";
import LoadingRouter from "../../routes/LoadingRouter";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Row, Col } from "antd";
import "./AppLayout.css";

const AppLayout = () => {
  const { authLoading } = useAuth();

  if (authLoading) return <LoadingRouter />;

  return (
    <Row justify="center">
      <Col span={24}>
        <Header />
      </Col>

      <Col span={24}>
        <main style={{ minHeight: "calc(100vh - 128px)" }}>
          <Outlet />
        </main>
      </Col>

      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
};

export default AppLayout;
