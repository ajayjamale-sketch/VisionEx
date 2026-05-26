import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { useAuth } from '@/hooks/useAuth';
import { DASHBOARD_STATS, SAMPLE_ALERTS, CAMERA_FEEDS } from '@/constants/data';
import { TrendingUp, TrendingDown, Video, Eye, Bell, Target, AlertTriangle, CheckCircle, Clock, ArrowRight, Activity, Shield, Wrench, Brain, BarChart3, Users, Cpu, Settings } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import type { UserRole } from '@/types';

// Data sets per time period
const PERIOD_DATA: Record<string, { time: string; detections: number }[]> = {
  '1h': [
    { time: '00m', detections: 87 }, { time: '10m', detections: 124 },
    { time: '20m', detections: 96 }, { time: '30m', detections: 145 },
    { time: '40m', detections: 112 }, { time: '50m', detections: 133 }, { time: '60m', detections: 158 },
  ],
  '24h': [
    { time: '00:00', detections: 234 }, { time: '04:00', detections: 189 },
    { time: '08:00', detections: 867 }, { time: '12:00', detections: 1240 },
    { time: '16:00', detections: 987 }, { time: '20:00', detections: 654 }, { time: '23:59', detections: 432 },
  ],
  '7d': [
    { time: 'Mon', detections: 5420 }, { time: 'Tue', detections: 6180 },
    { time: 'Wed', detections: 5890 }, { time: 'Thu', detections: 7240 },
    { time: 'Fri', detections: 6870 }, { time: 'Sat', detections: 3210 }, { time: 'Sun', detections: 2980 },
  ],
  '30d': [
    { time: 'W1', detections: 38400 }, { time: 'W2', detections: 42100 },
    { time: 'W3', detections: 39800 }, { time: 'W4', detections: 51200 },
  ],
};

const BAR_DATA: Record<string, { type: string; count: number }[]> = {
  '1h': [
    { type: 'Object', count: 210 }, { type: 'Face', count: 98 },
    { type: 'Vehicle', count: 132 }, { type: 'Motion', count: 64 }, { type: 'Defect', count: 18 },
  ],
  '24h': [
    { type: 'Object', count: 5420 }, { type: 'Face', count: 2310 },
    { type: 'Vehicle', count: 3180 }, { type: 'Motion', count: 1490 }, { type: 'Defect', count: 447 },
  ],
  '7d': [
    { type: 'Object', count: 37940 }, { type: 'Face', count: 16170 },
    { type: 'Vehicle', count: 22260 }, { type: 'Motion', count: 10430 }, { type: 'Defect', count: 3129 },
  ],
  '30d': [
    { type: 'Object', count: 163000 }, { type: 'Face', count: 69300 },
    { type: 'Vehicle', count: 95400 }, { type: 'Motion', count: 44700 }, { type: 'Defect', count: 13410 },
  ],
};

const PIE_DATA = [
  { name: 'Online', value: 42, color: '#06b6d4' },
  { name: 'Processing', value: 3, color: '#6366f1' },
  { name: 'Offline', value: 2, color: '#ef4444' },
];

const ICONS: Record<string, React.ElementType> = { Video, Eye, Bell, Target };
const ALERT_COLORS: Record<string, string> = {
  high: 'text-red-500 bg-red-500/10 border-red-500/20',
  medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  low: 'text-green-500 bg-green-500/10 border-green-500/20',
};
const STATUS_COLORS: Record<string, string> = {
  online: 'bg-cyan-500',
  processing: 'bg-indigo-500 animate-pulse',
  offline: 'bg-red-500',
};

