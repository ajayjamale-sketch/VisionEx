import { useState } from 'react';
import type { User, UserRole, DemoUser } from '@/types';

export const DEMO_USERS: DemoUser[] = [
  {
    role: 'admin',
    roleLabel: 'Enterprise Admin',
    name: 'Alex Morrison',
    email: 'admin@visionex.ai',
    organization: 'Acme Corporation',
    plan: 'enterprise',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    color: 'from-indigo-600 to-indigo-500',
    description: 'Full platform access, user management & billing',
  },
  {
    role: 'security',
    roleLabel: 'Security Operator',
    name: 'Jordan Blake',
    email: 'security@visionex.ai',
    organization: 'Acme Corporation',
    plan: 'professional',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    color: 'from-cyan-600 to-cyan-500',
    description: 'Live monitoring, alerts & incident response',
  },
  {
    role: 'engineer',
    roleLabel: 'AI Engineer',
    name: 'Priya Nair',
    email: 'engineer@visionex.ai',
    organization: 'Acme Corporation',
    plan: 'professional',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
    color: 'from-electric-600 to-electric-500',
    description: 'Model training, datasets & AI performance',
  },
  {
    role: 'quality',
    roleLabel: 'Quality Manager',
    name: 'Marcus Chen',
    email: 'quality@visionex.ai',
    organization: 'NexaManufacturing',
    plan: 'professional',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    color: 'from-green-600 to-green-500',
    description: 'Inspection reports, defects & quality scoring',
  },
  {
    role: 'sysadmin',
    roleLabel: 'System Admin',
    name: 'Sam Rivera',
    email: 'sysadmin@visionex.ai',
    organization: 'Acme Corporation',
    plan: 'enterprise',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
    color: 'from-orange-600 to-orange-500',
    description: 'Infrastructure, users & system health',
  },
];

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('visionex-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, _password: string): Promise<boolean> => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const demo = DEMO_USERS[0];
    const mockUser: User = {
      id: '1',
      name: demo.name,
      email,
      role: demo.role,
      roleLabel: demo.roleLabel,
      organization: demo.organization,
      plan: demo.plan,
      avatar: demo.avatar,
      createdAt: '2024-01-15',
    };
    setUser(mockUser);
    localStorage.setItem('visionex-user', JSON.stringify(mockUser));
    setLoading(false);
    return true;
  };

  const loginAsRole = async (roleKey: UserRole): Promise<void> => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const demo = DEMO_USERS.find(d => d.role === roleKey) || DEMO_USERS[0];
    const u: User = {
      id: `demo-${roleKey}`,
      name: demo.name,
      email: demo.email,
      role: demo.role,
      roleLabel: demo.roleLabel,
      organization: demo.organization,
      plan: demo.plan,
      avatar: demo.avatar,
      createdAt: '2024-01-15',
    };
    setUser(u);
    localStorage.setItem('visionex-user', JSON.stringify(u));
    setLoading(false);
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const u: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'admin',
      roleLabel: 'Enterprise Admin',
      organization: 'My Organization',
      plan: 'starter',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=312E81&color=fff`,
      createdAt: new Date().toISOString(),
    };
    setUser(u);
    localStorage.setItem('visionex-user', JSON.stringify(u));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('visionex-user');
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const updated = { ...user!, ...data };
    setUser(updated);
    localStorage.setItem('visionex-user', JSON.stringify(updated));
    setLoading(false);
    return true;
  };

  return { user, loading, login, loginAsRole, register, logout, updateProfile };
}
