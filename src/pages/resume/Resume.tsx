import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generateResumeFromGPT } from '../../api';
import { formatResumePrompt } from '../../utils';
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
} from 'antd';
import './Resume.css';

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

  const addExperience = () => {
    setExperienceFields([...experienceFields, { id: uuidv4() }]);
  };

  const removeExperience = (id: string) => {
    setExperienceFields(experienceFields.filter((field) => field.id !== id));
  };

  // function handleCreateResume(values: {}) {
  //   console.log(values);
  // }

  async function handleCreateResume(values: any) {
    const prompt = formatResumePrompt(values);
    try {
      const result = await generateResumeFromGPT(prompt);
      console.log('Generated Resume:', result);
      setGeneratedResume(result);

      // покажи результат на экране, сохрани в стейт или скачай
    } catch (err) {
      console.error('Error generating resume:', err);
    }
  }

  return (
    <div className="resume-container">
      <div className="resume-scroll">
        <Form
          form={form}
          layout="vertical"
          style={{ width: '100%' }}
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
                  { required: true, message: 'Please enter your first name' },
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
                  { required: true, message: 'Please enter your last name' },
                ]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Date of Birth" name="birthdate">
                <DatePicker style={{ width: '100%' }} />
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
                    type: 'email',
                    message: 'Please enter a valid email address',
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
            <Upload listType="picture-card" beforeUpload={() => false}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Divider orientation="left">💼 Work Experience</Divider>
          {experienceFields.map((field, index) => (
            <Space
              key={field.id}
              direction="vertical"
              style={{
                display: 'block',
                border: '1px solid #d9d9d9',
                padding: 16,
                marginBottom: 16,
                borderRadius: 8,
                backgroundColor: '#fafafa',
              }}
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Company"
                    name={['experience', index, 'company']}
                    rules={[
                      { required: true, message: 'Please enter company name' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Position"
                    name={['experience', index, 'position']}
                    rules={[
                      { required: true, message: 'Please enter position' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Period"
                    name={['experience', index, 'period']}
                  >
                    <RangePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Description"
                name={['experience', index, 'description']}
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
            <Button type="primary" htmlType="submit" size="large">
              Create Resume
            </Button>
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
