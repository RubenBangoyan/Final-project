import defaultAvatar from '../../assets/images/225-default-avatar.png';
import NairiAvatar from '../../assets/images/Nairi-avatar-2.jpg';
import { UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './Team.css';
import {
  Layout,
  Row,
  Col,
  Card,
  Avatar,
  Modal,
  Typography,
  Button,
  Tag,
} from 'antd';

// import TigranAvatar from '';
// import YuriAvatar from '';
// import MelineAvatar from '';
// import RubenAvatar from '';
// import GevorgAvatar from '';

const { Content } = Layout;
const { Title, Text } = Typography;

interface Developer {
  id: number;
  name: string;
  email: string;
  surname: string;
  skills: string[];
  // university: string;
  photo: string | null;
  gender: 'male' | 'female';
}

const developers: Developer[] = [
  {
    id: 1,
    name: 'Nairi',
    gender: 'male',
    // university: 'YSU',
    photo: NairiAvatar,
    surname: 'Khachatryan',
    email: 'nairi@example.com',
    skills: ['React', 'JavaScript', 'TypeScript', 'Antd'],
  },
  {
    id: 2,
    name: 'Tigran',
    gender: 'male',
    surname: 'Nazaryan',
    photo: defaultAvatar,
    // university: 'Polytechnic',
    email: 'tigran.nazaryan.18@gmail.com',
    skills: ['React', 'JavaScript', 'TypeScript', 'Antd'],
  },
  {
    id: 3,
    name: 'Yuri',
    gender: 'male',
    // university: 'RAU',
    photo: defaultAvatar,
    surname: 'Dolukhanyan',
    email: 'yu.dolukhanyan@gmail.com',
    skills: ['React', 'JavaScript', 'TypeScript', 'Antd'],
  },
  {
    id: 4,
    name: 'Meline',
    gender: 'female',
    // university: 'YSU',
    surname: 'Afrikyan',
    photo: defaultAvatar,
    email: 'meline_afrikyan@edu.aua.am',
    skills: ['React', 'JavaScript', 'TypeScript', 'Antd'],
  },
  {
    id: 5,
    name: 'Ruben',
    gender: 'male',
    // university: 'AUA',
    surname: 'Bangoyan',
    photo: defaultAvatar,
    email: 'ruben.bangoyan2004@gmail.com',
    skills: ['React', 'JavaScript', 'TypeScript', 'Antd'],
  },
  {
    id: 6,
    name: 'Gevorg',
    gender: 'male',
    photo: defaultAvatar,
    surname: 'Gevorgyan',
    // university: 'French University',
    email: 'gevorg_gevorgyan@edu.aua.am',
    skills: ['React', 'JavaScript', 'TypeScript', 'Antd'],
  },
];

const TeamPage: React.FC = () => {
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);

  const handleCardClick = (dev: Developer) => {
    setSelectedDev(dev);
  };

  const handleModalClose = () => {
    setSelectedDev(null);
  };

  return (
    <Layout className="layout-background">
      <Content style={{ padding: '40px' }}>
        <Title level={2} className="page-title">
          Our Development Team
        </Title>

        <Row gutter={[24, 24]} justify="center">
          {developers.map((dev) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={dev.id}>
              <Card
                hoverable
                className="dev-card"
                onClick={() => handleCardClick(dev)}
              >
                <div className="dev-avatar-container">
                  <Avatar
                    size={96}
                    src={dev.photo}
                    icon={!dev.photo ? <UserOutlined /> : undefined}
                    className="dev-avatar"
                    style={{
                      backgroundColor:
                        dev.gender === 'female' ? '#f56a00' : '#1890ff',
                    }}
                  />
                </div>

                <Title level={5} className="dev-name">
                  {dev.name} {dev.surname}
                </Title>
                {/* <Text type="secondary">{dev.university}</Text> */}
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          open={!!selectedDev}
          onCancel={handleModalClose}
          width={600}
          style={{ top: 60 }}
          footer={[
            <Button
              key="email"
              type="primary"
              href={`mailto:${selectedDev?.email}`}
            >
              Contact
            </Button>,
          ]}
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar
                size={64}
                src={selectedDev?.photo}
                className='dev-avatar'
                style={{
                  backgroundColor:
                    selectedDev?.gender === 'female' ? '#f56a00' : '#1890ff',
                }}
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {selectedDev?.name} {selectedDev?.surname}
                </Title>
                {/* <Text type="secondary">{selectedDev?.university}</Text> */}
              </div>
            </div>
          }
        >
          <Text strong>Skills:</Text>
          <div style={{ marginTop: 8, marginBottom: 16 }}>
            {selectedDev?.skills.map((skill, index) => (
              <Tag key={index} color="blue">
                {skill}
              </Tag>
            ))}
          </div>

          <Text strong>Email:</Text>
          <Text copyable style={{ display: 'block', marginTop: 4 }}>
            {selectedDev?.email}
          </Text>
        </Modal>
      </Content>
    </Layout>
  );
};

export default TeamPage;
