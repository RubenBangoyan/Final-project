
//
//
// import {
//     Avatar,
//     Button,
//     Card,
//     Col,
//     Input,
//     Row,
//     Tag,
//     Typography,
//     Upload,
// } from 'antd';
// import {
//     UploadOutlined,
//     SettingOutlined,
//     PlusOutlined,
// } from '@ant-design/icons';
// import './ProfilePage.css';
//
// const { Text, Paragraph } = Typography;
//
// import { useState } from 'react';
//
// const ProfilePage = () => {
//     const [skills, setSkills] = useState(['React', 'JavaScript']);
//     const [inputVisible, setInputVisible] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const [bio, setBio] = useState('Open to new opportunities in web development.');
//
//     const handleClose = (removedSkill: string) => {
//         setSkills(skills.filter(skill => skill !== removedSkill));
//     };
//
//     const handleInputConfirm = () => {
//         if (inputValue && !skills.includes(inputValue)) {
//             setSkills([...skills, inputValue]);
//         }
//         setInputVisible(false);
//         setInputValue('');
//     };
//
//     return (
//         <div className="profile-page">
//             <Card className="profile-card">
//                 <Row gutter={[32, 32]}>
//                     <Col span={6}>
//                         <Upload showUploadList={false}>
//                             <Avatar size={128} icon={<UploadOutlined />} className="avatar" />
//                         </Upload>
//                         <div className="info-labels">
//                             <Text strong>Email:</Text>
//                             <Text> user@example.com </Text>
//                         </div>
//                         <Button icon={<SettingOutlined />} type="primary">
//                             Settings
//                         </Button>
//                     </Col>
//
//                     <Col span={18}>
//                         <Card title="Resume">
//                             <Button type="primary">Download or Create with AI</Button>
//                         </Card>
//
//                         <Card title="Status">
//                             <Text>Available for work</Text>
//                         </Card>
//
//                         <Card title="Skills">
//                             {skills.map(skill => (
//                                 <Tag
//                                     key={skill}
//                                     closable
//                                     onClose={() => handleClose(skill)}
//                                     color="blue"
//                                 >
//                                     {skill}
//                                 </Tag>
//                             ))}
//                             {inputVisible ? (
//                                 <Input
//                                     type="text"
//                                     size="small"
//                                     style={{ width: 120 }}
//                                     value={inputValue}
//                                     onChange={e => setInputValue(e.target.value)}
//                                     onBlur={handleInputConfirm}
//                                     onPressEnter={handleInputConfirm}
//                                     autoFocus
//                                 />
//                             ) : (
//                                 <Tag onClick={() => setInputVisible(true)} className="add-skill-tag">
//                                     <PlusOutlined /> New Skill
//                                 </Tag>
//                             )}
//                         </Card>
//
//                         <Card title="Bio">
//                             <Paragraph
//                                 editable={{
//                                     onChange: setBio,
//                                 }}
//                             >
//                                 {bio}
//                             </Paragraph>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Card>
//         </div>
//     );
// };
//
// export default ProfilePage;












