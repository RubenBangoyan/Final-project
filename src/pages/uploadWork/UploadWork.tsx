import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  Modal,
  Row,
  Col,
  Card,
  Divider,
  Typography,
} from "antd";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebse-config";
import { useAppSelector } from "../../app/hook";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { ROUTES } from "../../routes/paths";
import { v4 as uuid } from "uuid";
import "./UploadWork.css";
import { useTheme } from "../../contexts/ThemeContext";

const { Option } = Select;

interface OfferingWorkFormValues {
  companyName: string;
  aboutCompany?: string;
  companyWebsite?: string;
  position: string;
  category?: string;
  level?: "intern" | "junior" | "mid" | "senior" | "lead";
  technologies?: string[];
  employmentType?: string[];
  location?: string;
  salaryFrom?: number;
  salaryTo?: number;
  requirements?: string;
  contactEmail: string;
  telegram?: string;
}

const UploadWork = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.user.id);
  const unicID = uuid();
  const { theme } = useTheme();

  const cleanObject = (obj: Record<string, any>) =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

  const onFinish = async (values: OfferingWorkFormValues) => {
    try {
      if (!id) {
        console.error("User ID is null. Cannot create document.");
        return;
      }

      const cleanedValues = cleanObject(values);

      const expiresAt = Timestamp.fromDate(
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      );

      const dataToSave = {
        ...cleanedValues,
        ownerID: id,
        createdAt: serverTimestamp(),
        appliedUsers: [],
        expiresAt: expiresAt,
      };

      await setDoc(doc(db, "jobs", unicID), dataToSave);
      console.log("Job successfully saved with ID:", unicID);

      navigate(ROUTES.HOME_PATH);
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  const handleGoBack = () => {
    Modal.confirm({
      title: "Discard Form?",
      content:
        "Are you sure you want to go back? All entered data will be lost.",
      okText: "Yes, go back",
      cancelText: "Cancel",
      onOk: () => navigate(ROUTES.HOME_PATH),
    });
  };
  const { Title, Text } = Typography;
  return (
    <div
      className={`upload-container ${
        theme === "dark" ? "upload-dark" : "upload-light"
      }`}
    >
      <div>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}
        >
          <Card
            style={{
              boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
              borderRadius: 16,
            }}
          >
            <Title level={3} style={{ marginBottom: 0 }}>
              Company Information
            </Title>
            <Text type="secondary">Tell us about your company</Text>

            <Divider />

            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g. Synergy Armenia" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="companyWebsite"
                  label="Website"
                  rules={[{ required: true, type: "url" }]}
                >
                  <Input placeholder="https://..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="telegram"
                  label="Telegram / Contact"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="@yourchannel or contact" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="aboutCompany"
              label="About the Company"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} placeholder="Short description..." />
            </Form.Item>
          </Card>

          <Card
            style={{
              marginTop: 32,
              boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
              borderRadius: 16,
            }}
          >
            <Title level={3} style={{ marginBottom: 0 }}>
              Job Details
            </Title>
            <Text type="secondary">Fill in the job position info</Text>

            <Divider />

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="position"
                  label="Position"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="e.g. Frontend Developer" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select category">
                    <Option value="softwareDevelopment">
                      Software Development
                    </Option>
                    <Option value="InfrastructureDevOps">
                      Infrastructure / DevOps
                    </Option>
                    <Option value="designCreative">Design & Creative</Option>
                    <Option value="marketingSales">Marketing & Sales</Option>
                    <Option value="dataScience">Data Science</Option>
                    <Option value="customerSupport">Customer Support</Option>
                    <Option value="education">Education</Option>
                    <Option value="productManagement">
                      Product Management
                    </Option>
                    <Option value="hrRecruiting">HR & Recruiting</Option>
                    <Option value="legal">Legal</Option>
                    <Option value="engineering">Engineering</Option>
                    <Option value="finance">Finance</Option>
                    <Option value="QualityTesting">Quality Assurance / Testing</Option>
                    <Option value="others">Others</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="level"
                  label="Level"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="e.g. Junior">
                    <Option value="intern">Intern</Option>
                    <Option value="junior">Junior</Option>
                    <Option value="mid">Mid</Option>
                    <Option value="senior">Senior</Option>
                    <Option value="lead">Lead</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="employmentType"
                  label="Employment Type"
                  rules={[{ required: true }]}
                >
                  <Select mode="multiple" placeholder="Select type">
                    <Option value="fulltime">Full-time</Option>
                    <Option value="parttime">Part-time</Option>
                    <Option value="remote">Remote</Option>
                    <Option value="freelance">Freelance</Option>
                    <Option value="internship">Internship</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="technologies"
              label="Technologies"
              rules={[{ required: true }]}
            >
              <Select
                mode="tags"
                placeholder="e.g. React, TypeScript, Node.js"
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="salaryFrom"
                  label="Salary From ($)"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="salaryTo"
                  label="Salary To ($)"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g. Remote / Yerevan" />
            </Form.Item>

            <Form.Item
              name="requirements"
              label="Candidate Requirements"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="e.g. At least 1 year of experience..."
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 24 }}>
              <Button type="primary" htmlType="submit">
                Post Job
              </Button>
              <Button
                type="default"
                onClick={handleGoBack}
                style={{ marginLeft: 12 }}
              >
                Go Back Home
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default UploadWork;
