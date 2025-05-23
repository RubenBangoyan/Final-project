import { Form, Input, Select, Button, InputNumber } from 'antd';
import { doc, setDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { auth } from '../../services/firebse-config';
import { db } from '../../services/firebse-config';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';

const { Option } = Select;

interface OfferingWorkFormValues {
  companyName: string;
  aboutCompany?: string;
  companyWebsite?: string;
  position: string;
  category?: string; // Добавлено поле для категории работы
  level?: 'intern' | 'junior' | 'mid' | 'senior' | 'lead';
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
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.user.id);

  const onFinish = async (values: OfferingWorkFormValues) => {
    console.log(values, 'values');
    try {
      const dataToSave = {
        ...values,
        ownerID: id,
        createdAt: serverTimestamp(),
      };

      if (!id) {
        console.error('ID is null. Cannot create document.');
        return;
      }

      await setDoc(doc(db, 'jobs', id), dataToSave);
      console.log('Данные успешно сохранены!');
      navigate('/');
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="companyName"
        label="Company Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="aboutCompany" label="About the Company">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item name="companyWebsite" label="Company Website">
        <Input placeholder="https://example.com" />
      </Form.Item>

      <Form.Item
        name="position"
        label="Open Position"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="Job Category"
        rules={[{ required: true, message: 'Please select a job category' }]}
      >
        <Select placeholder="Select job category">
          <Option value="softwareDevelopment">Software Development</Option>
          <Option value="designCreative">Design & Creative</Option>
          <Option value="marketingSales">Marketing & Sales</Option>
          <Option value="dataScience">Data Science</Option>
          <Option value="customerSupport">Customer Support</Option>
          <Option value="education">Education</Option>
          <Option value="productManagement">Product Management</Option>
          <Option value="hrRecruiting">HR & Recruiting</Option>
          <Option value="legal">Legal</Option>
          <Option value="engineering">Engineering</Option>
          <Option value="finance">Finance</Option>
          <Option value="others">Others</Option>
        </Select>
      </Form.Item>

      <Form.Item name="level" label="Position Level">
        <Select placeholder="Select level">
          <Option value="intern">Intern</Option>
          <Option value="junior">Junior</Option>
          <Option value="mid">Mid</Option>
          <Option value="senior">Senior</Option>
          <Option value="lead">Lead</Option>
        </Select>
      </Form.Item>

      <Form.Item name="technologies" label="Technology Stack">
        <Select mode="tags" placeholder="e.g. React, Node.js, SQL">
          {/* Пользователь может добавлять теги вручную */}
        </Select>
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

      <Form.Item name="location" label="Location (Office / Remote)">
        <Input placeholder="Moscow / remote / hybrid" />
      </Form.Item>

      <Form.Item label="Salary From (USD)" name="salaryFrom">
        <InputNumber min={0} step={100} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Salary To (USD)" name="salaryTo">
        <InputNumber min={0} step={100} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="requirements" label="Candidate Requirements">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="contactEmail"
        label="Contact Email"
        rules={[{ type: 'email', required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="telegram" label="Telegram or Other Contact">
        <Input placeholder="@yourtelegram" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UploadWork;
