import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Row, Col, Spin, Typography } from "antd";
import { getJobById } from "../../components/jobCard/JobService";
import type { Job } from "../../components/jobCard/types/types";
import "./JobDetail.css";

const { Title, Paragraph } = Typography;

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        if (id) {
          const fetchedJob = await getJobById(id);
          setJob(fetchedJob);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApplyClick = () => {
    alert("Apply clicked! Implement application process here.");
  };

  if (loading) {
    return (
      <div className="job-detail-loading">
        <Spin size="large" tip="Loading job details..." />
      </div>
    );
  }

  if (!job) {
    return <div className="job-detail-no-job">Job not found.</div>;
  }

  return (
    <div className="job-detail-container">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2}>{job.position}</Title>
          <Paragraph>
            <strong>Company:</strong> {job.companyName}
          </Paragraph>
          <Paragraph>
            <strong>Location:</strong> {job.location}
          </Paragraph>
          <Paragraph>
            <strong>Employment Type:</strong> {job.employmentType.join(", ")}
          </Paragraph>
          <Paragraph>
            <strong>Salary Range:</strong> ${job.salaryFrom} - ${job.salaryTo}
          </Paragraph>
          <Paragraph>
            <strong>Technologies:</strong> {job.technologies.join(", ")}
          </Paragraph>
          <Paragraph>
            <strong>Requirements:</strong> {job.requirements}
          </Paragraph>
          
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: 24 }}>
        <Col>
          <Button type="primary" size="large" onClick={handleApplyClick}>
            Apply
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default JobDetail;
