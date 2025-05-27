import { ChatHelper } from "../../components/chatHelper/ChatHelper";
import { Input, Button, Space, Typography, Row, Col, Carousel } from "antd";
import "./Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import aca from "../../images/aca.webp";
import synopsys from "../../images/synopsys.webp";
import picsart from "../../images/picsart.webp";
import bostongene from "../../images/bostongene.webp";

const { Title, Paragraph } = Typography;

const Home = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);
  const navigate = useNavigate();

  const MyCarousel = () => (
    <Carousel autoplay className="carousel-container">
      <div>
        <img className="carousel-img" src={aca} alt="aca" />
      </div>
      <div>
        <img className="carousel-img" src={bostongene} alt="bosotongene" />
      </div>
      <div>
        <img className="carousel-img" src={picsart} alt="picsart" />
      </div>
      <div>
        <img className="carousel-img" src={synopsys} alt="synopsys" />
      </div>
    </Carousel>
  );

  return (
    <div className="container">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", padding: "0 16px" }}
      >
        <Col
          xs={24}
          sm={20}
          md={16}
          lg={12}
          xl={10}
          style={{ textAlign: "center" }}
        >
          <Typography>
            <Title level={1}>Find Your Dream Job</Title>
            <Paragraph>
              Enter a job title or keyword below and click "Search" to explore
              opportunities.
            </Paragraph>
          </Typography>
          <Space.Compact style={{ width: "100%" }}>
            <Input placeholder="search" value={query} onChange={handleChange} />
            <Button
              type="primary"
              onClick={() =>
                navigate(`${ROUTES.JOBS_PATH}?q=${encodeURIComponent(query)}`)
              }
            >
              Search
            </Button>
          </Space.Compact>
          <MyCarousel />
        </Col>
      </Row>
      <ChatHelper />
    </div>
  );
};

export default Home;
