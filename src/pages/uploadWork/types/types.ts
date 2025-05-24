export interface OfferingWorkFormValues {
  companyName: string;
  aboutCompany?: string;
  companyWebsite?: string;
  position: string;
  category?: string;
  level?: "intern" | "junior" | "mid" | "senior" | "lead";
  technologies?: string[];
  employmentType?: string[];
  location?: string;
  salaryFrom?: number;
  salaryTo?: number;
  requirements?: string;
  contactEmail: string;
  telegram?: string;
  userId?: string;
}
