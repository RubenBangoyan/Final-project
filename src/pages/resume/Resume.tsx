import { formatResumePrompt } from "../../utils/resumeFormat";
import type { UploadFile } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { generateResumeFromGPT } from "../../api";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Upload,
  Space,
  Divider,
  Row,
  Col,
  Modal,
} from "antd";
import "./Resume.css";
import type { RcFile } from "antd/es/upload";
import { message } from "antd";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const normFile = (e: UploadChangeParam<UploadFile<any>>): UploadFile[] => {
  if (Array.isArray(e)) return e;
  return e?.fileList || [];
};

const ResumeForm: React.FC = () => {
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [experienceFields, setExperienceFields] = useState([{ id: uuidv4() }]);
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const addExperience = () => {
    setExperienceFields([...experienceFields, { id: uuidv4() }]);
  };

  const removeExperience = (id: string) => {
    setExperienceFields(experienceFields.filter((field) => field.id !== id));
  };

  async function handleCreateResume(values: any) {
    const prompt = formatResumePrompt(values);
    try {
      const result = await generateResumeFromGPT(prompt);
      console.log("Generated Resume:", result);
      setGeneratedResume(result);
    } catch (err) {
      console.error("Error generating resume:", err);
    }
  }

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

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }

    const isLt5MB = file.size / 1024 / 1024 < 5;
    if (!isLt5MB) {
      message.error("Image must be smaller than 5MB!");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || "Preview");
  };

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => setFileList(newFileList);

  return (
    <div className="container resume-container">
      <div className="resume-scroll">
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={(values) => handleCreateResume(values)}
        >
          <Divider orientation="left">
            <h1>🧍 Fill this out before creating your resume</h1>
          </Divider>
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Date of Birth" name="birthdate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input placeholder="example@mail.com" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Phone" name="phone">
                <Input placeholder="+123 456 7890" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="City" name="city">
                <Input placeholder="City" />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left">📸 Photo</Divider>
          <Form.Item
            label="Upload Photo"
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onPreview={handlePreview}
              onChange={handleChange}
              customRequest={({ onSuccess }) =>
                setTimeout(() => onSuccess?.("ok"), 500)
              }
              maxCount={1}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>

            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={() => setPreviewOpen(false)}
            >
              <img
                alt="Preview"
                style={{
                  width: "100%",
                  objectFit: "contain",
                  maxHeight: "500px",
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>
          <Divider orientation="left">💼 Work Experience</Divider>
          {experienceFields.map((field, index) => (
            <Space
              key={field.id}
              direction="vertical"
              style={{
                display: "block",
                border: "1px solid #d9d9d9",
                padding: 16,
                marginBottom: 16,
                borderRadius: 8,
                backgroundColor: "#fafafa",
              }}
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Company"
                    name={["experience", index, "company"]}
                    rules={[
                      { required: true, message: "Please enter company name" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Position"
                    name={["experience", index, "position"]}
                    rules={[
                      { required: true, message: "Please enter position" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Period"
                    name={["experience", index, "period"]}
                  >
                    <RangePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Description"
                name={["experience", index, "description"]}
              >
                <TextArea rows={2} />
              </Form.Item>
              {experienceFields.length > 1 && (
                <Button danger onClick={() => removeExperience(field.id)}>
                  Remove Experience
                </Button>
              )}
            </Space>
          ))}
          <Button onClick={addExperience} style={{ marginBottom: 24 }}>
            + Add Experience
          </Button>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                Create Resume
              </Button>
              <Button type="default" size="large" onClick={handleGoBack}>
                Go Back Home
              </Button>
            </Space>
          </Form.Item>
        </Form>
        {generatedResume && (
          <>
            <Divider orientation="left">📄 Generated Resume</Divider>
            <TextArea value={generatedResume} rows={10} readOnly />
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
