import { Form, Input, Select, Button, InputNumber, Modal } from 'antd';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebse-config';
import { useAppSelector } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import { ROUTES } from '../../routes/paths';
import { v4 as uuid } from 'uuid';

const { Option } = Select;

interface OfferingWorkFormValues {
  companyName: string;
  aboutCompany?: string;
  companyWebsite?: string;
  position: string;
  category?: string;
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
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.user.id);
  const unicID = uuid();

  const cleanObject = (obj: Record<string, any>) =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

  const onFinish = async (values: OfferingWorkFormValues) => {
    try {
      if (!id) {
        console.error('User ID is null. Cannot create document.');
        return;
      }

      const cleanedValues = cleanObject(values);


      const expiresAt = Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

      const dataToSave = {
        ...cleanedValues,
        ownerID: id,
        createdAt: serverTimestamp(),
        appliedUsers: [],
        expiresAt: expiresAt,
      };

      await setDoc(doc(db, 'jobs', unicID), dataToSave);
      console.log('Job successfully saved with ID:', unicID);

      navigate(ROUTES.HOME_PATH);
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

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
    <div className="container">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[{ required: true, message: 'Please input company name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="aboutCompany"
          label="About the Company"
          rules={[
            {
              required: true,
              message: 'Please enter information about the company',
            },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="companyWebsite"
          label="Company Website"
          rules={[
            {
              required: true,
              message: 'Please enter the company website',
              type: 'url',
            },
          ]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item
          name="position"
          label="Open Position"
          rules={[{ required: true, message: 'Please input position' }]}
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
            <Option value="InfrastructureDevOps">Infrastructure / DevOps</Option>
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

        <Form.Item
          name="level"
          label="Position Level"
          rules={[
            { required: true, message: 'Please select a position level' },
          ]}
        >
          <Select placeholder="Select level">
            <Option value="intern">Intern</Option>
            <Option value="junior">Junior</Option>
            <Option value="mid">Mid</Option>
            <Option value="senior">Senior</Option>
            <Option value="lead">Lead</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="technologies"
          label="Technology Stack"
          rules={[
            {
              required: true,
              message: 'Please specify the required technologies',
            },
          ]}
        >
          <Select mode="tags" placeholder="e.g. React, Node.js, SQL" />
        </Form.Item>

        <Form.Item
          name="employmentType"
          label="Employment Type"
          rules={[
            {
              required: true,
              message: 'Please select at least one employment type',
            },
          ]}
        >
          <Select mode="multiple" placeholder="Select options">
            <Option value="fulltime">Full-time</Option>
            <Option value="parttime">Part-time</Option>
            <Option value="remote">Remote</Option>
            <Option value="freelance">Freelance</Option>
            <Option value="internship">Internship</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="location"
          label="Location (Office / Remote)"
          rules={[{ required: true, message: 'Please enter the job location' }]}
        >
          <Input placeholder="Moscow / remote / hybrid" />
        </Form.Item>

        <Form.Item
          label="Salary From (USD)"
          name="salaryFrom"
          rules={[
            { required: true, message: 'Please enter the minimum salary' },
          ]}
        >
          <InputNumber min={0} step={100} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Salary To (USD)"
          name="salaryTo"
          rules={[
            { required: true, message: 'Please enter the maximum salary' },
          ]}
        >
          <InputNumber min={0} step={100} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="requirements"
          label="Candidate Requirements"
          rules={[
            {
              required: true,
              message: 'Please specify the candidate requirements',
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="contactEmail"
          label="Contact Email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input a valid email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="telegram"
          label="Telegram or Other Contact"
          rules={[
            {
              required: true,
              message: 'Please enter your Telegram or another contact',
            },
          ]}
        >
          <Input placeholder="@yourtelegram" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>{' '}
          <Button type="default" onClick={handleGoBack}>
            Go Back Home
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadWork;
