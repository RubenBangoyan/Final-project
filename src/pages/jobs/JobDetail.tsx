import { Button, Card, Col, Row, Tag, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../components/jobCard/JobService";
import type { Job } from "../../components/jobCard/types/types";
import "./JobDetail.css";

const { Title, Paragraph, Text } = Typography;

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const allJobs = await getAllJobs();
        const foundJob = allJobs.find((job) => job.id === id) || null;
        setJob(foundJob);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading)
    return (
      <Row justify="center" style={{ marginTop: "5rem" }}>
        <Col>
          <Text strong>Loading...</Text>
        </Col>
      </Row>
    );

  if (!job)
    return (
      <Row justify="center" style={{ marginTop: "5rem" }}>
        <Col>
          <Text type="secondary" strong>
            Job not found
          </Text>
        </Col>
      </Row>
    );

  return (
    <Card className="job-detail-card">
      <Row justify="space-between" align="middle" className="job-header">
        <Col>
          <Title level={2}>{job.position}</Title>
        </Col>
        <Col>
          <Button type="primary" size="large" onClick={() => alert("Applied!")}>
            Apply
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="job-info">
        <Col span={12}>
          <Text strong>Company:</Text> {job.companyName}
        </Col>
        <Col span={12}>
          <Text strong>Location:</Text> {job.location}
        </Col>
        <Col span={12}>
          <Text strong>Employment Type:</Text>{" "}
          {job.employmentType.map((type) => (
            <Tag color="blue" key={type}>
              {type}
            </Tag>
          ))}
        </Col>
        <Col span={12}>
          <Text strong>Salary Range:</Text> ${job.salaryFrom} - ${job.salaryTo}
        </Col>
        <Col span={24}>
          <Text strong>Technologies:</Text>{" "}
          {job.technologies.map((tech) => (
            <Tag color="green" key={tech}>
              {tech}
            </Tag>
          ))}
        </Col>
      </Row>

      <Row style={{ marginTop: 30 }}>
        <Col span={24}>
          <Title level={3} className="section-title">
            About the Job
          </Title>
          <Paragraph className="section-content">{job.position}</Paragraph>
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <Title level={3} className="section-title">
            Job Requirements
          </Title>
          <Paragraph className="section-content">{job.requirements}</Paragraph>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: 40 }}>
        <Col>
          <Button type="default" size="large" onClick={() => navigate("/jobs")}>
            Go Jobs Page
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default JobDetail;
