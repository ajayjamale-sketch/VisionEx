import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollTop } from '@/hooks/useScrollTop';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Bell, Shield, Palette, Code2, CreditCard, Save } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

const TABS = [
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
  { id: 'api', icon: Code2, label: 'API Keys' },
  { id: 'billing', icon: CreditCard, label: 'Billing' },
];

const DEFAULT_NOTIFS = {
  alertEmail: true,
  alertSms: false,
  weeklyReport: true,
  systemUpdates: true,
  securityAlerts: true,
  teamActivity: false,
};

const DEFAULT_API_KEYS = [
  {
    id: 'prod',
    name: 'Production Key',
    created: 'Jan 15, 2025',
    value: 'vx_prod_9f4a7c2e8b1d6a3f0c5e2d8b',
    active: true,
    revealed: false,
  },
];

const DEFAULT_SECURITY = {
  sessionTimeout: '30 minutes',
  ipAllowlist: '',
  auditRetention: '90 days',
};

export default function Settings() {
  useScrollTop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notifications');
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();

  const [notifs, setNotifs] = useState<typeof DEFAULT_NOTIFS>(() => {
    const stored = localStorage.getItem('visionex-notification-settings');
    return stored ? JSON.parse(stored) : DEFAULT_NOTIFS;
  });
  const [density, setDensity] = useState(() => localStorage.getItem('visionex-density') || 'Compact');
  const [security, setSecurity] = useState<typeof DEFAULT_SECURITY>(() => {
    const stored = localStorage.getItem('visionex-security-settings');
    return stored ? JSON.parse(stored) : DEFAULT_SECURITY;
  });
  const [apiKeys, setApiKeys] = useState<typeof DEFAULT_API_KEYS>(() => {
    const stored = localStorage.getItem('visionex-api-keys');
    return stored ? JSON.parse(stored) : DEFAULT_API_KEYS;
  });
  const [showInvoices, setShowInvoices] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleNotif = (key: keyof typeof DEFAULT_NOTIFS) => {
    setNotifs(n => ({ ...n, [key]: !n[key] }));
  };

  const handleSave = () => {
    localStorage.setItem('visionex-notification-settings', JSON.stringify(notifs));
    localStorage.setItem('visionex-density', density);
    localStorage.setItem('visionex-security-settings', JSON.stringify(security));
    localStorage.setItem('visionex-api-keys', JSON.stringify(apiKeys));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const maskKey = (key: string) => `${key.slice(0, 8)}_${'*'.repeat(20)}`;

  const revealKey = (id: string) => {
    setApiKeys(keys => keys.map(key => key.id === id ? { ...key, revealed: !key.revealed } : key));
  };

  const generateKey = () => {
    const token = Math.random().toString(36).slice(2, 14) + Math.random().toString(36).slice(2, 14);
    const newKey = {
      id: Date.now().toString(),
      name: `Development Key ${apiKeys.length}`,
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      value: `vx_dev_${token}`,
      active: true,
      revealed: true,
    };
    setApiKeys(keys => [newKey, ...keys]);
  };

  const downloadInvoice = (invoice: string) => {
    const invoiceText = [
      'VisionEx Invoice',
      `Invoice: ${invoice}`,
      'Plan: Professional',
      'Amount: $499.00',
      'Status: Paid',
      'Billing period: Monthly',
    ].join('\n');
    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const deleteAccount = () => {
    const confirmed = window.confirm('Delete this demo account and sign out? This clears your local VisionEx session.');
    if (!confirmed) return;
    logout();
    localStorage.removeItem('visionex-user');
    navigate('/');
  };

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 ${enabled ? 'bg-gradient-to-r from-indigo-600 to-cyan-500' : 'bg-muted'}`}
    >
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
                    <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0 gap-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">{label}</div>
                        <div className="text-xs text-muted-foreground">{desc}</div>
                      </div>
                      <Toggle enabled={notifs[key as keyof typeof DEFAULT_NOTIFS]} onToggle={() => toggleNotif(key as keyof typeof DEFAULT_NOTIFS)} />
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
                    <div className="flex items-center justify-between py-3 border-b border-border gap-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">Session Timeout</div>
                        <div className="text-xs text-muted-foreground">Auto-logout after inactivity</div>
                      </div>
                      <select
                        value={security.sessionTimeout}
                        onChange={e => setSecurity(s => ({ ...s, sessionTimeout: e.target.value }))}
                        className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                      >
                        {['15 minutes', '30 minutes', '1 hour', '4 hours'].map(option => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border gap-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">IP Allowlist</div>
                        <div className="text-xs text-muted-foreground">Restrict access to specific IP ranges</div>
                      </div>
                      <input
                        value={security.ipAllowlist}
                        onChange={e => setSecurity(s => ({ ...s, ipAllowlist: e.target.value }))}
                        placeholder="Not configured"
                        className="w-44 bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                      />
                    </div>
                    <div className="flex items-center justify-between py-3 gap-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">Audit Log Retention</div>
                        <div className="text-xs text-muted-foreground">How long to keep activity logs</div>
                      </div>
                      <select
                        value={security.auditRetention}
                        onChange={e => setSecurity(s => ({ ...s, auditRetention: e.target.value }))}
                        className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                      >
                        {['30 days', '90 days', '180 days', '1 year'].map(option => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                  <h3 className="font-heading font-semibold text-red-500 mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">These actions are irreversible. Please proceed with caution.</p>
                  <button onClick={deleteAccount} className="px-4 py-2 text-sm font-medium text-red-500 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors">
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
                    <div className="grid grid-cols-2 gap-3">
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
                    <div className="flex flex-wrap gap-2">
                      {['Compact', 'Comfortable', 'Spacious'].map(d => (
                        <button key={d} onClick={() => setDensity(d)}
                          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${density === d ? 'bg-indigo-600/20 text-indigo-400' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
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
                  {apiKeys.map(key => (
                    <div key={key.id} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-sm font-medium text-foreground">{key.name}</div>
                          <div className="text-xs text-muted-foreground">Created {key.created}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-500">Active</span>
                      </div>
                      <div className="font-mono text-xs text-muted-foreground bg-background rounded-lg px-3 py-2 flex items-center justify-between gap-3">
                        <span className="truncate">{key.revealed ? key.value : maskKey(key.value)}</span>
                        <button onClick={() => revealKey(key.id)} className="text-indigo-400 hover:text-indigo-300 text-xs flex-shrink-0">
                          {key.revealed ? 'Hide' : 'Reveal'}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={generateKey} className="px-4 py-2 text-sm font-medium text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-600/10 transition-colors">
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
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-heading font-bold text-foreground">Professional Plan</div>
                        <div className="text-sm text-muted-foreground">$499/month - Renews May 26, 2026</div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">Active</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => navigate('/pricing')} className="px-4 py-2 text-sm font-medium text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-600/10 transition-colors">Upgrade Plan</button>
                    <button onClick={() => setShowInvoices(v => !v)} className="px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-xl hover:bg-muted transition-colors">
                      {showInvoices ? 'Hide Invoices' : 'View Invoices'}
                    </button>
                  </div>
                </div>
                {showInvoices && (
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h3 className="font-heading font-semibold text-foreground mb-4">Recent Invoices</h3>
                    <div className="space-y-2">
                      {['INV-2026-05', 'INV-2026-04', 'INV-2026-03'].map(invoice => (
                        <div key={invoice} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border">
                          <div>
                            <div className="text-sm font-medium text-foreground">{invoice}</div>
                            <div className="text-xs text-muted-foreground">$499.00 - Paid</div>
                          </div>
                          <button onClick={() => downloadInvoice(invoice)} className="text-xs text-indigo-400 hover:text-indigo-300">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              {saved && <span className="text-xs font-medium text-green-500">Saved</span>}
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
