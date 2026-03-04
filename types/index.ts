export type Status = 'active' | 'completed' | 'archived';
export type Priority = 'low' | 'medium' | 'high';
export type TransactionType = 'income' | 'expense';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost' | 'won';

export interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  status: LeadStatus;
  createdAt: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: Status;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  images?: string[];
  isPublished?: boolean;
  createdAt: number; // Timestamp
  updatedAt: number; // Timestamp
  userId: string;
}

export interface Transaction {
  id: string;
  date: number; // Timestamp
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  createdAt: number;
  userId: string;
}

export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: number;
  userId: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'client';
}

export interface ClientData {
  id: string;
  name: string;
  email: string;
  infrastructure: {
    uptime: number;
    responseTime: number;
    lcp: number;
    cls: number;
  };
  migration: {
    currentDay: number;
    phases: {
      day: string;
      title: string;
      status: 'completed' | 'active' | 'pending';
      desc: string;
    }[];
  };
  assets: {
    name: string;
    type: string;
    size: string;
    url: string;
  }[];
  tickets: {
    id: string;
    title: string;
    status: 'open' | 'resolved';
    createdAt: number;
  }[];
  createdAt: number;
  updatedAt: number;
}
