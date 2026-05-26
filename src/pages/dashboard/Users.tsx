import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Users, Plus, Search, Shield, ArrowRight, Mail, Edit, Trash2, X, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { UserRole } from '@/types';

interface Member {
  id: string; name: string; email: string; role: UserRole;
  roleLabel: string; status: 'active' | 'inactive'; lastActive: string;
  avatar: string; plan: string;
}

const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: 'Alex Morrison', email: 'alex@acmecorp.com', role: 'admin', roleLabel: 'Enterprise Admin', status: 'active', lastActive: 'Now', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', plan: 'enterprise' },
  { id: '2', name: 'Jordan Blake', email: 'jordan@acmecorp.com', role: 'security', roleLabel: 'Security Operator', status: 'active', lastActive: '5 min ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', plan: 'professional' },
  { id: '3', name: 'Priya Nair', email: 'priya@acmecorp.com', role: 'engineer', roleLabel: 'AI Engineer', status: 'active', lastActive: '1 hr ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face', plan: 'professional' },
  { id: '4', name: 'Marcus Chen', email: 'marcus@nexamfg.com', role: 'quality', roleLabel: 'Quality Manager', status: 'active', lastActive: '2 hr ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face', plan: 'professional' },
  { id: '5', name: 'Sam Rivera', email: 'sam@acmecorp.com', role: 'sysadmin', roleLabel: 'System Admin', status: 'active', lastActive: 'Today', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face', plan: 'enterprise' },
  { id: '6', name: 'Lisa Park', email: 'lisa@acmecorp.com', role: 'security', roleLabel: 'Security Operator', status: 'inactive', lastActive: '3 days ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', plan: 'starter' },
];

const ROLE_BADGES: Record<UserRole, string> = {
  admin: 'bg-indigo-600/20 text-indigo-400',
  security: 'bg-cyan-500/20 text-cyan-400',
  engineer: 'bg-blue-500/20 text-blue-400',
  quality: 'bg-green-500/20 text-green-400',
  sysadmin: 'bg-orange-500/20 text-orange-400',
};

