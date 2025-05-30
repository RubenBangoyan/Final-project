import { Card, Col, Divider, Form, Input, Row, Typography, Button } from 'antd';
import { LockOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface SecurityTabProps {
  profile: any;
}

export const SecurityTab: React.FC<SecurityTabProps> = ({ profile }) => {
  return (
    <Card className="shadow-lg rounded-xl border-0">
      <Title level={4} className="mb-6">
        Password Settings
      </Title>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col xs={24} md={12}>
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
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
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
          <Col xs={24} md={12}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Button type="primary" size="large">
          Update Password
        </Button>
      </Form>
      <Divider />
      <Title level={4} className="mb-6">
        Login Activity
      </Title>
      <Card className="p-4 bg-gray-50 rounded-lg">
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