// import {
//     Avatar,
//     Button,
//     Card,
//     Col,
//     Input,
//     Row,
//     Tag,
//     Typography,
//     Upload,
// } from 'antd';
// import {
//     UploadOutlined,
//     SettingOutlined,
//     PlusOutlined,
//     DownloadOutlined,
// } from '@ant-design/icons';
// import './ProfilePage.css';
//
// const { Text, Paragraph } = Typography;
//
// import { useState } from 'react';
//
// const ProfilePage = () => {
//     const [skills, setSkills] = useState(['React', 'JavaScript']);
//     const [inputVisible, setInputVisible] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const [bio, setBio] = useState('Open to new opportunities in web development.');
//
//     const handleClose = (removedSkill: string) => {
//         setSkills(skills.filter(skill => skill !== removedSkill));
//     };
//
//     const handleInputConfirm = () => {
//         if (inputValue && !skills.includes(inputValue)) {
//             setSkills([...skills, inputValue]);
//         }
//         setInputVisible(false);
//         setInputValue('');
//     };
//
//     const handleDownloadResume = () => {
//         console.log('Downloading resume...');
//         // TODO: Add real file download logic here
//     };
//
//     return (
//         <div className="profile-page">
//             <Card className="profile-card">
//                 <Row gutter={[32, 32]}>
//                     <Col span={6}>
//                         <Upload showUploadList={false}>
//                             <Avatar size={128} icon={<UploadOutlined />} className="avatar" />
//                         </Upload>
//                         <div className="info-labels">
//                             <Text strong>Email:</Text>
//                             <Text> user@example.com </Text>
//                         </div>
//                         <Button icon={<SettingOutlined />} type="primary">
//                             Settings
//                         </Button>
//                     </Col>
//
//                     <Col span={18}>
//                         <Card title="Resume">
//                             <Button
//                                 type="primary"
//                                 icon={<DownloadOutlined />}
//                                 onClick={handleDownloadResume}
//                             >
//                                 Download Resume
//                             </Button>
//                         </Card>
//
//                         <Card title="Status">
//                             <Text>Available for work</Text>
//                         </Card>
//
//                         <Card title="Skills">
//                             {skills.map(skill => (
//                                 <Tag
//                                     key={skill}
//                                     closable
//                                     onClose={() => handleClose(skill)}
//                                     color="blue"
//                                 >
//                                     {skill}
//                                 </Tag>
//                             ))}
//                             {inputVisible ? (
//                                 <Input
//                                     type="text"
//                                     size="small"
//                                     style={{ width: 120 }}
//                                     value={inputValue}
//                                     onChange={e => setInputValue(e.target.value)}
//                                     onBlur={handleInputConfirm}
//                                     onPressEnter={handleInputConfirm}
//                                     autoFocus
//                                 />
//                             ) : (
//                                 <Tag onClick={() => setInputVisible(true)} className="add-skill-tag">
//                                     <PlusOutlined /> New Skill
//                                 </Tag>
//                             )}
//                         </Card>
//
//                         <Card title="Bio">
//                             <Paragraph
//                                 editable={{
//                                     onChange: setBio,
//                                 }}
//                             >
//                                 {bio}
//                             </Paragraph>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Card>
//         </div>
//     );
// };
//
// export default ProfilePage;












import {
    Avatar,
    Button,
    Card,
    Col,
    Input,
    Row,
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
} from '@ant-design/icons';
import './ProfilePage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../routes/paths.ts"

const { Text, Paragraph } = Typography;

