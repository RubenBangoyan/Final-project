import {
    Input,
    Button,
    Row,
    Col,
    Card,
    Typography,
    Space,
    Select,
    Form,
    message, Upload,
} from "antd";
import {useDispatch, useSelector} from "react-redux";
import { updateProfile } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import {RobotOutlined, UploadOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {doc, setDoc} from "firebase/firestore";
import { auth, db } from "../../services/firebse-config";
import {StorageService} from "../../services/StorageService.tsx";
import type {RootState} from "../../app/store.ts";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebse-config";
import { Radio } from "antd";
import { getUserProfileFromFirebase } from "../../services/fetchUserProfile";
import { onAuthStateChanged } from "firebase/auth";

const { Title } = Typography;
const { Option } = Select;

export type UserProfile = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    city: string;
    status: string;
    avatarUrl?: string;
};

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const profile = useSelector((state: RootState) => state.user.profile);
    const avatarSeeds = ["Alex", "Taylor", "Jordan", "Morgan", "George", "Quinn", "Jameson", "Jules"];
    const avatarStyle = "micah";
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const profile = await getUserProfileFromFirebase(user.uid);

                if (
                    profile?.name &&
                    profile.surname &&
                    profile.email &&
                    profile.phone &&
                    profile.city &&
                    profile.status
                ) {
                    form.setFieldsValue(profile);
                    dispatch(updateProfile(profile));
                    setIsEditing(true);
                } else {
                    const draft = StorageService.getItem(`draftProfile_${user.uid}`);
                    if (draft) {
                        form.setFieldsValue(draft);
                    }
                    setIsEditing(false);
                }
            } else {
                setIsEditing(false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (profile && isEditing) {
            navigate("/");
        }
    }, [profile]);

    const handleCreateResumeWithAI = () => {
        const user = auth.currentUser;
        if (user) {
            const values = form.getFieldsValue();
            StorageService.setItem(`draftProfile_${user.uid}`, values);
            navigate("/resume");
        } else {
            message.error("You must be logged in to create a resume.");
        }
    };

    const handleCreateProfile = async (values: any) => {
        const user = auth.currentUser;

        if (!user) return;

        try {
            let resumeURL = "";

            if (uploadedFile) {
                const resumeRef = ref(storage, `resumes/${user.uid}/${uploadedFile.name}`);
                await uploadBytes(resumeRef, uploadedFile);
                resumeURL = await getDownloadURL(resumeRef);
            }

            const profileData = {
                ...values,
                resumeURL,
            };

            await setDoc(doc(db, "profiles", user.uid), profileData);
            dispatch(updateProfile(profileData));
            StorageService.setItem(`draftProfile_${user.uid}`, null);
            message.success(isEditing ? "Profile saved successfully!" : "Profile created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error saving profile:", error);
            message.error("Failed to save profile");
        }
    };

    return (
        <div className="profile-page" style={{ padding: 32}}>
            <Title level={3}>Create Profile</Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateProfile}
                onValuesChange={(_, values) => {
                    const user = auth.currentUser;
                    if (user) {
                        StorageService.setItem(`draftProfile_${user.uid}`, values);
                    }
                }}
                requiredMark="optional"
            >
                <Row gutter={[24, 24]} justify="center">
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card title="Personal Info" bordered={false} style={{ borderRadius: 12 }}>
                            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Surname" name="surname" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="City" name="city" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Choose an Avatar"
                                name="avatarUrl"
                                rules={[{ required: true }]}
                            >
                                <Radio.Group
                                    optionType="button"
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        gap: 12,
                                        maxWidth: "100%",
                                    }}
                                >
                                    {avatarSeeds.map((seed) => {
                                        const url = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${seed}&mouth=smile`;
                                        return (
                                            <Radio.Button
                                                key={seed}
                                                value={url}
                                                style={{
                                                    padding: 0,
                                                    height: "auto",
                                                    width: "auto",
                                                    background: "transparent",
                                                    border: "none",
                                                    boxShadow: "none",
                                                }}
                                            >
                                                <img
                                                    src={url}
                                                    alt={`avatar-${seed}`}
                                                    style={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: "50%",
                                                        border:
                                                            form.getFieldValue("avatarUrl") === url
                                                                ? "2px solid #1890ff"
                                                                : "2px solid transparent",
                                                        transition: "border 0.2s",
                                                    }}
                                                />
                                            </Radio.Button>
                                        );
                                    })}
                                </Radio.Group>
                            </Form.Item>


                        </Card>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card title="Status & Resume" bordered={false} style={{ borderRadius: 12 }}>
                            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                <Select placeholder="Select status">
                                    <Option value="Available for work">Available for work</Option>
                                    <Option value="Open to opportunities">Open to opportunities</Option>
                                    <Option value="Freelance only">Freelance only</Option>
                                    <Option value="Internship seeking">Internship seeking</Option>
                                    <Option value="Part-time only">Part-time only</Option>
                                    <Option value="Remote only">Remote only</Option>
                                    <Option value="Not looking right now">Not looking right now</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Resume Upload">
                                <Space align="center">
                                    <Upload
                                        name="resume"
                                        accept=".pdf,.doc,.docx"
                                        showUploadList={false}
                                        multiple={false}
                                        beforeUpload={(file) => {
                                            setUploadedFile(file);
                                            message.success(`Uploaded: ${file.name}`);
                                            return false;
                                        }}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload Resume</Button>
                                    </Upload>

                                    {uploadedFile && (
                                        <Space>
                                        <span style={{ fontWeight: 500 }}>
                                            <strong>{uploadedFile.name}</strong>
                                        </span>
                                            <Button
                                                type="text"
                                                size="small"
                                                danger
                                                onClick={() => setUploadedFile(null)}
                                                style={{ padding: 0 }}
                                            >
                                                x
                                            </Button>
                                        </Space>
                                    )}
                                </Space>
                            </Form.Item>


                            <Button
                                type="primary"
                                icon={<RobotOutlined />}
                                onClick={handleCreateResumeWithAI}
                            >
                                Create Resume with AI
                            </Button>
                        </Card>
                    </Col>
                </Row>

                <Row justify="center" style={{ marginTop: 32 }}>
                    <Button type="primary" size="large" htmlType="submit">
                        {isEditing ? "Save" : "Create Profile"}
                    </Button>
                </Row>
            </Form>
        </div>
    );
};

export default ProfilePage;
