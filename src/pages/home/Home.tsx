import { Layout, Input, Button, Select, Card, Carousel } from "antd";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useFirebaseData } from "../../contexts/FirebaseDataContext";
import React, { useRef, useEffect } from "react";
import "./Home.css";

const { Content } = Layout;
const { Option } = Select;

const Home: React.FC = () => {
  const carouselRef = useRef<any>(null);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { jobOffers, jobSeekers, loading, error } = useFirebaseData();

  const next = () => carouselRef.current?.next();
  const prev = () => carouselRef.current?.prev();

  // Fetching test data from Firestore into the console (Home.tsx)
  useEffect(() => {
    if (!loading && jobOffers.length > 0) {
      console.log("Job Offers from Firebase:", jobOffers);
    }
    if (!loading && jobSeekers.length > 0) {
      console.log("Job Seekers from Firebase:", jobSeekers);
    }

    if (error) {
      console.error("Error fetching job offers:", error);
    }
  }, [jobOffers, loading, error]);

  return (
    <Layout className={`homepage homepage-${theme}`}>
      <Content className="content">
        <div className="hero">
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.description")}</p>
        </div>

        <div className="search-section">
          <Input placeholder={t("search.placeholder")} className="input" />
          <Select placeholder={t("search.category")} className="select">
            <Option value="cat1">{t("search.plumber")}</Option>
            <Option value="cat2">{t("search.electrician")}</Option>
            <Option value="cat3">{t("search.carpenter")}</Option>
          </Select>
          <Button type="primary" className="search-button">
            {t("search.button")}
          </Button>
        </div>

        <div className="section-title">⭐ {t("section.bestWorkers")} ⭐</div>

        <div className="carousel-wrapper">
          <Button onClick={prev} className="carousel-btn">
            ←
          </Button>
          <Carousel ref={carouselRef} autoplay className="worker-carousel">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="carousel-slide">
                <Card className="worker-card" variant="outlined">
                  <p className="worker-rate">★★★★★</p>
                  <div className="worker-image" />
                  <p className="worker-name">{t("worker.name")}</p>
                  <p className="worker-surname">{t("worker.surname")}</p>
                  <p className="worker-profession">{t("worker.profession")}</p>
                </Card>
              </div>
            ))}
          </Carousel>
          <Button onClick={next} className="carousel-btn">
            →
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
