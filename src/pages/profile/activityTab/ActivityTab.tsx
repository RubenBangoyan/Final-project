import { Card, Col, Row, Space, Typography } from 'antd';
import './ActivityTab.css'

const { Title, Text } = Typography;

interface ActivityTabProps {
  theme: string;
}

export const ActivityTab: React.FC<ActivityTabProps> = ({ theme }) => {
  return (
    <Card className={`activity-card ${theme}`}>
      <Title level={4} className="title">
        Recent Activity
      </Title>
      <Space direction="vertical" size="large" className="activity-timeline">
        <Row align="middle" className="timeline-item" gutter={8}>
          <Col flex="none" className="timeline-badge bg-blue-500"></Col>
          <Col flex="auto" className="timeline-content">
            <Text strong>Profile updated</Text>
            <Text className="text-gray-600">2 hours ago</Text>
          </Col>
        </Row>
        <Row align="middle" className="timeline-item">
          <Col flex="none" className="timeline-badge bg-green-500"></Col>
          <Col flex="auto" className="timeline-content">
            <Text strong>Password changed</Text>
            <Text className="text-gray-600">3 days ago</Text>
          </Col>
        </Row>
        <Row align="middle" className="timeline-item">
          <Col flex="none" className="timeline-badge bg-purple-500"></Col>
          <Col flex="auto" className="timeline-content">
            <Text strong>Logged in from new device</Text>
            <Text className="text-gray-600">1 week ago</Text>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};
