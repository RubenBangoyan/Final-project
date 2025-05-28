import { Input, Button, Space, Typography, Row, Col, Carousel } from "antd";
import { ChatHelper } from "../../components/chatHelper/ChatHelper";
import bostongene from "../../assets/images/bostongene.webp";
import synopsys from "../../assets/images/synopsys.webp";
import picsart from "../../assets/images/picsart.webp";
import { useNavigate } from "react-router-dom";
import aca from '../../assets/images/aca.webp'
import { ROUTES } from "../../routes/paths";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  setCurrentPage,
  setSearchValue,
} from "../../features/filter/filterSlice";
import "./Home.css";

const { Title, Paragraph } = Typography;

const Home = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleSearch = () => {
    dispatch(setSearchValue(query));
    dispatch(setCurrentPage(1));
    navigate(ROUTES.JOBS_PATH);
  };

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
            <Input
              placeholder="search"
              value={query}
              onChange={handleChange}
              size="large"
            />
            <Button type="primary" onClick={handleSearch} size="large">
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
