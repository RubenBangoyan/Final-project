import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { ROUTES } from '../../../routes/paths';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Divider,
  Form,
  Input,
  Row,
  Col,
  Button,
  Space,
  Skeleton,
} from 'antd';

interface ProfileTabProps {
  profile: any;
  name: string | null;
  surname: string | null;
  email: string | null;
  theme: string;
  handleClick: () => void;
  handleSave: (values: any) => void;
  loading: boolean | undefined;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profile,
  name,
  surname,
  email,
  handleSave,
  loading,
}) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  return (
    <Skeleton active loading={loading}>
      <Card className="shadow-lg rounded-xl border-0">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            firstName: profile?.firstName || name || '',
            lastName: profile?.lastName || surname || '',
            email: email || '',
          }}
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input prefix={<UserOutlined />} size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input prefix={<UserOutlined />} size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Enter a valid email',
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} size="large" disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Row>
                <Col
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '33px',
                  }}
                >
                  <Button
                    onClick={() => navigate(ROUTES.UPLOAD_WORK)}
                    type="primary"
                    style={{ marginRight: '40px' }}
                  >
                    Upload Work
                  </Button>
                  <Button
                    onClick={() => navigate(ROUTES.RESUME_PATH)}
                    type="primary"
                  >
                    Generate Resume
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row justify="space-between">
            <Col>
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  Save Changes
                </Button>
                <Button size="large" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </Skeleton>
  );
};
