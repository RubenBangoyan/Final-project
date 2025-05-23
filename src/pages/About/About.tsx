import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Typography, Button } from "antd";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import "./About.css";

const { Title, Paragraph } = Typography;

const teamMembers = [
  { name: "Alice", role: "Frontend Developer" },
  { name: "Bob", role: "Backend Developer" },
  { name: "Carla", role: "UX Designer" },
  { name: "David", role: "Project Manager" },
  { name: "Eve", role: "QA Engineer" },
  { name: "Meline", role: "Programmer" },
  { name: "Nina", role: "Product Owner" },
  { name: "Leo", role: "DevOps" },
];

const VISIBLE_COUNT = 3;

const About = () => {
  const { theme } = useTheme();
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + VISIBLE_COUNT < teamMembers.length) {
      setStartIndex(startIndex + VISIBLE_COUNT);
    }
  };

  const handlePrev = () => {
    if (startIndex - VISIBLE_COUNT >= 0) {
      setStartIndex(startIndex - VISIBLE_COUNT);
    }
  };

  const visibleMembers = teamMembers.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );

  return (
    <div
      className={`about-container ${
        theme === "dark" ? "about-dark" : "about-light"
      }`}
    >
      <header className="about-header">
        <Title level={2} className="section-title">About Us</Title>
      </header>

      <section className="our-team">
        <Card className="team-card">
          <Title level={4} className="section-title">
            Our Team
          </Title>
          <Paragraph className="highlight-paragraph">
            We are a passionate team dedicated to connecting job seekers with
            the right opportunities and employers with the best talent.
          </Paragraph>
        </Card>
      </section>

      <section className="learn-more-section">
        <Card className="learn-more-card">
          <Title level={4} className="section-title">
            Learn More
          </Title>
          <Paragraph className="highlight-paragraph">
            Our platform is built to help you post jobs, discover workers, and
            find new opportunities in a seamless way.
          </Paragraph>
        </Card>
      </section>

      <section className="team-images-section">
        <Button
          icon={<LeftOutlined />}
          shape="circle"
          onClick={handlePrev}
          disabled={startIndex === 0}
        />

        <div className="team-cards">
          {visibleMembers.map((member, idx) => (
            <Card
              key={idx}
              className={`member-card ${
                theme === "dark" ? "member-dark" : "member-light"
              }`}
            >
              <div className="img-placeholder">img</div>
              <Title level={5} className="member-name">
                {member.name}
              </Title>
              <Paragraph className="member-role">{member.role}</Paragraph>
            </Card>
          ))}
        </div>

        <Button
          icon={<RightOutlined />}
          shape="circle"
          onClick={handleNext}
          disabled={startIndex + VISIBLE_COUNT >= teamMembers.length}
        />
      </section>
    </div>
  );
};

export default About;
