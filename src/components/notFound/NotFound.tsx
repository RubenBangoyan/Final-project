import notFoundImg from "../../assets/images/not-found-page.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { Button, Row, Col } from "antd";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Row justify="center" align="middle" className="not-found-wrapper">
      <Col
        xs={24}
        sm={20}
        md={16}
        lg={12}
        xl={10}
        className="not-found-content"
      >
        <Row justify="center" gutter={[0, 24]}>
          <Col span={24}>
            <img
              src={notFoundImg}
              alt="404 Not Found"
              className="not-found-image"
            />
          </Col>
          <Col span={24}>
            <h1 className="not-found-title">Oops! ERROR 404</h1>
          </Col>
          <Col span={24}>
            <p className="not-found-text">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </Col>
          <Col>
            <Button type="default" onClick={() => navigate(ROUTES.HOME_PATH)}>
              Go Back Home
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NotFound;
