import {
  Avatar,
  Badge,
  Col,
  Descriptions,
  Row,
  Skeleton,
  Typography,
  Card,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';

const { Title, Text } = Typography;

interface ProfileHeaderProps {
  loading: boolean;
  profile: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    joinDate?: string;
    lastLogin?: string;
  } | null;
  email?: string | null;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  loading,
  profile,
  email,
}) => (
  <Card className="shadow-lg rounded-xl mb-6 border-0">
    <Row className="profile-header bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-xl">
      <Row gutter={[24, 24]} align="middle" style={{ width: '100%' }}>
        <Col xs={24} sm={8} className="text-center">
          <Badge offset={[-10, 90]}>
            {loading ? (
              <Skeleton.Avatar active size={128} shape="circle" />
            ) : (
              <Avatar
                size={128}
                src={profile?.avatar}
                icon={<UserOutlined />}
                className="border-4 border-white shadow-lg"
              />
            )}
          </Badge>
        </Col>
        <Col xs={24} sm={16}>
          {loading ? (
            <>
              <Skeleton.Input active style={{ width: 200, height: 32 }} />
              <Skeleton.Input active style={{ width: 250 }} />
            </>
          ) : (
            <>
              <Title level={2} className="text-white mb-1">
                {profile?.firstName} {profile?.lastName}
              </Title>
              <Text className="text-white text-lg block mb-2">{email}</Text>
            </>
          )}
        </Col>
      </Row>
    </Row>

    <Row className="p-6">
      {loading ? (
        <Skeleton active paragraph={{ rows: 2 }} />
      ) : (
        <Descriptions bordered column={{ xs: 1, sm: 2 }}>
          <Descriptions.Item label="Joined Date">
            {new Date(profile?.joinDate || '').toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Last Login">
            {new Date(profile?.lastLogin || '').toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Badge status="success" text="Active" />
          </Descriptions.Item>
        </Descriptions>
      )}
    </Row>
  </Card>
);
