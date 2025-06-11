import { Avatar, Badge, Skeleton, Typography, Card } from 'antd';
import type { ProfileHeaderProps } from './types';
import { UserOutlined } from '@ant-design/icons';
import './ProfileHeader.css';
import React from 'react';

const { Title, Text } = Typography;

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  loading,
  profile,
  email,
  theme,
}) => (
  <div className={`profile-header-container ${theme}`}>
    <Card className="profile-card">
      {loading ? (
        <Skeleton avatar paragraph={{ rows: 3 }} />
      ) : (
        <div className="profile-layout">
          <div className="avatar-col">
            <Avatar
              size={128}
              src={
                profile?.avatarSeed
                  ? `https://api.dicebear.com/7.x/micah/svg?seed=${profile.avatarSeed}&mouth=smile&baseColor=f9c9b6&facialHairProbability=0&hairColor=000000,6bd9e9,9287ff`
                  : undefined
              }
              icon={!profile?.avatarSeed ? <UserOutlined /> : undefined}
              className="avatar-img"
            />
          </div>

          <div className="info-col">
            <Title level={2} className="user-name">
              {profile?.firstName} {profile?.lastName}
            </Title>
            <Text className="user-email">{email}</Text>
            <div className="profile-meta">
              <Text strong>Joined Date:</Text>{' '}
              <Text>
                {new Date(profile?.joinDate || '').toLocaleDateString()}
              </Text>
            </div>
            <div className="profile-meta">
              <Text strong>Last Login:</Text>{' '}
              <Text>{new Date(profile?.lastLogin || '').toLocaleString()}</Text>
            </div>
            <div className="profile-meta">
              <Text strong>Status:</Text>{' '}
              <Badge status="success" text="Active" />
            </div>
          </div>
        </div>
      )}
    </Card>
  </div>
);
