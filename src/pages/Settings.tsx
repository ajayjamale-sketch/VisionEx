import { useState } from 'react';
import { useScrollTop } from '@/hooks/useScrollTop';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Bell, Shield, Palette, Code2, CreditCard, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

const TABS = [
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
  { id: 'api', icon: Code2, label: 'API Keys' },
  { id: 'billing', icon: CreditCard, label: 'Billing' },
];

export default function Settings() {
  useScrollTop();
  const [activeTab, setActiveTab] = useState('notifications');
  const { theme, setTheme } = useTheme();

  const [notifs, setNotifs] = useState({
    alertEmail: true, alertSms: false, weeklyReport: true,
    systemUpdates: true, securityAlerts: true, teamActivity: false,
  });

  const toggleNotif = (key: string) => setNotifs(n => ({ ...n, [key]: !n[key as keyof typeof n] }));

  const handleSave = () => toast.success('Settings saved!');

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 ${enabled ? 'bg-gradient-to-r from-indigo-600 to-cyan-500' : 'bg-muted'}`}>
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );

  return (
    <DashboardLayout>
      <div className="page-transition max-w-4xl">
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your platform preferences and account settings.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Tab Nav */}
          <div className="sm:w-48 flex-shrink-0">
            <nav className="space-y-1">
              {TABS.map(({ id, icon: Icon, label }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === id ? 'bg-gradient-to-r from-indigo-600/20 to-cyan-500/10 text-indigo-400 border border-indigo-500/30' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            {activeTab === 'notifications' && (
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="font-heading font-semibold text-foreground mb-5">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'alertEmail', label: 'Alert Notifications via Email', desc: 'Receive detected event alerts to your email' },
                    { key: 'alertSms', label: 'Alert Notifications via SMS', desc: 'Receive critical alerts via text message' },
                    { key: 'weeklyReport', label: 'Weekly Analytics Report', desc: 'Get a weekly summary of platform activity' },
                    { key: 'systemUpdates', label: 'System Updates', desc: 'Notifications about platform updates' },
                    { key: 'securityAlerts', label: 'Security Alerts', desc: 'High-priority security event notifications' },
                    { key: 'teamActivity', label: 'Team Activity', desc: 'Notifications when team members take actions' },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <div className="text-sm font-medium text-foreground">{label}</div>
                        <div className="text-xs text-muted-foreground">{desc}</div>
                      </div>
                      <Toggle enabled={notifs[key as keyof typeof notifs]} onToggle={() => toggleNotif(key)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h2 className="font-heading font-semibold text-foreground mb-5">Security Settings</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Session Timeout', desc: 'Auto-logout after inactivity', value: '30 minutes' },
                      { label: 'IP Allowlist', desc: 'Restrict access to specific IP ranges', value: 'Not configured' },
                      { label: 'Audit Log Retention', desc: 'How long to keep activity logs', value: '90 days' },
                    ].map(({ label, desc, value }) => (
                      <div key={label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <div className="text-sm font-medium text-foreground">{label}</div>
                          <div className="text-xs text-muted-foreground">{desc}</div>
                        </div>
                        <span className="text-xs font-medium text-indigo-400 bg-indigo-600/10 px-2 py-1 rounded-lg">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                  <h3 className="font-heading font-semibold text-red-500 mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">These actions are irreversible. Please proceed with caution.</p>
                  <button className="px-4 py-2 text-sm font-medium text-red-500 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="font-heading font-semibold text-foreground mb-5">Appearance</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['dark', 'light'].map(t => (
                        <button key={t} onClick={() => setTheme(t as 'dark' | 'light')}
                          className={`p-4 rounded-xl border text-center transition-all duration-200 ${theme === t ? 'border-indigo-500/50 bg-indigo-600/10' : 'border-border hover:border-indigo-500/20'}`}>
                          <div className={`w-full h-8 rounded-lg mb-2 ${t === 'dark' ? 'bg-gray-900' : 'bg-white border border-gray-200'}`} />
                          <span className="text-xs font-medium text-foreground capitalize">{t}</span>
                          {theme === t && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mx-auto mt-1" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">Dashboard Density</label>
                    <div className="flex gap-2">
                      {['Compact', 'Comfortable', 'Spacious'].map(d => (
                        <button key={d} className="px-4 py-2 text-xs font-medium rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors first:bg-indigo-600/20 first:text-indigo-400">
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="font-heading font-semibold text-foreground mb-5">API Keys</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium text-foreground">Production Key</div>
                        <div className="text-xs text-muted-foreground">Created Jan 15, 2025</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-500">Active</span>
                    </div>
                    <div className="font-mono text-xs text-muted-foreground bg-background rounded-lg px-3 py-2 flex items-center justify-between">
                      <span>vx_prod_••••••••••••••••••••</span>
                      <button className="text-indigo-400 hover:text-indigo-300 text-xs">Reveal</button>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-600/10 transition-colors">
                    + Generate New Key
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h2 className="font-heading font-semibold text-foreground mb-5">Current Plan</h2>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-600/10 to-cyan-500/10 border border-indigo-500/20 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-heading font-bold text-foreground">Professional Plan</div>
                        <div className="text-sm text-muted-foreground">$499/month · Renews May 26, 2026</div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">Active</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-600/10 transition-colors">Upgrade Plan</button>
                    <button className="px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-xl hover:bg-muted transition-colors">View Invoices</button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl hover:shadow-glow-indigo transition-all duration-300">
                <Save className="w-4 h-4" /> Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
