import { updateUserPassword } from '../../../hooks/usePasswordUpdate';
import { LockOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { SecurityTabProps, PasswordFormValues } from './types';
import './SecurityTab.css';
import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
  Button,
  notification,
} from 'antd';

const { Title, Text } = Typography;


export const SecurityTab: React.FC<SecurityTabProps> = ({ profile, theme }) => {
  async function handleSubmit(values: PasswordFormValues) {
    try {
      await updateUserPassword(values.newPassword);
      notification.success({ message: 'Password updated successfully' });
    } catch (error: any) {
      notification.error({
        message: 'Error updating password',
        description: error.message,
      });
    }
  }

  return (
    <Card className={`security-card security-container ${theme}`}>
      <Title level={3} className="security-title">
        Password Settings
      </Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col xs={24} md={10}>
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                { required: true, message: 'Please enter current password' },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} size="large" />
            </Form.Item>
          </Col>

          <Col xs={24} md={10}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[{ required: true, message: 'Please confirm password' }]}
            >
              <Input.Password prefix={<LockOutlined />} size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} md={10}>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please enter new password' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item label="&nbsp;">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                block
                className="update-button"
              >
                Update Password
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider />

      <Title level={4} className="security-title">
        Login Activity
      </Title>
      <Card className="login-activity">
        <Row align="middle" className="mb-4">
          <Col flex="none">
            <ClockCircleOutlined className="text-lg mr-3 text-gray-500" />
          </Col>
          <Col flex="auto">
            <Text strong>Last login</Text>
            <Text className="block text-gray-600">
              {new Date(profile?.lastLogin || '').toLocaleString()}
            </Text>
          </Col>
        </Row>
        <Button type="link" className="pl-0">
          View all activity
        </Button>
      </Card>
    </Card>
  );
};
