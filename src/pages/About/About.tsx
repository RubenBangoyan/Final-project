import { Typography, Divider, Card } from "antd";
import { RocketOutlined, SmileOutlined, CheckCircleOutlined, TeamOutlined, GlobalOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useTheme } from "../../contexts/ThemeContext";
import "./About.css";
import Lottie from "lottie-react";
import animationData from "../../assets/animation2.json";


const { Title, Paragraph } = Typography;

const About = () => {
  const { theme } = useTheme();

  const coreValues = [
    {
      icon: <RocketOutlined style={{ fontSize: 28, color: "#1890ff" }} />,
      title: "Innovation",
      text: "Always evolving to meet the future of work."
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: 28, color: "#52c41a" }} />,
      title: "Integrity",
      text: "Building trust through honest experiences."
    },
    {
      icon: <SmileOutlined style={{ fontSize: 28, color: "#eb2f96" }} />,
      title: "Empowerment",
      text: "Helping individuals unlock their potential."
    },
    {
      icon: <TeamOutlined style={{ fontSize: 28, color: "#722ed1" }} />,
      title: "Inclusion",
      text: "Opportunities for everyone, everywhere."
    }
  ];

  const timeline = [
    {
      icon: <ClockCircleOutlined style={{ fontSize: 22, color: "#1890ff" }} />,
      text: "May 2025 – Job Hunter was born"
    },
    {
      icon: <RocketOutlined style={{ fontSize: 22, color: "#fa8c16" }} />,
      text: "2026 – Launching Candidate AI Matcher"
    },
    {
      icon: <GlobalOutlined style={{ fontSize: 22, color: "#13c2c2" }} />,
      text: "2027 – Global Expansion"
    }
  ];

  return (
      <div
          className={`container about-container ${
              theme === "dark" ? "about-dark" : "about-light"
          }`}
      >
        <section className="about-header-with-animation">
          <div className="about-text">
            <Title level={1} className="section-title">About Job Hunter</Title>
            <Paragraph className="highlight-paragraph">
              Founded in May 2025, Job Hunter is a forward-thinking tech company on a
              mission to redefine how job seekers and employers connect. Whether you're
              hunting for your dream job or searching for the perfect candidate, Job
              Hunter makes the process faster, smarter, and simpler.
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
            <h3 className="feature-title">Our Mission</h3>
            <p className="feature-description">
              To bridge the gap between talent and opportunity through technology, ensuring everyone has access to fulfilling careers and the tools to reach them.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon vision-icon" />
            <h3 className="feature-title">Our Vision</h3>
            <p className="feature-description">
              We envision a world where employment is fair, transparent, and accessible to all — regardless of location or background.
            </p>
          </div>
        </div>


        <Divider />

        <section className="values-section">
          <Title level={3} className="section-title">
            Our Core Values
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
            Our Journey
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
            "Connecting Ambitions. Empowering Careers."
          </Title>
        </section>
      </div>
  );
};

export default About;
