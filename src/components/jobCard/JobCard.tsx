import { Card, Tag, Typography, Row, Col } from 'antd';
import type { Job } from './types/types';
import type { FC } from 'react';
import {
  EnvironmentOutlined,
  DollarOutlined,
  UserOutlined,
  ToolOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

interface JobCardProps {
  job: Job;
}

const JobCard: FC<JobCardProps> = ({ job }) => (
  <Card
    hoverable
    title={`${job.position} @ ${job.companyName}`}
    style={{ marginBottom: 16 }}
  >
    <Row gutter={[12, 8]}>
      <Col span={24}>
        <Text strong>
          <EnvironmentOutlined /> Location:
        </Text>{' '}
        {job.location}
      </Col>
      <Col span={24}>
        <Text strong>
          <AppstoreAddOutlined /> Type:
        </Text>{' '}
        {job.employmentType.map((type) => (
          <Tag color="blue" key={type}>
            {type}
          </Tag>
        ))}
      </Col>
      <Col span={24}>
        <Text strong>
          <UserOutlined /> Level:
        </Text>{' '}
        {job.level}
      </Col>
      <Col span={24}>
        <Text strong>
          <DollarOutlined /> Salary:
        </Text>{' '}
        ${job.salaryFrom} - ${job.salaryTo}
      </Col>
      <Col span={24}>
        <Text strong>
          <ToolOutlined /> Tech:
        </Text>{' '}
        {job.technologies.map((tech) => (
          <Tag color="geekblue" key={tech}>
            {tech}
          </Tag>
        ))}
      </Col>
    </Row>
  </Card>
);

export default JobCard;
