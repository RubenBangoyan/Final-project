import { Input, Button, Typography, Row, Col } from "antd";
import {
  SearchOutlined,
  SafetyOutlined,
  TeamOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { ChatHelper } from "../../components/chatHelper/ChatHelper";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import "./Home.css";
import Lottie from "lottie-react";
import jobAnimation from "../../assets/animation.json";
import CompanyCarousel from "./CompanyCarousel.tsx";

const { Title, Paragraph } = Typography;

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(ROUTES.JOBS_PATH, { state: { search: query } });
    }
  };
  const features = [
    {
      icon: <SafetyOutlined />,
      title: "Trusted Companies",
      desc: "Work with top companies you can rely on.",
    },
    {
      icon: <TeamOutlined />,
      title: "Diverse Positions",
      desc: "Find roles across all industries and skills.",
    },
    {
      icon: <RocketOutlined />,
      title: "Fast Application",
      desc: "Apply quickly with our user-friendly platform.",
    },
  ];

  return (
      <div className={`home-container ${theme === "dark" ? "home-dark" : "home-light"}`}>
        <section className="hero">
          <Row gutter={[32, 32]} justify="center" align="middle">
            <Col xs={24} md={12}>
              <div className="hero-text-wrapper">
                <div className="hero-content">
                  <Title className="hero-title">Find Your Dream Job</Title>
                  <Paragraph className="hero-subtitle">
                    Enter a job title or keyword below and click <i>Search</i> to explore opportunities.
                  </Paragraph>
                  <div className="search-wrapper">
                    <Input
                        placeholder="Search jobs, keywords, companies..."
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
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="hero-illustration-wrapper">
                <Lottie animationData={jobAnimation} loop={true} className="hero-lottie" />
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

        <CompanyCarousel/>

        <div className="chat-helper">
          <ChatHelper />
        </div>
      </div>
  );
};

export default Home;
