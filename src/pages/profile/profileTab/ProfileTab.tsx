import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { ROUTES } from '../../../routes/paths';
import { useNavigate } from 'react-router-dom';
import { avatarSeeds } from './avatarSeeds';
import './ProfileTab.css';
import {
  Divider,
  Form,
  Input,
  Row,
  Col,
  Button,
  Space,
  Skeleton,
  Popover,
} from 'antd';
import { useState } from 'react';

interface ProfileTabProps {
  profile: any;
  name: string | null;
  surname: string | null;
  email: string | null;
  theme: string;
  handleSave: (values: any) => void;
  loading: boolean | undefined;
  handleClick: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profile,
  name,
  surname,
  email,
  theme,
  handleSave,
  loading,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedSeed, setSelectedSeed] = useState(
    profile?.avatarSeed || 'smile'
  );
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleAvatarChange = (seed: string) => {
    setSelectedSeed(seed);
    setPopoverOpen(false);
    form.setFieldsValue({ avatarSeed: seed });
  };

  return (
    <Skeleton active loading={loading}>
      <div className={`profile-container ${theme}`}>
        <div className="profile-tab-card">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            initialValues={{
              firstName: profile?.firstName || name || '',
              lastName: profile?.lastName || surname || '',
              email: email || '',
              avatarSeed: profile?.avatarSeed || 'smile',
            }}
            className="profile-form"
          >
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={6} className="avatar-chooser">
                <Popover
                  content={
                    <div className="avatar-popup">
                      {avatarSeeds.map((seed) => (
                        <img
                          key={seed}
                          className={`avatar-choice ${
                            seed === selectedSeed ? 'selected' : ''
                          }`}
                          src={`https://api.dicebear.com/7.x/micah/svg?seed=${seed}&mouth=smile&baseColor=f9c9b6&facialHairProbability=0&hairColor=000000,6bd9e9,9287ff`}
                          alt={seed}
                          onClick={() => handleAvatarChange(seed)}
                        />
                      ))}
                    </div>
                  }
                  trigger="click"
                  open={popoverOpen}
                  onOpenChange={setPopoverOpen}
                >
                  <Button
                    icon={<UserOutlined />}
                    type="default"
                    size="large"
                    className="choose-avatar-btn"
                  >
                    Choose Avatar
                  </Button>
                </Popover>
              </Col>

              <Col xs={24} sm={18}>
                <Row gutter={[24, 24]}>
                  <Col xs={24} sm={12}>
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
                  <Col xs={24} sm={12}>
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
                  <Col xs={24}>
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

                  <Form.Item name="avatarSeed" hidden>
                    <Input />
                  </Form.Item>
                </Row>
              </Col>
            </Row>

            <Divider />

            <Row justify="space-between" gutter={[16, 16]}>
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
                <Space>
                  <Button
                    onClick={() => navigate(ROUTES.UPLOAD_WORK)}
                    type="primary"
                  >
                    Upload Work
                  </Button>
                  <Button
                    onClick={() => navigate(ROUTES.RESUME_PATH)}
                    type="primary"
                  >
                    Generate Resume
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Skeleton>
  );
};
