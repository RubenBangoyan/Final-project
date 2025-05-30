export type ResumeData = {
  firstName: string;
  lastName: string;
  fullName: string;
  birthdate?: string;
  email?: string;
  phone?: string;
  city?: string;
  summary?: string;
  experience: {
    company: string;
    position: string;
    period?: [string, string];
    description?: string;
  }[];
};

export type Experience = {
  company: string;
  position: string;
  period?: string;
  description?: string;
};
