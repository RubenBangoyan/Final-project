import { ChatHelper } from "../../components/chatHelper/ChatHelper";
import { Input, Button, Typography, Row, Col } from "antd";
import jobAnimation from "../../assets/animation.json";
import { useTheme } from "../../contexts/ThemeContext";
import CompanyCarousel from "./CompanyCarousel.tsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { useState } from "react";
import Lottie from "lottie-react";
import "./Home.css";
import {
  SearchOutlined,
  SafetyOutlined,
  TeamOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(ROUTES.JOBS_PATH, { state: { search: query } });
    }
  };

  const features = [
    {
      icon: <SafetyOutlined />,
      title: t("trustedCompanies"),
      desc: t("trustedCompaniesDesc"),
    },
    {
      icon: <TeamOutlined />,
      title: t("diversePositions"),
      desc: t("diversePositionsDesc"),
    },
    {
      icon: <RocketOutlined />,
      title: t("fastApplication"),
      desc: t("fastApplicationDesc"),
    },
  ];

  return (
    <div
      className={`home-container ${
        theme === "dark" ? "home-dark" : "home-light"
      }`}
    >
      <section className="hero">
        <Row gutter={[32, 32]} justify="center" align="middle">
          <Col xs={24} md={12}>
            <div className="hero-text-wrapper">
              <div className="hero-content">
                <Title className="hero-title">{t("findYourDreamJob")}</Title>
                <Paragraph className="hero-subtitle">
                  {t("enterJobTitle")}
                </Paragraph>
                <div className="search-wrapper">
                  <Input
                    placeholder={t("searchPlaceholder")}
                    prefix={<SearchOutlined />}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onPressEnter={handleSearch}
                    size="large"
                    className="search-input"
                  />
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSearch}
                    className="search-button"
                  >
                    {t("search")}
                  </Button>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="hero-illustration-wrapper">
              <Lottie
                animationData={jobAnimation}
                loop={true}
                className="hero-lottie"
              />
            </div>
          </Col>
        </Row>
      </section>

      <section className="features-wrapper">
        <div className="features-integrated">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <Title level={5}>{feature.title}</Title>
              <Paragraph>{feature.desc}</Paragraph>
            </div>
          ))}
        </div>
      </section>
      <CompanyCarousel />
      <div className="chat-helper">
        <ChatHelper />
      </div>
    </div>
  );
};

export default Home;
