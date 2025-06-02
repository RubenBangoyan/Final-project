import { ResumeDisplay } from '../../../components/resumeDisplay/ResumeDisplay';
import type { ResumeData } from '../../../components/resumeDisplay/types';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../services/firebse-config';
import { useAppSelector } from '../../../app/hook';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/paths';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import './ResumeTab.css'

interface ResumeTabProps {
  theme: string;
}

const ResumeTab: React.FC<ResumeTabProps> = ({ theme }) => {
  const id = useAppSelector((state) => state.user.id);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'resume'));
        let matchedResume: ResumeData | null = null;

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          console.log(data, 'resume from firebsse');
          if (data.ownerID === id) {
            matchedResume = {
              firstName: data.contactInfo.name,
              lastName: data.contactInfo.lastName,

              fullName: `${data.firstName || ''} ${data.lastName || ''}`,
              birthdate: data.birthdate || undefined,
              email: data.contactInfo.email || undefined,
              phone: data.phone || undefined,
              city: data.contactInfo.city || undefined,
              summary: data.summary || undefined,
              experience: Array.isArray(data.experience)
                ? data.experience.map((exp: any) => ({
                    company: exp.company || '',
                    position: exp.position || '',
                    period: exp.period || undefined,
                    description: exp.description || undefined,
                  }))
                : [],
            };
          }
        });

        if (matchedResume) {
          setResumeData(matchedResume);
        } else {
          console.log('No matching resume found for this user.');
        }
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    if (id) {
      fetchResumes();
    }
  }, [id]);

  return (
      <div className={`resume-tab-wrapper ${theme}`}>
        {resumeData ? (
            <ResumeDisplay resume={resumeData} />
        ) : (
            <div className="empty-resume-container">
              <p className="resume-hint-text">
                You haven’t generated a resume yet. Click below to create one.
              </p>
              <Button type="primary" size="large" onClick={() => navigate(ROUTES.RESUME_PATH)}>
                Go To Generate
              </Button>
            </div>
        )}
      </div>
  );
};

export default ResumeTab;
