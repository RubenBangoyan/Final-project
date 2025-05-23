// src/types.ts
export interface Job {
  id: string;
  companyName: string;
  companyWebsite: string;
  contactEmail: string;
  createdAt: any; // можно использовать Timestamp если хочешь точность
  employmentType: string[];
  level: string;
  location: string;
  ownerID: string;
  position: string;
  requirements: string;
  salaryFrom: number;
  salaryTo: number;
  technologies: string[];
}
