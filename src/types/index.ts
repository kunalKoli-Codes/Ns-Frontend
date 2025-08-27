export interface Course {
  id: string;
  title: string;
  category: 'UG' | 'PG' | 'PhD';
  duration: string;
  description: string;
  eligibility: string;
  fees?: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Career' | 'Finance' | 'Education' | 'Job Tips';
  author: string;
  publishedAt: string;
  featuredImage: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  message: string;
  rating: number;
  image?: string;
}

export interface JobLead {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  status: 'Applied' | 'Interview' | 'Placed' | 'Rejected';
  company?: string;
  createdAt: string;
}