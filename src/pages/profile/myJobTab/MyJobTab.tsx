import { getAllJobs } from "../../../components/jobCard/JobService";
import type { Job } from "../../../components/jobCard/types/types";
import { Card, Col, Empty, Row, Typography, Spin } from "antd";
import JobCard from "../../../components/jobCard/JobCard";
import React, { useEffect, useState } from "react";

const { Title } = Typography;

interface MyJobsTabProps {
  currentUserId: string | null;
}

export const MyJobsTab: React.FC<MyJobsTabProps> = ({ currentUserId }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllJobs()
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const myJobs = jobs.filter((job) => job.ownerID === currentUserId);

  return (
    <>
      <Card className="shadow-lg rounded-xl border-0 mb-4">
        <Title level={4}>My Uploaded Jobs:</Title>
      </Card>

      {loading ? (
        <Row justify="center" style={{ marginTop: 100 }}>
          <Spin size="large" tip="Loading uploaded jobs..." />
        </Row>
      ) : myJobs.length === 0 ? (
        <Empty description="You have not posted any jobs." />
      ) : (
        <Row gutter={[16, 16]}>
          {myJobs.map((job) => (
            <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
              <JobCard job={job} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};
