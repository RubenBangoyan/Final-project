import { FavoriteJobTab } from './favoriteJobTab/FavoriteJobTab';
import { ProfileHeader } from './profileHeader/ProfileHeader';
import { SecurityTab } from './securityTab/SecurityTab';
import { ActivityTab } from './activityTab/ActivityTab';
import { useTheme } from '../../contexts/ThemeContext';
import { ProfileTab } from './profileTab/ProfileTab';
import { useProfile } from '../../hooks/useProfile';
import type { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hook';
import { MyJobsTab } from './myJobTab/MyJobTab';
import ResumeTab from './resumeTab/ResumeTab';
import { Tabs, Row, Col, Skeleton } from 'antd';
import React from 'react';
import './Profile.css';

const ProfilePage: React.FC = () => {
  const { theme, handleClick } = useTheme();
  const { profile, loading, handleSave } = useProfile();

  const currentUserId = useAppSelector((state) => state.user.id);
  const { name, surname, email } = useAppSelector(
    (state: RootState) => state.user
  );

  if (!profile) {
  return (
    <div
      className={`profile-page ${
        theme === 'dark' ? 'profile-dark' : 'profile-light'
      }`}
    >
      <Row className="container mx-auto px-4 py-8">
        <Col span={24}>
          <div className="profile-header-skeleton" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
            <Skeleton.Avatar active size={100} shape="circle" />
            <div style={{ flex: 1 }}>
              <Skeleton.Input active size="default" style={{ width: 200, marginBottom: 8 }} />
              <Skeleton.Input active size="small" style={{ width: 150, marginBottom: 8 }} />
              <Skeleton.Input active size="small" style={{ width: 180 }} />
            </div>
          </div>

          <Skeleton.Button active style={{ width: 120, marginBottom: 24 }} />

          <Tabs
            defaultActiveKey="1"
            className="custom-tabs"
            items={[
              {
                key: '1',
                label: 'Profile',
                children: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <Skeleton.Input active style={{ width: 300 }} />
                    <Skeleton.Input active style={{ width: 300 }} />
                    <Skeleton.Input active style={{ width: 300 }} />
                    <div style={{ display: 'flex', gap: 12 }}>
                      <Skeleton.Button active style={{ width: 120 }} />
                      <Skeleton.Button active style={{ width: 120 }} />
                      <Skeleton.Button active style={{ width: 150 }} />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}



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
      children: <MyJobsTab currentUserId={currentUserId} theme={theme} />,
    },
    {
      key: '3',
      label: 'Favorite Jobs',
      children: <FavoriteJobTab currentUserId={currentUserId} theme={theme} />,
    },
    {
      key: '4',
      label: 'Security',
      children: <SecurityTab profile={profile} theme={theme} />,
    },
    {
      key: '5',
      label: 'Activity',
      children: <ActivityTab theme={theme} />,
    },
    {
      key: '6',
      label: 'Resume',
      children: <ResumeTab theme={theme} />,
    },
  ];

  return (
    <div
      className={`profile-page ${
        theme === 'dark' ? 'profile-dark' : 'profile-light'
      }`}
    >
      <Row className="container mx-auto px-4 py-8">
        <Col span={24}>
          <ProfileHeader
            theme={theme}
            loading={loading}
            profile={profile}
            email={email}
          />
          <Tabs defaultActiveKey="1" className="custom-tabs" items={tabItems} />
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
