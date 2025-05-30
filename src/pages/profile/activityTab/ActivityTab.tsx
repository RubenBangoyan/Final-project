import { Card, Col, Row, Space, Typography } from 'antd';

const { Title, Text } = Typography;

export const ActivityTab: React.FC = () => {
  return (
    <Card className="shadow-lg rounded-xl border-0">
      <Title level={4} className="mb-6">
        Recent Activity
      </Title>
      <Space direction="vertical" size="large" className="activity-timeline">
        <Row align="middle" className="timeline-item">
          <Col flex="none" className="timeline-badge bg-blue-500"></Col>
          <Col flex="auto" className="timeline-content">
            <Text strong>Profile updated</Text>
            <Text className="block text-gray-600">2 hours ago</Text>
          </Col>
        </Row>
        <Row align="middle" className="timeline-item">
          <Col flex="none" className="timeline-badge bg-green-500"></Col>
          <Col flex="auto" className="timeline-content">
            <Text strong>Password changed</Text>
            <Text className="block text-gray-600">3 days ago</Text>
          </Col>
        </Row>
        <Row align="middle" className="timeline-item">
          <Col flex="none" className="timeline-badge bg-purple-500"></Col>
          <Col flex="auto" className="timeline-content">
            <Text strong>Logged in from new device</Text>
            <Text className="block text-gray-600">1 week ago</Text>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};
