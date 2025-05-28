import React from "react";
import { Avatar, Button, Card, Typography, Space } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export type ProfileSidebarProps = {
    name: string;
    surname: string;
    email: string;
    onEdit: () => void;
};

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
                                                           name,
                                                           surname,
                                                           email,
                                                           onEdit,
                                                       }) => {
    return (
        <Card
            style={{ width: 300 }}
            bordered={false}
            bodyStyle={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
            <Avatar size={96} icon={<UserOutlined />} style={{ marginBottom: 16 }} />

            <Title level={4}>
                {name} {surname}
            </Title>

            <Text type="secondary">{email}</Text>

            <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ marginTop: 24 }}
                onClick={onEdit}
            >
                Edit Profile Information
            </Button>
        </Card>
    );
};

export default ProfileSidebar;
