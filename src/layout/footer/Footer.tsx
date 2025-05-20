import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import "./Footer.css";
import {
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Row, Col, Typography, Space, Divider } from "antd";
const { Title, Text, Link } = Typography;
import { ROUTES } from "../../routes/paths";

const Footer = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <footer className={`footer footer-${theme}`}>
      <Row gutter={[32, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: "#fff" }}>
            MyApp
          </Title>
          <Text style={{ color: "#ccc" }}>Building the future, today.</Text>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: "#fff" }}>
            Explore
          </Title>
          <Space direction="vertical">
            <Link
              onClick={() => navigate("/features")}
              style={{ color: "#ccc" }}
            >
              Features
            </Link>
            <Link
              onClick={() => navigate("/pricing")}
              style={{ color: "#ccc" }}
            >
              Pricing
            </Link>
            <Link onClick={() => navigate("/docs")} style={{ color: "#ccc" }}>
              Docs
            </Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: "#fff" }}>
            Company
          </Title>
          <Space direction="vertical">
            <Link
              onClick={() => navigate(ROUTES.ABOUT_PATH)}
              style={{ color: "#ccc" }}
            >
              About
            </Link>
            <Link onClick={() => navigate("/team")} style={{ color: "#ccc" }}>
              Team
            </Link>
            <Link
              onClick={() => navigate("/careers")}
              style={{ color: "#ccc" }}
            >
              Careers
            </Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: "#fff" }}>
            Follow Us
          </Title>
          <Space direction="vertical">
            <Link
              className="footer-link"
              href="https://instagram.com"
              target="_blank"
              style={{ color: "#ccc" }}
            >
              <InstagramOutlined style={{ marginRight: 8 }} />
              Instagram
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              style={{ color: "#ccc" }}
            >
              <LinkedinOutlined style={{ marginRight: 8 }} />
              LinkedIn
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              style={{ color: "#ccc" }}
            >
              <TwitterOutlined style={{ marginRight: 8 }} />
              Twitter
            </Link>
          </Space>
        </Col>
      </Row>

      <Divider style={{ backgroundColor: "#333", marginTop: 40 }} />

      <Row justify="center">
        <Text style={{ color: "#888" }}>
          © {new Date().getFullYear()} All rights reserved.
        </Text>
      </Row>
    </footer>
  );
};

export default Footer;
