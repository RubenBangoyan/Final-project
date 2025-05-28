import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, Button, Card, Row, Col, Typography, Divider } from "antd";
import { getAllJobs } from "../../components/jobCard/JobService";
import type { Job } from "../../components/jobCard/types/types";
import { useTheme } from "../../contexts/ThemeContext";
import "./JobDetail.css";


const { Title, Text, Paragraph } = Typography;

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const jobs = await getAllJobs();
        const foundJob = jobs.find((j) => j.id === id) || null;
        setJob(foundJob);
      } catch {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (loading) {
    return (
      <Row justify="center" style={{ marginTop: "100px" }}>
        <Col>
          <Spin tip="Loading job details..." size="large" />
        </Col>
      </Row>
    );
  }

  if (!job) {
    return (
      <Row justify="center" style={{ marginTop: "100px" }}>
        <Col>
          <Text type="danger" strong style={{ fontSize: 18 }}>
            Job not found.
          </Text>
          <Row justify="center" style={{ marginTop: 16 }}>
            <Col>
              <Button onClick={() => navigate(-1)}>Go Back</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  return (
    <Row justify="center" style={{ marginTop: "2rem" }}>
      <Col xs={22} md={20} lg={16}>
        <Card
          bordered
          className={theme === "dark" ? "homepage-dark" : "homepage-light"}
          style={{ borderRadius: 8 }}
        >
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Title level={2}>{job.position}</Title>
              <Divider />
            </Col>

            <Col xs={24} sm={12}>
              <Text strong>Company:</Text>
              <Paragraph>{job.companyName}</Paragraph>

              <Text strong>Location:</Text>
              <Paragraph>{job.location}</Paragraph>

              <Text strong>Employment Type:</Text>
              <Paragraph>{job.employmentType.join(", ")}</Paragraph>

              <Text strong>Salary:</Text>
              <Paragraph>${job.salaryFrom} - ${job.salaryTo}</Paragraph>
            </Col>

            <Col xs={24} sm={12}>
              <Text strong>Technologies:</Text>
              <Paragraph>{job.technologies.join(", ")}</Paragraph>

              <Text strong>Requirements:</Text>
              <Paragraph style={{ whiteSpace: "pre-line" }}>{job.requirements}</Paragraph>
            </Col>

            
            <Col span={24}>
              <Row justify="center">
                <Col>
                  <Button type="primary" onClick={() => navigate(-1)}>
                    Back to Jobs
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default JobDetail;
