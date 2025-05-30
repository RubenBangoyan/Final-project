import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { auth, db } from "../../services/firebse-config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Switch,
  Tabs,
  Typography,
  message,
  Descriptions,
  Badge,
  Progress,
  Modal,
  Spin,
  Empty,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import "./Profile.css";
import { useTheme } from "../../contexts/ThemeContext";
import { useAppSelector } from "../../app/hook";
import JobCard from "../../components/jobCard/JobCard";
import type { Job } from "../../components/jobCard/types/types";
import { getAllJobs } from "../../components/jobCard/JobService";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const { theme, handleClick } = useTheme();
  const navigate = useNavigate();
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
        const docRef = doc(db, "users", user.uid);
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
          console.log("No user profile found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        message.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const [form] = Form.useForm();

  const { name, surname, email } = useSelector(
    (state: RootState) => state.user
  );

  const handleSave = async (values: any) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        firstName: values.firstName,
        lastName: values.lastName,
      });

      setProfile((prev) => ({
        ...prev,
        firstName: values.firstName,
        lastName: values.lastName,
      }));

      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    }
  };

  const showDeleteConfirm = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalVisible(false);
    message.warning("Account deletion is not implemented yet.");
  };

  if (loading) {
    return (
      <div className="container flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  const myJobs = jobs.filter((job) => job.ownerID === currentUserId);

  return (
    <div
      className={`container mx-auto px-4 py-8 transition-all duration-300 ${
        theme === "dark" ? "dark-theme" : "light-theme"
      }`}
    >
      <Card className="shadow-lg rounded-xl mb-6 border-0">
        <div className="profile-header bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-xl">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} sm={8} className="text-center">
              <Badge offset={[-10, 90]}>
                <Avatar
                  size={128}
                  src={profile?.avatar}
                  icon={<UserOutlined />}
                  className="border-4 border-white shadow-lg"
                />
              </Badge>
              {avatarLoading && (
                <div className="mt-2">
                  <Progress percent={50} status="active" showInfo={false} />
                </div>
              )}
            </Col>

            <Col xs={24} sm={16}>
              <Title level={2} className="text-white mb-1">
                {profile?.firstName} {profile?.lastName}
              </Title>
              <Text className="text-white text-lg block mb-2">{email}</Text>
              <div className="flex flex-wrap gap-4 mt-4"></div>
            </Col>
          </Row>
        </div>

        <div className="p-6">
          <Descriptions bordered column={{ xs: 1, sm: 2 }}>
            <Descriptions.Item label="Joined Date">
              {new Date(profile?.joinDate || "").toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Last Login">
              {new Date(profile?.lastLogin || "").toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge status="success" text="Active" />
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Card>

      <Tabs defaultActiveKey="1" className="custom-tabs">
        <TabPane
          tab={
            <span>
              <UserOutlined />
              Profile
            </span>
          }
          key="1"
        >
          <Card className="shadow-lg rounded-xl border-0">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              initialValues={{
                firstName: profile?.firstName || name || "",
                lastName: profile?.lastName || surname || "",
                email: email || "",
              }}
            >
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      { required: true, message: "Please enter first name" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="text-gray-400" />}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      { required: true, message: "Please enter last name" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="text-gray-400" />}
                      size="large"
                    />
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
                        type: "email",
                        message: "Enter a valid email",
                      },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="text-gray-400" />}
                      size="large"
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Dark Mode"
                    name="darkMode"
                    valuePropName="checked"
                    initialValue={theme === "dark"}
                  >
                    <Switch
                      checked={theme === "dark"}
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
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="px-6"
                    >
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
        </TabPane>

        <TabPane
          tab={
            <span>
              <CloudUploadOutlined />
              My Jobs
            </span>
          }
          key="2"
        >
          <Card
            className="shadow-lg rounded-xl border-0"
            style={{ marginBottom: 24 }}
          >
            <Title level={4}>My Uploaded Jobs:</Title>
          </Card>

          {loading ? (
            <Spin tip="Loading..." size="large">
              <div style={{ height: "200px" }} />
            </Spin>
          ) : myJobs.length === 0 ? (
            <Empty
              className={theme === "dark" ? "empty-dark" : "empty-light"}
              description="You have not posted any jobs."
            />
          ) : (
            <Row gutter={[16, 16]}>
              {myJobs.map((job) => (
                <Col key={job.id} xs={24} sm={12} md={8} lg={6}>
                  <JobCard job={job} />
                </Col>
              ))}
            </Row>
          )}
        </TabPane>

        <TabPane
          tab={
            <span>
              <SafetyOutlined />
              Security
            </span>
          }
          key="3"
        >
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
                        message: "Please enter current password",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      { required: true, message: "Please enter new password" },
                      {
                        min: 6,
                        message: "Password must be at least 6 characters",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    rules={[
                      { required: true, message: "Please confirm password" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />

              <Button type="primary" size="large" className="px-6">
                Update Password
              </Button>
            </Form>

            <Divider />

            <Title level={4} className="mb-6">
              Login Activity
            </Title>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <ClockCircleOutlined className="text-lg mr-3 text-gray-500" />
                <div>
                  <Text strong>Last login</Text>
                  <Text className="block text-gray-600">
                    {new Date(profile?.lastLogin || "").toLocaleString()}
                  </Text>
                </div>
              </div>
              <Button type="link" className="pl-0">
                View all activity
              </Button>
            </div>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <ClockCircleOutlined />
              Activity
            </span>
          }
          key="4"
        >
          <Card className="shadow-lg rounded-xl border-0">
            <Title level={4} className="mb-6">
              Recent Activity
            </Title>
            <div className="activity-timeline">
              <div className="timeline-item">
                <div className="timeline-badge bg-blue-500"></div>
                <div className="timeline-content">
                  <Text strong>Profile updated</Text>
                  <Text className="block text-gray-600">2 hours ago</Text>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-badge bg-green-500"></div>
                <div className="timeline-content">
                  <Text strong>Password changed</Text>
                  <Text className="block text-gray-600">3 days ago</Text>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-badge bg-purple-500"></div>
                <div className="timeline-content">
                  <Text strong>Logged in from new device</Text>
                  <Text className="block text-gray-600">1 week ago</Text>
                </div>
              </div>
            </div>
          </Card>
        </TabPane>
      </Tabs>

      <Card className="shadow-lg rounded-xl border-0 mt-6">
        <Title level={4} className="mb-4">
          Quick Actions
        </Title>
        <Space size="large">
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            size="large"
            onClick={() => navigate(ROUTES.UPLOAD_WORK)}
          >
            Upload Work
          </Button>
          <Button
            type="default"
            size="large"
            onClick={() => navigate(ROUTES.RESUME_PATH)}
          >
            Generate Resume
          </Button>
        </Space>
      </Card>

      <Modal
        title="Confirm Account Deletion"
        open={isDeleteModalVisible}
        onOk={handleDeleteAccount}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ type: "text" }}
      >
        <Text>
          Are you sure you want to delete your account? This action cannot be
          undone. All your data will be permanently removed.
        </Text>
      </Modal>
    </div>
  );
};

export default ProfilePage;
