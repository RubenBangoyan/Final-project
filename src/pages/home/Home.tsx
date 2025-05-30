import { Input, Button, Space, Typography, Row, Col } from "antd";
import {
  SearchOutlined,
  SafetyOutlined,
  TeamOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { ChatHelper } from "../../components/chatHelper/ChatHelper";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setSearchValue } from "../../features/filter/filterSlice";
import { useTheme } from "../../contexts/ThemeContext";
import "./Home.css";

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleSearch = () => {
    if (!query.trim()) return;
    dispatch(setSearchValue(query));
    navigate(ROUTES.JOBS_PATH);
  };

  return (
    <div>
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "40vh", position: "relative" }}
        className={`home-container ${theme === "dark" ? "home-dark" : "home-light"}`}
      >
        <Col span={24} className="banner-overlay">
          <Row justify="center">
            <Col
              xs={24}
              sm={20}
              md={16}
              lg={12}
              xl={10}
              style={{ textAlign: "center", color: "#fff", zIndex: 10 }}
            >
              <Title level={1} style={{ fontWeight: "bold" }}>
                Find Your Dream Job
              </Title>
              <Paragraph style={{ fontSize: "1.2rem", marginBottom: 32 }}>
                Enter a job title or keyword below and click{" "}
                <Text strong>Search</Text> to explore opportunities.
              </Paragraph>
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  placeholder="Search jobs, keywords, companies..."
                  prefix={<SearchOutlined />}
                  value={query}
                  onChange={handleChange}
                  size="large"
                  onPressEnter={handleSearch}
                  style={{ borderRadius: "8px 0 0 8px" }}
                />
                <Button
                  type="primary"
                  onClick={handleSearch}
                  size="large"
                  style={{ borderRadius: "0 8px 8px 0" }}
                >
                  Search
                </Button>
              </Space.Compact>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row
            gutter={[32, 32]}
            justify="center"
            style={{ padding: "145px 16px", textAlign: "center" }}
          >
            <Col xs={24} sm={8}>
              <SafetyOutlined style={{ fontSize: 48, color: "#000000" }} />
              <Title level={4}>Trusted Companies</Title>
              <Paragraph>Work with top companies you can rely on.</Paragraph>
            </Col>
            <Col xs={24} sm={8}>
              <TeamOutlined style={{ fontSize: 48, color: "#000000" }} />
              <Title level={4}>Diverse Positions</Title>
              <Paragraph>
                Find roles across all industries and skills.
              </Paragraph>
            </Col>
            <Col xs={24} sm={8}>
              <RocketOutlined style={{ fontSize: 48, color: "#000000" }} />
              <Title level={4}>Fast Application</Title>
              <Paragraph>
                Apply quickly with our user-friendly platform.
              </Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row justify="center">
        <Col>
          <ChatHelper />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
