import animationData from "../../assets/animation2.json";
import { useTheme } from "../../contexts/ThemeContext";
import { Typography, Divider, Card } from "antd";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import "./About.css";
import {
  RocketOutlined,
  SmileOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const About = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const coreValues = [
    {
      icon: <RocketOutlined style={{ fontSize: 28, color: "#1890ff" }} />,
      title: "Innovation",
      text: "Always evolving to meet the future of work.",
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: 28, color: "#52c41a" }} />,
      title: "Integrity",
      text: "Building trust through honest experiences.",
    },
    {
      icon: <SmileOutlined style={{ fontSize: 28, color: "#eb2f96" }} />,
      title: "Empower",
      text: "Helping individuals unlock their potential.",
    },
    {
      icon: <TeamOutlined style={{ fontSize: 28, color: "#722ed1" }} />,
      title: "Inclusion",
      text: "Opportunities for everyone, everywhere.",
    },
  ];

  const timeline = [
    {
      icon: <ClockCircleOutlined style={{ fontSize: 22, color: "#1890ff" }} />,
      text: "May 2025 - Job Hunter was born",
    },
    {
      icon: <RocketOutlined style={{ fontSize: 22, color: "#fa8c16" }} />,
      text: "2026 - Launching Candidate AI Matcher",
    },
    {
      icon: <GlobalOutlined style={{ fontSize: 22, color: "#13c2c2" }} />,
      text: "2027 - Global Expansion",
    },
  ];

  return (
    <div
      className={`container about-container ${
        theme === "dark" ? "about-dark" : "about-light"
      }`}
    >
      <section className="about-header-with-animation">
        <div className="about-text">
          <Title level={1} className="section-title">
            {t("aboutTitle")}
          </Title>
          <Paragraph className="highlight-paragraph">
            {t("aboutDescription")}
          </Paragraph>
        </div>

        <div className="about-animation">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </section>

      <Divider />

      <div className="mission-vision-grid">
        <div className="feature-card">
          <div className="feature-icon mission-icon" />
          <h3 className="feature-title">{t("missionTitle")}</h3>
          <p className="feature-description">{t("missionDescription")}</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon vision-icon" />
          <h3 className="feature-title">{t("visionTitle")}</h3>
          <p className="feature-description">{t("visionDescription")}</p>
        </div>
      </div>

      <Divider />

      <section className="values-section">
        <Title level={3} className="section-title">
          {t("coreValuesTitle")}
        </Title>
        <div className="core-values-grid">
          {coreValues.map((value, idx) => (
            <Card key={idx} className="core-value-card">
              {value.icon}
              <div className="core-value-title">{value.title}</div>
              <div className="core-value-text">{value.text}</div>
            </Card>
          ))}
        </div>
      </section>

      <Divider />

      <section className="timeline-section">
        <Title level={3} className="section-title">
          {t("journeyTitle")}
        </Title>
        <ul className="timeline-list">
          {timeline.map((item, idx) => (
            <li key={idx} className="timeline-item">
              {item.icon} <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      <section className="motto-section">
        <Title level={4} className="motto-text">
          "{t("motto")}"
        </Title>
      </section>
    </div>
  );
};

export default About;