// Role-specific quick actions
const ROLE_QUICK_ACTIONS: Record<UserRole, { icon: React.ElementType; label: string; desc: string; href: string; color: string }[]> = {
  admin: [
    { icon: Video, label: 'Live Monitor', desc: 'View all 47 camera streams', href: '/dashboard/monitor', color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40' },
    { icon: Bell, label: 'Active Alerts', desc: '8 alerts need attention', href: '/dashboard/alerts', color: 'from-red-600/20 to-red-500/10 border-red-500/20 hover:border-red-500/40' },
    { icon: Brain, label: 'AI Models', desc: '6 models deployed', href: '/dashboard/models', color: 'from-indigo-600/20 to-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40' },
    { icon: Users, label: 'Team', desc: '24 active members', href: '/dashboard/users', color: 'from-green-600/20 to-green-500/10 border-green-500/20 hover:border-green-500/40' },
  ],
  security: [
    { icon: Video, label: 'Live Monitor', desc: 'Monitor all live streams', href: '/dashboard/monitor', color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40' },
    { icon: Bell, label: 'Alerts Queue', desc: '8 unresolved alerts', href: '/dashboard/alerts', color: 'from-red-600/20 to-red-500/10 border-red-500/20 hover:border-red-500/40' },
    { icon: Shield, label: 'Incidents', desc: '3 active incidents', href: '/dashboard/security', color: 'from-orange-600/20 to-orange-500/10 border-orange-500/20 hover:border-orange-500/40' },
    { icon: BarChart3, label: 'Reports', desc: 'View security analytics', href: '/dashboard/analytics', color: 'from-indigo-600/20 to-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40' },
  ],
  engineer: [
    { icon: Brain, label: 'AI Models', desc: 'Manage & deploy models', href: '/dashboard/models', color: 'from-indigo-600/20 to-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40' },
    { icon: Cpu, label: 'Edge AI', desc: '12 edge devices connected', href: '/dashboard/edge', color: 'from-blue-600/20 to-blue-500/10 border-blue-500/20 hover:border-blue-500/40' },
    { icon: BarChart3, label: 'Performance', desc: 'Model accuracy: 97.4%', href: '/dashboard/analytics', color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40' },
    { icon: Settings, label: 'API Config', desc: 'Manage integrations', href: '/settings', color: 'from-green-600/20 to-green-500/10 border-green-500/20 hover:border-green-500/40' },
  ],
  quality: [
    { icon: Wrench, label: 'Inspections', desc: 'Run quality checks', href: '/dashboard/quality', color: 'from-green-600/20 to-green-500/10 border-green-500/20 hover:border-green-500/40' },
    { icon: Bell, label: 'Defect Alerts', desc: '3 defects detected today', href: '/dashboard/alerts', color: 'from-red-600/20 to-red-500/10 border-red-500/20 hover:border-red-500/40' },
    { icon: BarChart3, label: 'Quality Report', desc: '99.1% pass rate today', href: '/dashboard/analytics', color: 'from-indigo-600/20 to-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40' },
    { icon: Eye, label: 'Live Lines', desc: 'Monitor production lines', href: '/dashboard/monitor', color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40' },
  ],
  sysadmin: [
    { icon: Users, label: 'User Management', desc: '24 active users', href: '/dashboard/users', color: 'from-indigo-600/20 to-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40' },
    { icon: Activity, label: 'System Health', desc: 'All systems operational', href: '/dashboard/system', color: 'from-green-600/20 to-green-500/10 border-green-500/20 hover:border-green-500/40' },
    { icon: Shield, label: 'Security Logs', desc: '0 critical issues', href: '/dashboard/security', color: 'from-cyan-600/20 to-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40' },
    { icon: BarChart3, label: 'Usage Stats', desc: 'Platform analytics', href: '/dashboard/analytics', color: 'from-orange-600/20 to-orange-500/10 border-orange-500/20 hover:border-orange-500/40' },
  ],
};

// Role-specific stat overrides
const ROLE_STATS: Record<UserRole, typeof DASHBOARD_STATS> = {
  admin: DASHBOARD_STATS,
  security: [
    { label: 'Active Streams', value: '47', change: '+3', changeType: 'positive', icon: 'Video' },
    { label: 'Active Alerts', value: '8', change: '-2', changeType: 'positive', icon: 'Bell' },
    { label: 'Incidents Today', value: '3', change: '+1', changeType: 'negative', icon: 'Target' },
    { label: 'Resolved (24h)', value: '14', change: '+5', changeType: 'positive', icon: 'Eye' },
  ],
  engineer: [
    { label: 'Deployed Models', value: '6', change: '+1', changeType: 'positive', icon: 'Target' },
    { label: 'Avg Accuracy', value: '97.4%', change: '+0.2%', changeType: 'positive', icon: 'Eye' },
    { label: 'Edge Devices', value: '12', change: '+2', changeType: 'positive', icon: 'Video' },
    { label: 'API Calls Today', value: '48.2K', change: '+12%', changeType: 'positive', icon: 'Bell' },
  ],
  quality: [
    { label: 'Batches Inspected', value: '247', change: '+18', changeType: 'positive', icon: 'Eye' },
    { label: 'Defects Found', value: '3', change: '-7', changeType: 'positive', icon: 'Bell' },
    { label: 'Pass Rate', value: '99.1%', change: '+0.3%', changeType: 'positive', icon: 'Target' },
    { label: 'Lines Monitored', value: '4', change: '0', changeType: 'neutral', icon: 'Video' },
  ],
  sysadmin: [
    { label: 'Active Users', value: '24', change: '+3', changeType: 'positive', icon: 'Eye' },
    { label: 'System Uptime', value: '99.9%', change: '+0.1%', changeType: 'positive', icon: 'Target' },
    { label: 'Storage Used', value: '2.4TB', change: '+120GB', changeType: 'negative', icon: 'Video' },
    { label: 'API Errors', value: '0.02%', change: '-0.01%', changeType: 'positive', icon: 'Bell' },
  ],
};

export default function Dashboard() {
  useScrollTop();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  const role = (user?.role ?? 'admin') as UserRole;
  const stats = ROLE_STATS[role];
  const quickActions = ROLE_QUICK_ACTIONS[role];

  const areaData = useMemo(() => PERIOD_DATA[selectedPeriod], [selectedPeriod]);
  const barData = useMemo(() => BAR_DATA[selectedPeriod], [selectedPeriod]);

  // Trend label per period
  const trendLabel: Record<string, string> = {
    '1h': 'Detections — last 60 minutes',
    '24h': 'Detections over last 24 hours',
    '7d': 'Detections — last 7 days',
    '30d': 'Detections — last 30 days',
  };
  const barLabel: Record<string, string> = {
    '1h': 'Last hour by category',
    '24h': "Today's detections by category",
    '7d': 'Last 7 days by category',
    '30d': 'Last 30 days by category',
  };

  return (
    <DashboardLayout>
      <div className="page-transition space-y-6 max-w-7xl">
        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Good morning, {user?.name.split(' ')[0]} 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Viewing as <span className="text-indigo-400 font-medium">{user?.roleLabel}</span> — {user?.organization}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(['1h', '24h', '7d', '30d'] as const).map(p => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedPeriod === p
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = ICONS[stat.icon];
            return (
              <div key={stat.label} className="p-5 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 flex items-center justify-center">
                    {Icon && <Icon className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${stat.changeType === 'positive' ? 'text-green-500' : stat.changeType === 'negative' ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {stat.changeType === 'positive' ? <TrendingUp className="w-3 h-3" /> : stat.changeType === 'negative' ? <TrendingDown className="w-3 h-3" /> : null}
                    {stat.change}
                  </div>
                </div>
                <div className="font-heading text-2xl font-bold text-foreground mb-0.5">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-heading font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map(({ icon: Icon, label, desc, href, color }) => (
              <button
                key={href}
                onClick={() => navigate(href)}
                className={`group flex flex-col items-start p-4 rounded-2xl border bg-gradient-to-br transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md text-left ${color}`}
              >
                <Icon className="w-5 h-5 text-foreground mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-heading font-semibold text-foreground text-sm">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-5 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-semibold text-foreground">Detection Trend</h3>
                <p className="text-xs text-muted-foreground">{trendLabel[selectedPeriod]}</p>
              </div>
              <span className="text-xs text-cyan-500 font-medium">↑ 18.3%</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={areaData} key={selectedPeriod}>
                <defs>
                  <linearGradient id="detGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="detections" stroke="#6366f1" fill="url(#detGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-heading font-semibold text-foreground mb-1">Camera Status</h3>
            <p className="text-xs text-muted-foreground mb-4">47 total streams</p>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {PIE_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {PIE_DATA.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-xs text-muted-foreground">{entry.name}</span>
                  </div>
                  <span className="text-xs font-medium text-foreground">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detection types + Alerts */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-heading font-semibold text-foreground mb-1">Detection Types</h3>
            <p className="text-xs text-muted-foreground mb-4">{barLabel[selectedPeriod]}</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData} barSize={28} key={`bar-${selectedPeriod}`}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" vertical={false} />
                <XAxis dataKey="type" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="url(#barGrad)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-semibold text-foreground">Recent Alerts</h3>
                <p className="text-xs text-muted-foreground">8 active · 3 new</p>
              </div>
              <Link to="/dashboard/alerts" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {SAMPLE_ALERTS.slice(0, 4).map((alert) => (
                <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-xl border ${ALERT_COLORS[alert.severity]}`}>
                  <div className="flex-shrink-0 mt-0.5">
                    {alert.status === 'new' ? <AlertTriangle className="w-4 h-4" /> : alert.status === 'resolved' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground line-clamp-1">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.location} · {alert.timestamp}</p>
                  </div>
                  <span className={`flex-shrink-0 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${alert.status === 'new' ? 'bg-red-500/20 text-red-400' : 'bg-muted text-muted-foreground'}`}>
                    {alert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Camera Grid */}
        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-semibold text-foreground">Camera Feeds</h3>
              <p className="text-xs text-muted-foreground">Live overview of active streams</p>
            </div>
            <Link to="/dashboard/monitor" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
              Full monitor <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CAMERA_FEEDS.map((cam) => (
              <button key={cam.id} onClick={() => navigate('/dashboard/monitor')} className="relative group rounded-xl overflow-hidden border border-border hover:border-indigo-500/30 transition-all duration-200 cursor-pointer w-full">
                <img src={cam.thumbnail} alt={cam.name} className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <div className="text-[10px] font-medium text-white truncate">{cam.name}</div>
                </div>
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${STATUS_COLORS[cam.status]}`} />
              </button>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-foreground">Ready to scale your visual intelligence?</h3>
            <p className="text-sm text-muted-foreground mt-1">Upgrade to Enterprise for unlimited cameras, custom models, and dedicated support.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/pricing" className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300 text-sm whitespace-nowrap">
              Upgrade Plan
            </Link>
            <Link to="/contact" className="px-5 py-2.5 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors text-sm whitespace-nowrap">
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
