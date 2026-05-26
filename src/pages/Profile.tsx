import { useState } from 'react';
import { useScrollTop } from '@/hooks/useScrollTop';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Camera, Save, User, Building, Mail, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  useScrollTop();
  const { user, updateProfile, loading } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    role: user?.role || '',
    bio: 'Enterprise AI platform administrator focused on security and operational intelligence.',
    phone: '+1 (415) 555-0123',
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name: form.name, email: form.email, organization: form.organization });
    toast.success('Profile updated successfully!');
  };

  return (
    <DashboardLayout>
      <div className="page-transition max-w-3xl space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your personal account information.</p>
        </div>

        {/* Avatar */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500/20" />
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-sm">
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div>
              <h2 className="font-heading font-semibold text-foreground text-lg">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.role} · {user?.organization}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${user?.plan === 'enterprise' ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white' : user?.plan === 'professional' ? 'bg-indigo-600/20 text-indigo-400' : 'bg-muted text-muted-foreground'}`}>
                  {user?.plan?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-indigo-400" />
              <h3 className="font-heading font-semibold text-foreground">Personal Information</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <input type="text" value={form.name} onChange={update('name')}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                <input type="email" value={form.email} onChange={update('email')}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                <input type="tel" value={form.phone} onChange={update('phone')}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Role</label>
                <select value={form.role} onChange={update('role')}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                  <option value="admin">Administrator</option>
                  <option value="operator">Security Operator</option>
                  <option value="engineer">AI Engineer</option>
                  <option value="manager">Quality Manager</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
              <textarea value={form.bio} onChange={update('bio')} rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-indigo-400" />
              <h3 className="font-heading font-semibold text-foreground">Organization</h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Organization Name</label>
              <input type="text" value={form.organization} onChange={update('organization')}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
            </div>
          </div>

          {/* Security section */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-indigo-400" />
              <h3 className="font-heading font-semibold text-foreground">Security</h3>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div>
                <div className="text-sm font-medium text-foreground">Password</div>
                <div className="text-xs text-muted-foreground">Last changed 45 days ago</div>
              </div>
              <button type="button" className="px-4 py-2 text-xs font-medium text-indigo-400 border border-indigo-500/30 rounded-lg hover:bg-indigo-600/10 transition-colors">
                Change Password
              </button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 mt-3">
              <div>
                <div className="text-sm font-medium text-foreground">Two-Factor Authentication</div>
                <div className="text-xs text-muted-foreground">Adds an extra layer of security</div>
              </div>
              <button type="button" className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-lg hover:shadow-glow-indigo transition-all duration-200">
                Enable 2FA
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" className="px-5 py-2.5 text-sm font-medium text-muted-foreground border border-border rounded-xl hover:bg-muted transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl hover:shadow-glow-indigo transition-all duration-300 disabled:opacity-60 flex items-center gap-2">
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
