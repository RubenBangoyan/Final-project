import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import { db } from "../../../services/firebse-config";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./JobApplicant.css";
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
  Modal,
  message,
} from "antd";
const { Title, Text, Paragraph } = Typography;

interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ContactInfo {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

interface ExperienceItem {
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface Resume {
  contactInfo: ContactInfo;
  education: string;
  experience?: ExperienceItem[];
  skills?: string[];
  languages?: string[];
  profile?: string;
}

const JobApplicants = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [resumeModalVisible, setResumeModalVisible] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!id) return;
      setLoading(true);
      try {
        // console.log(id, 'usePArams ID');
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

  const handleViewResume = async (ownerId: string) => {
    try {
      const resumeRef = doc(db, "resume", ownerId);
      const resumeSnap = await getDoc(resumeRef);

      if (resumeSnap.exists()) {
        const data = resumeSnap.data() as Resume;
        setSelectedResume(data);
        setResumeModalVisible(true);
      } else {
        message.warning("No resume found for this applicant.");
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
      message.error("Failed to load resume.");
    }
  };

  const currentTheme = theme === "dark" ? "job-dark" : "job-light";

  return (
    <div className={`job-applicant-page-wrapper ${currentTheme}`}>
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
                <Button onClick={() => navigate(-1)}>Go Back</Button>
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
                    className="hoverable-item"
                    actions={[
                      <Button
                        type="primary"
                        onClick={() => handleViewResume(applicant.id)}
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

      <Modal
        open={resumeModalVisible}
        onCancel={() => {
          setResumeModalVisible(false);
          setSelectedResume(null);
        }}
        footer={null}
        title="Applicant Resume"
        width={750}
      >
        {selectedResume ? (
          <div style={{ padding: "12px" }}>
            <Title level={4} style={{ marginBottom: 4 }}>
              {selectedResume?.contactInfo?.name}{" "}
              {selectedResume?.contactInfo?.lastName}
            </Title>
            <Text type="secondary">{selectedResume?.contactInfo?.email}</Text>
            <br />
            <Text type="secondary">
              📞 {selectedResume?.contactInfo?.phone} | 📍{" "}
              {selectedResume?.contactInfo?.city}
            </Text>
            <Divider />
            <Title level={5}>Profile</Title>
            <Paragraph>
              {selectedResume?.profile?.trim()
                ? selectedResume.profile
                : "No profile summary provided."}
            </Paragraph>
            <Divider />
            <Title level={5}>Experience</Title>
            {selectedResume?.experience?.length ? (
              <List
                dataSource={selectedResume.experience}
                renderItem={(exp) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <>
                          {exp.position} at <strong>{exp.company}</strong>
                        </>
                      }
                      description={
                        <>
                          <Text type="secondary">
                            {new Date(exp.startDate).toLocaleDateString()} -{" "}
                            {new Date(exp.endDate).toLocaleDateString()}
                          </Text>
                          <br />
                          {`Description: ${exp.description}`}
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Paragraph type="secondary">No experience listed.</Paragraph>
            )}

            <Divider />

            <Title level={5}>Skills</Title>
            {selectedResume?.skills?.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedResume.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: "#f0f0f0",
                      padding: "4px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <Paragraph type="secondary">No skills listed.</Paragraph>
            )}

            <Divider />

            <Title level={5}>Languages</Title>
            {selectedResume?.languages?.length ? (
              <ul style={{ paddingLeft: "1.2rem" }}>
                {selectedResume.languages.map((lang, i) => (
                  <li key={i}>{lang}</li>
                ))}
              </ul>
            ) : (
              <Paragraph type="secondary">No languages listed.</Paragraph>
            )}
          </div>
        ) : (
          <Spin />
        )}
      </Modal>
    </div>
  );
};

export default JobApplicants;