export default function UsersPage() {
  useScrollTop();
  const { user } = useAuth();
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('security');
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [editRole, setEditRole] = useState<UserRole>('security');

  const filtered = members.filter(m => {
    if (roleFilter !== 'all' && m.role !== roleFilter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sendInvite = () => {
    if (!inviteEmail.trim() || !/\S+@\S+\.\S+/.test(inviteEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success(`Invitation sent to ${inviteEmail}`, { description: `Role: ${inviteRole}` });
    setInviteEmail('');
    setShowInvite(false);
  };

  const deleteMember = (id: string) => {
    const member = members.find(m => m.id === id);
    setMembers(prev => prev.filter(m => m.id !== id));
    toast.success(`${member?.name} removed from team`);
  };

  const openEdit = (member: Member) => {
    setEditMember(member);
    setEditRole(member.role);
  };

  const saveEdit = () => {
    if (!editMember) return;
    const ROLE_LABELS: Record<UserRole, string> = {
      admin: 'Enterprise Admin', security: 'Security Operator',
      engineer: 'AI Engineer', quality: 'Quality Manager', sysadmin: 'System Admin',
    };
    setMembers(prev => prev.map(m => m.id === editMember.id
      ? { ...m, role: editRole, roleLabel: ROLE_LABELS[editRole] }
      : m
    ));
    toast.success(`${editMember.name}'s role updated to ${ROLE_LABELS[editRole]}`);
    setEditMember(null);
  };

  return (
    <DashboardLayout>
      <div className="page-transition max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-400" /> Team & Users
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{members.filter(m => m.status === 'active').length} active · {members.length} total members</p>
          </div>
          <button onClick={() => setShowInvite(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl hover:shadow-glow-cyan transition-all">
            <Plus className="w-4 h-4" /> Invite Member
          </button>
        </div>

        {/* Invite panel */}
        {showInvite && (
          <div className="p-5 rounded-2xl bg-card border border-indigo-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">Invite New Member</h3>
              <button onClick={() => setShowInvite(false)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1.5">Email Address</label>
                <input
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendInvite()}
                  placeholder="colleague@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Role</label>
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value as UserRole)}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="admin">Enterprise Admin</option>
                  <option value="security">Security Operator</option>
                  <option value="engineer">AI Engineer</option>
                  <option value="quality">Quality Manager</option>
                  <option value="sysadmin">System Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={sendInvite} className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl hover:shadow-glow-cyan transition-all flex items-center gap-2">
                <Mail className="w-4 h-4" /> Send Invitation
              </button>
              <button onClick={() => setShowInvite(false)} className="px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-xl hover:text-foreground transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Edit Role Modal */}
        {editMember && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-foreground">Edit Member Role</h3>
                <button onClick={() => setEditMember(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-muted/50">
                <img src={editMember.avatar} alt={editMember.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{editMember.name}</div>
                  <div className="text-xs text-muted-foreground">{editMember.email}</div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Assign Role</label>
                <div className="space-y-2">
                  {(['admin', 'security', 'engineer', 'quality', 'sysadmin'] as UserRole[]).map(r => (
                    <button key={r} onClick={() => setEditRole(r)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm transition-all ${editRole === r ? 'border-indigo-500/50 bg-indigo-600/10 text-indigo-400' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                      <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${ROLE_BADGES[r]}`}>
                        {r === 'admin' ? 'Enterprise Admin' : r === 'security' ? 'Security Operator' : r === 'engineer' ? 'AI Engineer' : r === 'quality' ? 'Quality Manager' : 'System Admin'}
                      </span>
                      {editRole === r && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={saveEdit} className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all text-sm">Save Changes</button>
                <button onClick={() => setEditMember(null)} className="flex-1 py-2.5 border border-border text-muted-foreground rounded-xl hover:text-foreground hover:bg-muted transition-colors text-sm">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Role stats */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {[
            { role: 'admin' as UserRole, label: 'Admins', count: members.filter(m => m.role === 'admin').length },
            { role: 'security' as UserRole, label: 'Security', count: members.filter(m => m.role === 'security').length },
            { role: 'engineer' as UserRole, label: 'Engineers', count: members.filter(m => m.role === 'engineer').length },
            { role: 'quality' as UserRole, label: 'Quality', count: members.filter(m => m.role === 'quality').length },
            { role: 'sysadmin' as UserRole, label: 'SysAdmins', count: members.filter(m => m.role === 'sysadmin').length },
          ].map(({ role, label, count }) => (
            <button key={role} onClick={() => setRoleFilter(roleFilter === role ? 'all' : role)} className={`p-3 rounded-xl border text-center transition-all ${roleFilter === role ? 'border-indigo-500/50 bg-indigo-600/10' : 'border-border bg-card hover:border-indigo-500/20'}`}>
              <div className="font-heading text-xl font-bold text-foreground">{count}</div>
              <div className="text-[10px] text-muted-foreground">{label}</div>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Members list */}
        <div className="space-y-2">
          {filtered.map(member => (
            <div key={member.id} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-indigo-500/20 transition-all duration-200">
              <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-border flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-heading font-semibold text-foreground text-sm">{member.name}</span>
                  {member.id === user?.id && <span className="text-[10px] bg-indigo-600/20 text-indigo-400 px-1.5 py-0.5 rounded-full">You</span>}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${ROLE_BADGES[member.role]}`}>{member.roleLabel}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{member.email} · Last active {member.lastActive}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                <span className="text-xs text-muted-foreground capitalize hidden sm:block">{member.status}</span>
                <button
                  onClick={() => openEdit(member)}
                  title="Edit role"
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                {member.id !== user?.id && (
                  <button
                    onClick={() => deleteMember(member.id)}
                    title="Remove member"
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No members match your filters</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border border-indigo-500/20 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-heading font-semibold text-foreground">Configure role permissions</p>
            <p className="text-xs text-muted-foreground mt-1">Customize what each role can view, edit, and manage.</p>
          </div>
          <Link to="/settings" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl hover:shadow-glow-cyan transition-all whitespace-nowrap">
            Manage Permissions <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
