import ConfettiExplosion from '../../components/confettiExplosion/ConfettiExplosion';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { formatResumePrompt } from '../../utils/resumeFormat';
import { db } from '../../services/firebse-config';
import { generateResumeFromGPT } from '../../api';
import { useAppSelector } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';
import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Resume.css';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Space,
  Divider,
  Row,
  Col,
  Modal,
  Typography,
  List,
} from 'antd';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Title, Paragraph, Text } = Typography;

interface Resume {
  contactInfo: any;
  name: string;
  phone: string;
  education: string;
  experience?: {
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
  skills?: string[];
  languages?: string[];
  profile?: string;
}

const ResumeForm: React.FC = () => {
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);
  const [experienceFields, setExperienceFields] = useState([{ id: uuidv4() }]);
  const [parsedResume, setParsedResume] = useState<Resume | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const id = useAppSelector((state) => state.user.id);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

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
      const cleanResult = result.replace(/```json|```/g, '').trim();
      const parsedResume = JSON.parse(cleanResult);
      console.log(parsedResume, 'parsed');
      setParsedResume(parsedResume);

      if (!id) {
        console.log('id Not Found'); // write after
        return;
      }

      const docRef = doc(db, 'resume', id);

      await setDoc(docRef, {
        ...parsedResume,
        createdAt: serverTimestamp(),
        ownerID: id,
      });

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      setGeneratedResume(result);
      console.log('Resume saved to Firestore.');
    } catch (err) {
      console.error('Error generating/saving resume:', err);
    }
  }

  const handleGoBack = () => {
    Modal.confirm({
      title: 'Discard Form?',
      content:
        'Are you sure you want to go back? All entered data will be lost.',
      okText: 'Yes, go back',
      cancelText: 'Cancel',
      onOk: () => navigate(ROUTES.HOME_PATH),
    });
  };

  return (
    <div className="container resume-container">
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

        <div ref={resultRef}>
          {parsedResume ? (
            <div style={{ padding: '12px' }}>
              <Title level={4} style={{ marginBottom: 4 }}>
                {parsedResume?.contactInfo?.name}{' '}
                {parsedResume?.contactInfo?.lastName}
              </Title>
              <Text type="secondary">{parsedResume?.contactInfo?.email}</Text>
              <br />
              <Text type="secondary">
                📞 {parsedResume?.contactInfo?.phone} | 📍{' '}
                {parsedResume?.contactInfo?.city}
              </Text>
              <Divider />
              <Title level={5}>Profile</Title>
              <Paragraph>
                {typeof parsedResume?.profile === 'string' &&
                parsedResume.profile.trim()
                  ? parsedResume.profile
                  : 'No profile summary provided.'}
              </Paragraph>
              <Divider />
              <Title level={5}>Experience</Title>
              {parsedResume?.experience?.length ? (
                <List
                  dataSource={parsedResume.experience}
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
                              {new Date(exp.startDate).toLocaleDateString()} -{' '}
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
              {parsedResume?.skills?.length ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {parsedResume.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: '#f0f0f0',
                        padding: '4px 10px',
                        borderRadius: '20px',
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
              {parsedResume?.languages?.length ? (
                <ul style={{ paddingLeft: '1.2rem' }}>
                  {parsedResume.languages.map((lang, i) => (
                    <li key={i}>{lang}</li>
                  ))}
                </ul>
              ) : (
                <Paragraph type="secondary">No languages listed.</Paragraph>
              )}
            </div>
          ) : (
            <TextArea value={generatedResume || ''} rows={10} readOnly />
          )}
        </div>
      </div>
      {showConfetti && <ConfettiExplosion />}
    </div>
  );
};

export default ResumeForm;
