import React, { useEffect, useState } from "react";
import { getAllJobs } from "../../../components/jobCard/JobService";
import type { Job } from "../../../components/jobCard/types/types";
import { Col, Empty, Row, Typography, Spin } from "antd";
import JobCard from "../../../components/jobCard/JobCard";
import { db } from "../../../services/firebse-config";
import { doc, getDoc } from "firebase/firestore";
import './FavoriteJobTab.css';

const { Title } = Typography;

interface FavoriteJobTabProps {
  currentUserId: string | null;
  theme: string;
}

export const FavoriteJobTab: React.FC<FavoriteJobTabProps> = ({
  currentUserId,
  theme,
}) => {
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritesAndJobs = async () => {
      if (!currentUserId) {
        setFavoriteJobs([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const userDoc = await getDoc(doc(db, "users", currentUserId));
        const favoriteIds: string[] = userDoc.exists()
          ? userDoc.data().favorites || []
          : [];

        const allJobs = await getAllJobs();
        const favorites = allJobs.filter((job) => favoriteIds.includes(job.id));

        setFavoriteJobs(favorites);
      } catch (error) {
        console.error("Error loading favorite jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesAndJobs();
  }, [currentUserId]);

  return (
    <div className={`favorite-jobs-container ${theme === 'dark' ? 'favorite-jobs-dark' : 'favorite-jobs-light'}`}>
    <Title level={4} className="favorite-jobs-header">My Favorite Jobs:</Title>

      {loading ? (
        <Row justify="center" style={{ marginTop: 100 }}>
          <Spin size="large" tip="Loading favorite jobs..." />
        </Row>
      ) : favoriteJobs.length === 0 ? (
        <Empty className="favorite-jobs-empty" description="You have no favorite jobs yet." />
      ) : (
        <Row gutter={[16, 16]}>
          {favoriteJobs.map((job) => (
            <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
              <JobCard job={job} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
