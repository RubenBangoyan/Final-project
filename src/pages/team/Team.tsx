import React, { useState } from "react";
import './Team.css'
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
} from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

interface Developer {
  id: number;
  name: string;
  surname: string;
  gender: "male" | "female";
  university: string;
  skills: string[];
  email: string;
}

const developers: Developer[] = [
  {
    id: 1,
    name: "Nairi",
    surname: "Khachatryan",
    gender: "male",
    university: "YSU",
    skills: ["React", "JavaScript", "TypeScript", "Antd"],
    email: "nairi@example.com",
  },
  {
    id: 2,
    name: "Tigran",
    surname: "Nazaryan",
    gender: "male",
    university: "Polytechnic",
    skills: ["React", "JavaScript", "TypeScript", "Antd"],
    email: "tigran.nazaryan.18@gmail.com",
  },
  {
    id: 3,
    name: "Yuri",
    surname: "Dolukhanyan",
    gender: "male",
    university: "RAU",
    skills: ["React", "JavaScript", "TypeScript", "Antd"],
    email: "yu.dolukhanyan@gmail.com",
  },
  {
    id: 4,
    name: "Meline",
    surname: "Afrikyan",
    gender: "female",
    university: "YSU",
    skills: ["React", "JavaScript", "TypeScript", "Antd"],
    email: "meline_afrikyan@edu.aua.am",
  },
  {
    id: 5,
    name: "Ruben",
    surname: "Bangoyan",
    gender: "male",
    university: "AUA",
    skills: ["React", "JavaScript", "TypeScript", "Antd"],
    email: "ruben.bangoyan2004@gmail.com",
  },
  {
    id: 6,
    name: "Gevorg",
    surname: "Gevorgyan",
    gender: "male",
    university: "French University",
    skills: ["React", "JavaScript", "TypeScript", "Antd"],
    email: "gevorg_gevorgyan@edu.aua.am",
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
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0eafc, #cfdef3)",
      }}
    >
      <Content style={{ padding: "40px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
          Our Development Team
        </Title>

        <Row gutter={[24, 24]} justify="center">
          {developers.map((dev) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={dev.id}>
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  borderRadius: 16,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s",
                }}
                bodyStyle={{ padding: 24 }}
                onClick={() => handleCardClick(dev)}
              >
                <Avatar
                  size={96}
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor:
                      dev.gender === "female" ? "#f56a00" : "#1890ff",
                  }}
                />
                <Title level={5} style={{ marginTop: 10, marginBottom: 0 }}>
                  {dev.name} {dev.surname}
                </Title>
                <Text type="secondary">{dev.university}</Text>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          open={!!selectedDev}
          onCancel={handleModalClose}
          width={600}
          style={{ top: 60 }}
          bodyStyle={{ padding: 30 }}
          footer={[
            <Button
              key="email"
              type="primary"
              icon={<MailOutlined />}
              href={`mailto:${selectedDev?.email}`}
            >
              Contact
            </Button>,
          ]}
          title={
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Avatar
                size={64}
                icon={<UserOutlined />}
                style={{
                  backgroundColor:
                    selectedDev?.gender === "female" ? "#f56a00" : "#1890ff",
                }}
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {selectedDev?.name} {selectedDev?.surname}
                </Title>
                <Text type="secondary">{selectedDev?.university}</Text>
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
          <Text copyable style={{ display: "block", marginTop: 4 }}>
            {selectedDev?.email}
          </Text>
        </Modal>
      </Content>
    </Layout>
  );
};

export default TeamPage;
