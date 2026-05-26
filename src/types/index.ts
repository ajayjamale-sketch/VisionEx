export type UserRole = 'admin' | 'security' | 'engineer' | 'quality' | 'sysadmin';
export type UserPlan = 'starter' | 'professional' | 'enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  roleLabel: string;
  organization: string;
  plan: UserPlan;
  createdAt: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface Alert {
  id: string;
  type: 'intrusion' | 'defect' | 'motion' | 'face' | 'vehicle';
  severity: 'high' | 'medium' | 'low';
  message: string;
  location: string;
  timestamp: string;
  status: 'new' | 'acknowledged' | 'resolved';
}

export interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'processing';
  detections: number;
  thumbnail: string;
}

export interface DemoUser {
  role: UserRole;
  roleLabel: string;
  name: string;
  email: string;
  organization: string;
  plan: UserPlan;
  avatar: string;
  color: string;
  description: string;
}
