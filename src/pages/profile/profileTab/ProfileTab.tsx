import {
  Card,
  Divider,
  Form,
  Input,
  Row,
  Col,
  Button,
  Space,
  Switch,
  Skeleton,
} from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

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
  theme,
  handleClick,
  handleSave,
  loading,
}) => {
  const [form] = Form.useForm();

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
              <Form.Item
                label="Dark Mode"
                name="darkMode"
                valuePropName="checked"
                initialValue={theme === 'dark'}
              >
                <Switch
                  checked={theme === 'dark'}
                  onChange={handleClick}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                />
              </Form.Item>
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
