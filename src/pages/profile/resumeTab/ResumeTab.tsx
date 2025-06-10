import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { Button, Typography, Divider, List, Spin } from 'antd';
import { db } from '../../../services/firebse-config';
import { useAppSelector } from '../../../app/hook';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/paths';
import { useEffect, useState } from 'react';
import './ResumeTab.css';

interface ResumeTabProps {
  theme: string;
}

const { Title, Text, Paragraph } = Typography;

interface Resume {
  contactInfo: any;
  name: string;
  phone: string;
  education: string;
  experience?: {
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
  skills?: string[];
  languages?: string[];
  profile?: string;
}

const ResumeTab: React.FC<ResumeTabProps> = ({ theme }) => {
  const id = useAppSelector((state) => state.user.id);
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleDeleteResume(id: string | null) {
    setLoading(true);
    try {
      if (!id) {
        console.error('Invalid ID: null or undefined');
        return false;
      }

      const docRef = doc(db, 'resume', id);
      await deleteDoc(docRef);
      setResumeData(null);
      setLoading(false);
      return true;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return false;
    }
  }

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'resume'));
        let matchedResume: Resume | null = null;

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.ownerID === id) {
            matchedResume = {
              contactInfo: {
                name: data.contactInfo?.name || '',
                lastName: data.contactInfo?.lastName || '',
                email: data.contactInfo?.email || '',
                phone: data.contactInfo?.phone || '',
                city: data.contactInfo?.city || '',
              },
              name: data.contactInfo?.name || '',
              phone: data.contactInfo?.phone || '',
              education: data.education || '',
              profile: data.summary || '',
              experience: Array.isArray(data.experience)
                ? data.experience.map((exp: any) => ({
                    company: exp.company || '',
                    position: exp.position || '',
                    description: exp.description || '',
                    startDate: exp.startDate || '',
                    endDate: exp.endDate || '',
                  }))
                : [],
              skills: Array.isArray(data.skills) ? data.skills : [],
              languages: Array.isArray(data.languages) ? data.languages : [],
            };
          }
        });

        if (matchedResume) {
          setResumeData(matchedResume);
        } else {
          console.log('No resume found for this user');
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
      }
    };

    if (id) {
      fetchResume();
    }
  }, [id]);

  return (
    <div className={`resume-tab-wrapper ${theme}`}>
      {resumeData ? (
        <>
          <div style={{ padding: '12px' }}>
            <Title level={4} style={{ marginBottom: 4 }}>
              {resumeData?.contactInfo?.name}{' '}
              {resumeData?.contactInfo?.lastName}
            </Title>
            <Text type="secondary">{resumeData?.contactInfo?.email}</Text>
            <br />
            <Text type="secondary">
              📞 {resumeData?.contactInfo?.phone} | 📍{' '}
              {resumeData?.contactInfo?.city}
            </Text>
            <Divider />
            <Title level={5}>Profile</Title>
            <Paragraph>
              {resumeData?.profile?.trim()
                ? resumeData.profile
                : 'No profile summary provided.'}
            </Paragraph>
            <Divider />
            <Title level={5}>Experience</Title>
            {resumeData?.experience?.length ? (
              <List
                dataSource={resumeData.experience}
                renderItem={(exp) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <>
                          {exp.position} at <strong>{exp.company}</strong>
                        </>
                      }
                      description={
                        <>
                          <Text type="secondary">
                            {new Date(exp.startDate).toLocaleDateString()} -{' '}
                            {new Date(exp.endDate).toLocaleDateString()}
                          </Text>
                          <br />
                          {`Description: ${exp.description}`}
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Paragraph type="secondary">No experience listed.</Paragraph>
            )}

            <Divider />

            <Title level={5}>Skills</Title>
            {resumeData?.skills?.length ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {resumeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: '#f0f0f0',
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <Paragraph type="secondary">No skills listed.</Paragraph>
            )}
            <Divider />

            <Title level={5}>Languages</Title>
            {resumeData?.languages?.length ? (
              <ul style={{ paddingLeft: '1.2rem' }}>
                {resumeData.languages.map((lang, i) => (
                  <li key={i}>{lang}</li>
                ))}
              </ul>
            ) : (
              <Paragraph type="secondary">No languages listed.</Paragraph>
            )}
          </div>
          <div>
            <Button
              onClick={() => handleDeleteResume(id)}
              type="primary"
              danger
            >
              Delete
            </Button>
            {loading ? (
              <Spin tip="Loading..." size="large">
                <div style={{ height: 200 }}></div>
              </Spin>
            ) : null}
          </div>
        </>
      ) : (
        <div className="empty-resume-container">
          <p className="resume-hint-text">
            You haven’t generated a resume yet. Click below to create one.
          </p>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(ROUTES.RESUME_PATH)}
          >
            Go To Generate
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResumeTab;
