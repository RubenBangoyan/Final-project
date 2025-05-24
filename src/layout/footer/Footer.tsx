import { Row, Col, Typography, Space, Divider } from "antd";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import {
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./Footer.css";

const { Title, Text, Link } = Typography;

const Footer = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <footer className={`footer footer-${theme}`}>
      <Row gutter={[32, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: "#fff" }}>
            Job Hunter!
          </Title>
          <Text style={{ color: "#ccc" }}>{t("tagline")}</Text>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: "#fff" }}>
            {t("explore")}
          </Title>
          <Space direction="vertical">
            <Link
              onClick={() => navigate("/features")}
              style={{ color: "#ccc" }}
            >
              {t("features")}
            </Link>
            <Link
              onClick={() => navigate("/pricing")}
              style={{ color: "#ccc" }}
            >
              {t("pricing")}
            </Link>
            <Link onClick={() => navigate("/docs")} style={{ color: "#ccc" }}>
              {t("docs")}
            </Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: "#fff" }}>
            {t("company")}
          </Title>
          <Space direction="vertical">
            <Link
              onClick={() => navigate(ROUTES.ABOUT_PATH)}
              style={{ color: "#ccc" }}
            >
              {t("about")}
            </Link>
            <Link onClick={() => navigate("/team")} style={{ color: "#ccc" }}>
              {t("team")}
            </Link>
            <Link
              onClick={() => navigate("/careers")}
              style={{ color: "#ccc" }}
            >
              {t("careers")}
            </Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: "#fff" }}>
            {t("followUs")}
          </Title>
          <Space direction="vertical">
            <Link
              href="https://instagram.com"
              target="_blank"
              style={{ color: "#ccc" }}
            >
              <InstagramOutlined style={{ marginRight: 8 }} />
              {t("instagram")}
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              style={{ color: "#ccc" }}
            >
              <LinkedinOutlined style={{ marginRight: 8 }} />
              {t("linkedin")}
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              style={{ color: "#ccc" }}
            >
              <TwitterOutlined style={{ marginRight: 8 }} />
              {t("twitter")}
            </Link>
          </Space>
        </Col>
      </Row>

      <Divider style={{ backgroundColor: "#333", marginTop: 40 }} />

      <Row justify="center">
        <Text style={{ color: "#888" }}>
          © {new Date().getFullYear()} {t("copyright")}
        </Text>
      </Row>
    </footer>
  );
};

export default Footer;
