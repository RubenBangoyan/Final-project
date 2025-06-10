import { Timestamp } from 'firebase/firestore';

export interface Job {
  id: string;
  companyName: string;
  companyWebsite: string;
  contactEmail: string;
  createdAt: Timestamp;
  employmentType: string[];
  level: string;
  location: string;
  ownerID: string;
  position: string;
  requirements: string;
  salaryFrom: number;
  salaryTo: number;
  technologies: string[];
  appliedUsers: string[];
  expiresAt: Timestamp;
}
