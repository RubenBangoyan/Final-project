import { Form, Input, Select, Button, InputNumber, Switch } from 'antd';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebse-config';
import { useNavigate } from 'react-router-dom';
// import { auth } from 'firebase/auth';
import { auth } from '../../services/firebse-config';

const { Option } = Select;

interface LookingWorkFormValues {
  fullName: string;
  age?: number;
  profession: string;
  skills?: string[];
  experience?: 'no' | 'junior' | 'mid' | 'senior';
  englishLevel?: string;
  relocation?: boolean;
  employmentType?: string[];
  salaryExpectations?: number;
  location?: string;
  portfolio?: string;
  linkedin?: string;
  about?: string;
}

const LookingWorkFormStep = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const currentUser = auth.currentUser;

  const onFinish = async (values: LookingWorkFormValues) => {
    try {
      const dataToSave = {
        ...values,
        createdAt: serverTimestamp(), // для сортировки по дате
        role: 'looking', // если ты различаешь пользователей
        userId: currentUser?.uid || null, // если используешь Firebase Auth
      };

      await addDoc(collection(db, 'jobSeekers'), dataToSave);
      navigate('/');
      console.log('Данные успешно сохранены!');
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="age" label="Age">
        <InputNumber min={16} max={100} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="profession"
        label="Desired Profession"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="skills" label="Skills">
        <Select mode="tags" placeholder="Enter your skills (React, Node.js...)">
          {/* User can enter tags manually */}
        </Select>
      </Form.Item>

      <Form.Item name="experience" label="Work Experience">
        <Select placeholder="Select your level">
          <Option value="no">No experience</Option>
          <Option value="junior">Junior</Option>
          <Option value="mid">Mid</Option>
          <Option value="senior">Senior</Option>
        </Select>
      </Form.Item>

      <Form.Item name="englishLevel" label="English Level">
        <Select placeholder="Select your level">
          <Option value="none">No English</Option>
          <Option value="basic">Basic</Option>
          <Option value="intermediate">Intermediate</Option>
          <Option value="advanced">Advanced</Option>
          <Option value="fluent">Fluent</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="relocation"
        label="Willing to Relocate"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item name="employmentType" label="Employment Type">
        <Select mode="multiple" placeholder="Select options">
          <Option value="fulltime">Full-time</Option>
          <Option value="parttime">Part-time</Option>
          <Option value="remote">Remote</Option>
          <Option value="freelance">Freelance</Option>
          <Option value="internship">Internship</Option>
        </Select>
      </Form.Item>

      <Form.Item name="salaryExpectations" label="Expected Salary (USD)">
        <InputNumber min={0} step={100} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="location" label="Location">
        <Input />
      </Form.Item>

      <Form.Item name="portfolio" label="Portfolio / GitHub Link">
        <Input placeholder="https://..." />
      </Form.Item>

      <Form.Item name="linkedin" label="LinkedIn (if any)">
        <Input placeholder="https://linkedin.com/in/..." />
      </Form.Item>

      <Form.Item name="about" label="About You">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LookingWorkFormStep;
