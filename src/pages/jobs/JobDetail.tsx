import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Spin,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  message,
} from "antd";
import {
  BankOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

import { getAllJobs } from "../../components/jobCard/JobService";
import { getJobById } from '../../components/jobCard/JobService';
import type { Job } from "../../components/jobCard/types/types";
import { useTheme } from "../../contexts/ThemeContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../services/firebse-config";
import { useAppSelector } from "../../app/hook";
import { ROUTES } from "../../routes/paths";
import "./JobDetail.css";
import { Tag } from "antd";


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
        const foundJob = await getJobById(id!);
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

  console.log('job', job);

  if (loading) {
    return (
      <Row justify="center" style={{ marginTop: '100px' }}>
        <Col>
          <Spin tip="Loading job details..." size="large" />
        </Col>
      </Row>
    );
  }

  if (!job) {
    return (
      <Row justify="center" style={{ marginTop: '100px' }}>
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
      console.error('Missing user ID or job ID.');
      return;
    }

    try {
      const jobRef = doc(db, 'jobs', id);
      await updateDoc(jobRef, {
        appliedUsers: arrayUnion(userId),
      });
      message.success('Applied successfully');
      setHasApplied(true);
    } catch (error) {
      console.error('Error applying to job:', error);
      message.error('Failed to apply. Please try again.');
    }
  };

  const handleViewAppliedUsers = () => {
    if (job?.ownerID === userId && id) {
      navigate(ROUTES.JOB_APPLICANTS.replace(':id', id));
    }
  };

  const currentTheme = theme === 'dark' ? 'job-dark' : 'job-light';

  return (
    <div className={`job-detail-page-wrapper ${currentTheme}`}>
      <Row justify="center">
        <Col xs={22} md={20} lg={16} className="job-detail-container">
        <Card className="job-card">
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Title level={2} className="job-detail-title">{job.position}</Title>
                <Divider />
              </Col>

              <Col xs={24} sm={12} className="job-info-col">
                <Text strong><BankOutlined style={{ marginRight: 6 }} /> Company:</Text>
                <Paragraph>{job.companyName}</Paragraph>

                <Text strong><EnvironmentOutlined style={{ marginRight: 6 }} /> Location:</Text>
                <Paragraph>{job.location}</Paragraph>

                <Text strong><UserSwitchOutlined style={{ marginRight: 6 }} /> Employment Type:</Text>
                <Paragraph>{job.employmentType.join(", ")}</Paragraph>

                <Text strong><DollarOutlined style={{ marginRight: 6 }} /> Salary:</Text>
                <Paragraph>
                  ${job.salaryFrom} - ${job.salaryTo}
                </Paragraph>
              </Col>

              <Col xs={24} sm={12}>
                <Text strong>Technologies:</Text>
                
                <Paragraph>
                  {job.technologies.map((tech) => (
                      <Tag key={tech} color="blue">
                        {tech}
                      </Tag>
                  ))}
                </Paragraph>

                <Text strong>Requirements:</Text>
                <ul className="requirement-list">
                  {job.requirements.split("\n").map((req, index) => (
                      <li key={index}>
                        <span className="bullet-icon">✔</span> {req}
                      </li>
                  ))}
                </ul>
                
              </Col>

              <Col span={24}>
                <Row>
                  <Paragraph strong style={{ fontSize: '18px' }}>
                    {`Total Applicants: ${job.appliedUsers.length || 0}`}
                  </Paragraph>
                </Row>
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
                        {hasApplied ? 'Already Applied' : 'Apply Now'}
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
    </div>
  );
};

export default JobDetail;