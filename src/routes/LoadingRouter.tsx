import { Row, Col, Spin, Typography } from "antd";

const { Text } = Typography;

const LoadingRouter = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", textAlign: "center" }}
    >
      <Col>
        <Spin size="large" tip={<Text>Loading...</Text>}>
          <div style={{ height: 100, width: 100 }} />
        </Spin>
      </Col>
    </Row>
  );
};

export default LoadingRouter;