const ProfilePage = () => {
    const [skills, setSkills] = useState(['React', 'JavaScript']);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [bio, setBio] = useState('Open to new opportunities in web development.');
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const handleClose = (removedSkill: string) => {
        setSkills(skills.filter(skill => skill !== removedSkill));
    };

    const handleInputConfirm = () => {
        if (inputValue && !skills.includes(inputValue)) {
            setSkills([...skills, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleUploadChange = (info: any) => {
        const file = info.file.originFileObj;
        setResumeFile(file);
        message.success(`${file.name} uploaded successfully.`);
    };

    const navigate = useNavigate();

    return (
        <div className="profile-page">
            <Card className="profile-card">
                <Row gutter={[32, 32]}>
                    <Col span={6}>
                        <Upload showUploadList={false}>
                            <Avatar size={128} icon={<UploadOutlined />} className="avatar" />
                        </Upload>
                        <div className="info-labels">
                            <Text strong>Email:</Text>
                            <Text> user@example.com </Text>
                        </div>
                        <Button icon={<SettingOutlined />} type="primary">
                            Settings
                        </Button>
                    </Col>

                    <Col span={18}>
                        <Card title="Resume">
                            <Row gutter={16}>
                                <Col>
                                    <Upload
                                        showUploadList={false}
                                        beforeUpload={() => false}
                                        onChange={handleUploadChange}
                                    >
                                        <Button
                                            type="primary"
                                            icon={<UploadOutlined />}
                                        >
                                            Upload Resume
                                        </Button>
                                    </Upload>
                                </Col>
                                <Col>
                                    <Button
                                        type="default"
                                        icon={<FileAddOutlined />}
                                        onClick={() => navigate(ROUTES.RESUME_PATH)}
                                    >
                                        Create Resume
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card title="Status">
                            <Text>Available for work</Text>
                        </Card>

                        <Card title="Skills">
                            {skills.map(skill => (
                                <Tag
                                    key={skill}
                                    closable
                                    onClose={() => handleClose(skill)}
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
                                <Tag onClick={() => setInputVisible(true)} className="add-skill-tag">
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
        </div>
    );
};

export default ProfilePage;








// import React, { useState } from 'react';
// import {
//     Avatar,
//     Button,
//     Card,
//     Col,
//     Input,
//     Row,
//     Space,
//     Tag,
//     Typography,
//     Upload,
//     Switch,
// } from 'antd';
// import {
//     UploadOutlined,
//     LogoutOutlined,
//     SettingOutlined,
//     PlusOutlined,
//     HomeOutlined,
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import './ProfilePage.css';
//
// const { Title, Text, Paragraph } = Typography;
//
// const ProfilePage = () => {
//     const [darkMode, setDarkMode] = useState(false);
//     const [skills, setSkills] = useState(['React', 'JavaScript']);
//     const [inputVisible, setInputVisible] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const [bio, setBio] = useState('Open to new opportunities in web development.');
//     const navigate = useNavigate();
//
//     const handleClose = (removedSkill: string) => {
//         setSkills(skills.filter(skill => skill !== removedSkill));
//     };
//
//     const handleInputConfirm = () => {
//         if (inputValue && !skills.includes(inputValue)) {
//             setSkills([...skills, inputValue]);
//         }
//         setInputVisible(false);
//         setInputValue('');
//     };
//
//     const uploadProps = {
//         showUploadList: false,
//         beforeUpload: () => false,
//     };
//
//     const handleLogout = () => {
//         localStorage.removeItem('token'); // or your auth key
//         navigate('/login');
//     };
//
//     const handleGoHome = () => {
//         navigate('/home');
//     };
//
//     return (
//         <div className={darkMode ? 'profile-page dark' : 'profile-page'}>
//             <Card className="profile-card">
//                 <Row justify="space-between" align="middle" className="top-bar">
//                     <Col>
//                         <Button
//                             type="link"
//                             icon={<HomeOutlined />}
//                             onClick={handleGoHome}
//                             style={{ fontSize: '16px' }}
//                         >
//                             Home
//                         </Button>
//                     </Col>
//                     <Col>
//                         <Space>
//                             <Switch
//                                 checked={darkMode}
//                                 onChange={checked => setDarkMode(checked)}
//                                 checkedChildren="Dark"
//                                 unCheckedChildren="Light"
//                             />
//                             <Button
//                                 icon={<LogoutOutlined />}
//                                 type="primary"
//                                 danger
//                                 onClick={handleLogout}
//                             >
//                                 Log Out
//                             </Button>
//                         </Space>
//                     </Col>
//                 </Row>
//
//                 <Row gutter={[32, 32]}>
//                     <Col span={6}>
//                         <Upload {...uploadProps}>
//                             <Avatar size={128} icon={<UploadOutlined />} className="avatar" />
//                         </Upload>
//                         <div className="info-labels">
//                             <Text strong>Email:</Text>
//                             <Text> user@example.com </Text>
//                         </div>
//                         <Button icon={<SettingOutlined />} type="primary">
//                             Settings
//                         </Button>
//                     </Col>
//
//                     <Col span={18}>
//                         <Card title="Resume">
//                             <Button type="primary">Download or Create with AI</Button>
//                         </Card>
//
//                         <Card title="Status">
//                             <Text>Available for work</Text>
//                         </Card>
//
//                         <Card title="Skills">
//                             {skills.map(skill => (
//                                 <Tag
//                                     key={skill}
//                                     closable
//                                     onClose={() => handleClose(skill)}
//                                     color="blue"
//                                 >
//                                     {skill}
//                                 </Tag>
//                             ))}
//                             {inputVisible ? (
//                                 <Input
//                                     type="text"
//                                     size="small"
//                                     style={{ width: 120 }}
//                                     value={inputValue}
//                                     onChange={e => setInputValue(e.target.value)}
//                                     onBlur={handleInputConfirm}
//                                     onPressEnter={handleInputConfirm}
//                                     autoFocus
//                                 />
//                             ) : (
//                                 <Tag onClick={() => setInputVisible(true)} className="add-skill-tag">
//                                     <PlusOutlined /> New Skill
//                                 </Tag>
//                             )}
//                         </Card>
//
//                         <Card title="Bio">
//                             <Paragraph
//                                 editable={{
//                                     onChange: setBio,
//                                 }}
//                             >
//                                 {bio}
//                             </Paragraph>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Card>
//         </div>
//     );
// };
//
// export default ProfilePage;
