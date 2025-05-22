import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "./paths";
import { Row, Col, Spin, Typography } from "antd";

const { Text } = Typography;

export const ProtectedRouter = () => {
  const { isAuth, authLoading } = useAuth();

  if (authLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", textAlign: "center" }}
      >
        <Col>
          <Spin size="large" tip={<Text>Restoring session...</Text>} />
        </Col>
      </Row>
    );
  }

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.SIGN_IN_PATH} replace />;
};
