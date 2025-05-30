import { Spin, Button, Card, Row, Col, Typography, Divider } from "antd";
import { getAllJobs } from "../../components/jobCard/JobService";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import type { Job } from "../../components/jobCard/types/types";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { db } from "../../services/firebse-config";
import { useAppSelector } from "../../app/hook";
import { useEffect, useState } from "react";
import { ROUTES } from "../../routes/paths";
import { message } from "antd";
import "./JobDetail.css";

const { Title, Text, Paragraph } = Typography;

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const userId = useAppSelector((state) => state.user.id);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const jobs = await getAllJobs();
        const foundJob = jobs.find((j) => j.id === id) || null;
        setJob(foundJob);
        if (userId && foundJob?.appliedUsers?.includes(userId)) {
          setHasApplied(true);
        }
      } catch {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id, userId]);

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

  const handleApply = async () => {
    if (!userId || !id) {
      console.error("Missing user ID or job ID.");
      return;
    }

    try {
      const jobRef = doc(db, "jobs", id);
      await updateDoc(jobRef, {
        appliedUsers: arrayUnion(userId),
      });
      message.success("Applied successfully");
      setHasApplied(true);
    } catch (error) {
      console.error("Error applying to job:", error);
      message.error("Failed to apply. Please try again.");
    }
  };

  const handleViewAppliedUsers = () => {
    if (job?.ownerID === userId && id) {
      navigate(ROUTES.JOB_APPLICANTS.replace(":id", id));
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "2rem" }}>
      <Col xs={22} md={20} lg={16}>
        <Card
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
              <Paragraph>
                ${job.salaryFrom} - ${job.salaryTo}
              </Paragraph>
            </Col>

            <Col xs={24} sm={12}>
              <Text strong>Technologies:</Text>
              <Paragraph>{job.technologies.join(", ")}</Paragraph>

              <Text strong>Requirements:</Text>
              <Paragraph style={{ whiteSpace: "pre-line" }}>
                {job.requirements}
              </Paragraph>
            </Col>

            <Col span={24}>
              <Row justify="center" gutter={16}>
                <Col>
                  {job.ownerID === userId ? (
                    <Button type="default" onClick={handleViewAppliedUsers}>
                      View All Applied Users
                    </Button>
                  ) : (
                    <Button
                      type="default"
                      disabled={hasApplied}
                      onClick={handleApply}
                    >
                      {hasApplied ? "Already Applied" : "Apply Now"}
                    </Button>
                  )}
                </Col>
                <Col>
                  <Button type="primary" onClick={() => navigate(-1)}>
                    Go Back
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
