export interface ContactInfo {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

export interface Resume {
  contactInfo: ContactInfo;
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