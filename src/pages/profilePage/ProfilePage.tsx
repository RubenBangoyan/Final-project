import {
    Avatar,
    Button,
    Card,
    Col,
    Input,
    Modal,
    Row,
    Select,
    Tag,
    Typography,
    Upload,
    message,
} from 'antd';
import {
    UploadOutlined,
    SettingOutlined,
    PlusOutlined,
    FileAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { CloudUploadOutlined } from '@ant-design/icons';
import './ProfilePage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';

const { Text, Paragraph, Title } = Typography;

const ProfilePage = () => {
    const [skills, setSkills] = useState(['React', 'JavaScript']);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [bio, setBio] = useState('Open to new opportunities in web development.');
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: 'John',
        surname: 'Doe',
        email: 'user@example.com',
    });

    const [tempProfileInfo, setTempProfileInfo] = useState({ ...profileInfo });

    const statusOptions = [
        'Available for work',
        'Open to collaboration',
        'Not looking right now',
        'Freelancing only',
        'Internship preferred',
    ];

    const [status, setStatus] = useState('Available for work');

    const navigate = useNavigate();

    const handleCloseSkill = (removedSkill: string) => {
        setSkills(skills.filter(skill => skill !== removedSkill));
    };

    const handleInputConfirm = () => {
        if (inputValue && !skills.includes(inputValue)) {
            setSkills([...skills, inputValue.trim()]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleUploadChange = (info: any) => {
        const file = info.file.originFileObj;
        if (file) {
            setResumeFile(file);
            message.success(`${file.name} uploaded successfully.`);
        }
    };

    const handleEditProfile = () => {
        setTempProfileInfo({ ...profileInfo });
        setIsEditModalVisible(true);
    };

    const handleSaveProfile = () => {
        setProfileInfo({ ...tempProfileInfo });
        setIsEditModalVisible(false);
        message.success('Profile information updated.');
    };

    return (
        <div className="profile-page">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={2} style={{ fontWeight: 'bold' }}>Profile Page</Title>
            </div>

            <Card className="profile-card">
                <Row gutter={[32, 32]}>
                    {/* Sidebar */}
                    <Col xs={24} sm={24} md={6}>
                        <div style={{ textAlign: 'center' }}>
                            <Upload showUploadList={false}>
                                <Avatar
                                    size={128}
                                    icon={<UserOutlined />}
                                    className="avatar"
                                    style={{ cursor: 'pointer' }}
                                />
                            </Upload>
                            <div style={{ marginTop: 16 }}>
                                <Text strong>Name:</Text>
                                <div>
                                    <Text>{profileInfo.name} {profileInfo.surname}</Text>
                                </div>
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <Text strong>Email:</Text>
                                <div>
                                    <Text>{profileInfo.email}</Text>
                                </div>
                            </div>
                            <div style={{ marginTop: 16, width: '100%' }}>
                                <Button
                                    icon={<SettingOutlined />}
                                    type="primary"
                                    onClick={handleEditProfile}
                                    block
                                >
                                    Edit Profile Information
                                </Button>
                            </div>
                        </div>
                    </Col>

                    {/* Main Content */}
                    <Col xs={24} sm={24} md={18}>
                        <Card title="Resume" style={{ marginBottom: 24 }}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12} md={8}>
                                    <Upload
                                        showUploadList={false}
                                        beforeUpload={() => false}
                                        onChange={handleUploadChange}
                                        style={{ width: '100%' }}
                                    >
                                        <Button
                                            type="primary"
                                            icon={<UploadOutlined />}
                                            block
                                        >
                                            Upload Resume
                                        </Button>
                                    </Upload>
                                </Col>
                                <Col xs={24} sm={12} md={8}>
                                    <Button
                                        type="default"
                                        icon={<FileAddOutlined />}
                                        block
                                        onClick={() => navigate(ROUTES.RESUME_PATH)}
                                    >
                                        Create Resume
                                    </Button>
                                </Col>
                                <Col xs={24} sm={12} md={8}>
                                    <Button
                                        type="dashed"
                                        icon={<CloudUploadOutlined />}
                                        block
                                        onClick={() => navigate(ROUTES.UPLOAD_WORK)}
                                    >
                                        Upload Work
                                    </Button>
                                </Col>
                            </Row>
                            {resumeFile && (
                                <Text type="secondary" style={{ marginTop: 12, display: 'block' }}>
                                    Uploaded: {resumeFile.name}
                                </Text>
                            )}
                        </Card>

                        <Card title="Status" style={{ marginBottom: 24 }}>
                            <Select
                                value={status}
                                onChange={value => setStatus(value)}
                                style={{ width: 250 }}
                            >
                                {statusOptions.map(option => (
                                    <Select.Option key={option} value={option}>
                                        {option}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Card>

                        <Card title="Skills" style={{ marginBottom: 24 }}>
                            {skills.map(skill => (
                                <Tag
                                    key={skill}
                                    closable
                                    onClose={() => handleCloseSkill(skill)}
                                    color="blue"
                                >
                                    {skill}
                                </Tag>
                            ))}
                            {inputVisible ? (
                                <Input
                                    type="text"
                                    size="small"
                                    style={{ width: 120 }}
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    onBlur={handleInputConfirm}
                                    onPressEnter={handleInputConfirm}
                                    autoFocus
                                />
                            ) : (
                                <Tag
                                    onClick={() => setInputVisible(true)}
                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                >
                                    <PlusOutlined /> New Skill
                                </Tag>
                            )}
                        </Card>

                        <Card title="Bio">
                            <Paragraph editable={{ onChange: setBio }}>
                                {bio}
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
            </Card>

            <Modal
                title="Edit Profile Information"
                open={isEditModalVisible}
                onOk={handleSaveProfile}
                onCancel={() => setIsEditModalVisible(false)}
                okText="Save"
                cancelText="Cancel"
            >
                <Input
                    style={{ marginBottom: '1rem' }}
                    value={tempProfileInfo.name}
                    onChange={e =>
                        setTempProfileInfo({ ...tempProfileInfo, name: e.target.value })
                    }
                    placeholder="First Name"
                />
                <Input
                    style={{ marginBottom: '1rem' }}
                    value={tempProfileInfo.surname}
                    onChange={e =>
                        setTempProfileInfo({ ...tempProfileInfo, surname: e.target.value })
                    }
                    placeholder="Last Name"
                />
                <Input
                    value={tempProfileInfo.email}
                    onChange={e =>
                        setTempProfileInfo({ ...tempProfileInfo, email: e.target.value })
                    }
                    placeholder="Email Address"
                />
            </Modal>
        </div>
    );
};

export default ProfilePage;

