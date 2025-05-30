import { getAllJobs } from '../../components/jobCard/JobService';
import type { Job } from '../../components/jobCard/types/types';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebse-config';
import { useTheme } from '../../contexts/ThemeContext';
import JobCard from '../../components/jobCard/JobCard';
import React, { useEffect, useState } from 'react';
import type { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hook';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Form,
  Input,
  Modal,
  Progress,
  Row,
  Skeleton,
  Space,
  Switch,
  Tabs,
  Typography,
  message,
} from 'antd';

import {
  ClockCircleOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  LockOutlined,
  MailOutlined,
  SafetyOutlined,
  UserOutlined,
} from '@ant-design/icons';

import './Profile.css';

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { theme, handleClick } = useTheme();
  const [jobs, setJobs] = useState<Job[]>([]);
  const currentUserId = useAppSelector((state) => state.user.id);

  const [profile, setProfile] = useState<{
    firstName?: string;
    lastName?: string;
    avatar?: string;
    joinDate?: string;
    lastLogin?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [avatarLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { name, surname, email } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    setLoading(true);
    getAllJobs()
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            firstName: data.firstName,
            lastName: data.lastName,
            avatar: data.avatar,
            joinDate: data.joinDate || new Date().toISOString(),
            lastLogin: data.lastLogin || new Date().toISOString(),
          });
        } else {
          console.log('No user profile found!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        message.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleSave = async (values: any) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        firstName: values.firstName,
        lastName: values.lastName,
      });

      setProfile((prev) => ({
        ...prev,
        firstName: values.firstName,
        lastName: values.lastName,
      }));

      message.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile');
    }
  };

  const showDeleteConfirm = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalVisible(false);
    message.warning('Account deletion is not implemented yet.');
  };

  const myJobs = jobs.filter((job) => job.ownerID === currentUserId);

  const tabItems = [
    {
      key: '1',
      label: (
        <Space>
          <UserOutlined />
          Profile
        </Space>
      ),
      children: (
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
                  rules={[
                    { required: true, message: 'Please enter first name' },
                  ]}
                >
                  <Input prefix={<UserOutlined />} size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: 'Please enter last name' },
                  ]}
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
              <Col>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  size="large"
                  onClick={showDeleteConfirm}
                >
                  Delete Account
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      ),
    },
    {
      key: '2',
      label: (
        <Space>
          <CloudUploadOutlined />
          My Jobs
        </Space>
      ),
      children: (
        <>
          <Card className="shadow-lg rounded-xl border-0 mb-4">
            <Title level={4}>My Uploaded Jobs:</Title>
          </Card>

          {myJobs.length === 0 ? (
            <Empty description="You have not posted any jobs." />
          ) : (
            <Row gutter={[16, 16]}>
              {myJobs.map((job) => (
                <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
                  <JobCard job={job} />
                </Col>
              ))}
            </Row>
          )}
        </>
      ),
    },
    {
      key: '3',
      label: (
        <Space>
          <SafetyOutlined />
          Security
        </Space>
      ),
      children: (
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
                    {
                      required: true,
                      message: 'Please enter current password',
                    },
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
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters',
                    },
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
                        return Promise.reject(
                          new Error('Passwords do not match!')
                        );
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
      ),
    },
    {
      key: '4',
      label: (
        <Space>
          <ClockCircleOutlined />
          Activity
        </Space>
      ),
      children: (
        <Card className="shadow-lg rounded-xl border-0">
          <Title level={4} className="mb-6">
            Recent Activity
          </Title>
          <Space
            direction="vertical"
            size="large"
            className="activity-timeline"
          >
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
      ),
    },
  ];

  return (
    <Row className="container mx-auto px-4 py-8">
      <Col span={24}>
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
                {avatarLoading && (
                  <Row className="mt-2">
                    <Progress percent={50} status="active" showInfo={false} />
                  </Row>
                )}
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
                    <Text className="text-white text-lg block mb-2">
                      {email}
                    </Text>
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

        <Tabs defaultActiveKey="1" className="custom-tabs" items={tabItems} />

        <Modal
          title="Delete Account"
          open={isDeleteModalVisible}
          onOk={handleDeleteAccount}
          onCancel={() => setIsDeleteModalVisible(false)}
          okText="Delete"
          okButtonProps={{ danger: true }}
        >
          <Text>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Text>
        </Modal>
      </Col>
    </Row>
  );
};

export default ProfilePage;
