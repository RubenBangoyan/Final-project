import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import {
  Row,
  Col,
  Card,
  Typography,
  Spin,
  Button,
  List,
  Avatar,
  Divider,
  Empty,
} from "antd";
import { db } from "../../services/firebse-config";
import { useTheme } from "../../contexts/ThemeContext";
import { UserOutlined } from "@ant-design/icons";
import "./JobApplicant.css";

const { Title, Text } = Typography;

interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const JobApplicants = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState<string>("");

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const jobRef = doc(db, "jobs", id);
        const jobSnap = await getDoc(jobRef);

        if (!jobSnap.exists()) throw new Error("Job not found.");

        const jobData = jobSnap.data();
        const appliedUserIds: string[] = jobData.appliedUsers || [];
        setJobTitle(jobData.position || "Untitled Job");

        if (appliedUserIds.length === 0) {
          setApplicants([]);
          return;
        }

        const usersRef = collection(db, "users");
        const usersSnap = await getDocs(usersRef);
        const userMap: Record<string, Applicant> = {};

        usersSnap.forEach((doc) => {
          const data = doc.data();
          if (appliedUserIds.includes(doc.id)) {
            userMap[doc.id] = {
              id: doc.id,
              firstName: data.firstName || "John",
              lastName: data.lastName || "Doe",
              email: data.email || "N/A",
            };
          }
        });

        setApplicants(Object.values(userMap));
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  return (
    <Row justify="center" style={{ marginTop: "2rem" }}>
      <Col xs={22} md={20} lg={16}>
        <Card
          className={theme === "dark" ? "homepage-dark" : "homepage-light"}
          style={{ borderRadius: 8 }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3}>Applicants for: "{jobTitle}"</Title>
            </Col>
            <Col>
              <Button onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </Col>
          </Row>

          <Divider />

          {loading ? (
            <Row justify="center" style={{ marginTop: "2rem" }}>
              <Spin size="large" />
            </Row>
          ) : applicants.length === 0 ? (
            <Empty description="No users have applied yet." />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={applicants}
              renderItem={(applicant) => (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => {
                        alert("Resume not available.");
                      }}
                    >
                      View User Resume
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <Text strong>
                        {applicant.firstName} {applicant.lastName}
                      </Text>
                    }
                    description={applicant.email}
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default JobApplicants;
