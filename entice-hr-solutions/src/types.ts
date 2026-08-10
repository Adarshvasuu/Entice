export type PageType = 'home' | 'about' | 'services' | 'blogs' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  benefits: string[];
  idealFor: string;
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-Time' | 'Contract' | 'Hybrid' | 'Remote';
  experience: string;
  salaryRange: string;
  description: string;
  requirements: string[];
  isUrgent?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'HR Trends' | 'Payroll & Compliance' | 'Startup Scaling' | 'Executive Search' | 'Campus Hiring';
  snippet: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface LeadFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  companySize: string;
  serviceNeeded: string;
  message: string;
}

export interface CandidateApplicationData {
  fullName: string;
  email: string;
  phone: string;
  totalExperience: string;
  targetRole: string;
  expectedNoticePeriod: string;
  resumeFileName?: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  companyType: string;
  avatar: string;
  metrics: string;
}
