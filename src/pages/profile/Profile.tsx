import { ProfileHeader } from './profileHeader/ProfileHeader';
import { SecurityTab } from './securityTab/SecurityTab';
import { ActivityTab } from './activityTab/ActivityTab';
import { useTheme } from '../../contexts/ThemeContext';
import { ProfileTab } from './profileTab/ProfileTab';
import { useProfile } from '../../hooks/useProfile';
import type { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hook';
import { MyJobsTab } from './myJobTab/MyJobTab';
import { Tabs, Row, Col } from 'antd';
import React from 'react';
import ResumeTab from './resumeTab/ResumeTab';

const ProfilePage: React.FC = () => {
  const { theme, handleClick } = useTheme();
  const { profile, loading, handleSave } = useProfile();

  const currentUserId = useAppSelector((state) => state.user.id);
  const { name, surname, email } = useAppSelector(
    (state: RootState) => state.user
  );

  const tabItems = [
    {
      key: '1',
      label: 'Profile',
      children: (
        <ProfileTab
          loading={loading}
          name={name}
          theme={theme}
          email={email}
          surname={surname}
          profile={profile}
          handleSave={handleSave}
          handleClick={handleClick}
        />
      ),
    },
    {
      key: '2',
      label: 'My Jobs',
      children: <MyJobsTab currentUserId={currentUserId} />,
    },
    {
      key: '3',
      label: 'Security',
      children: <SecurityTab profile={profile} />,
    },
    {
      key: '4',
      label: 'Activity',
      children: <ActivityTab />,
    },
    {
      key: '5',
      label: 'Resume',
      children: <ResumeTab />,
    },
  ];

  return (
    <Row className="container mx-auto px-4 py-8">
      <Col span={24}>
        <ProfileHeader loading={loading} profile={profile} email={email} />
        <Tabs defaultActiveKey="1" className="custom-tabs" items={tabItems} />
      </Col>
    </Row>
  );
};

export default ProfilePage;
