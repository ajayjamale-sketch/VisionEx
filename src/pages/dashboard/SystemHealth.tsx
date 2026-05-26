import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Activity, Server, Database, Zap, CheckCircle, AlertTriangle, Clock, RefreshCw, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const SERVICES = [
  { name: 'AI Inference Engine', status: 'operational', latency: '12ms', uptime: '99.99%', incidents: 0 },
  { name: 'Video Processing Service', status: 'operational', latency: '28ms', uptime: '99.97%', incidents: 0 },
  { name: 'Database Cluster', status: 'operational', latency: '4ms', uptime: '100%', incidents: 0 },
  { name: 'Storage Service', status: 'degraded', latency: '180ms', uptime: '99.3%', incidents: 1 },
  { name: 'Authentication Service', status: 'operational', latency: '8ms', uptime: '100%', incidents: 0 },
  { name: 'Alert Notification System', status: 'operational', latency: '45ms', uptime: '99.95%', incidents: 0 },
  { name: 'Edge Sync Gateway', status: 'operational', latency: '22ms', uptime: '99.88%', incidents: 0 },
  { name: 'API Gateway', status: 'operational', latency: '6ms', uptime: '99.99%', incidents: 0 },
];

const CPU_DATA = Array.from({ length: 20 }, (_, i) => ({
  t: `${i * 3}s`,
  cpu: 30 + Math.random() * 40,
  mem: 55 + Math.random() * 20,
}));

const NETWORK_DATA = Array.from({ length: 12 }, (_, i) => ({
  t: `${i}m`,
  in: Math.floor(100 + Math.random() * 200),
  out: Math.floor(50 + Math.random() * 100),
}));

const STATUS_STYLES: Record<string, string> = {
  operational: 'text-green-500 bg-green-500/10 border-green-500/20',
  degraded: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  down: 'text-red-500 bg-red-500/10 border-red-500/20',
};

export default function SystemHealth() {
  useScrollTop();

  const operational = SERVICES.filter(s => s.status === 'operational').length;

  return (
    <DashboardLayout>
      <div className="page-transition max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <Activity className="w-6 h-6 text-green-400" /> System Health
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-400">{operational}/{SERVICES.length} services operational</span>
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-xl hover:text-foreground transition-colors">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* Overall status banner */}
        <div className={`p-4 rounded-2xl border flex items-center gap-3 ${operational === SERVICES.length ? 'bg-green-500/10 border-green-500/20' : 'bg-yellow-500/10 border-yellow-500/20'}`}>
          {operational === SERVICES.length ? (
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          )}
          <div>
            <p className="font-heading font-semibold text-foreground text-sm">
              {operational === SERVICES.length ? 'All systems operational' : `${SERVICES.length - operational} service degraded`}
            </p>
            <p className="text-xs text-muted-foreground">Last checked: Just now · Platform uptime: 99.9%</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'CPU Usage', value: '62%', icon: Server, warning: false },
            { label: 'Memory Usage', value: '68%', icon: Database, warning: false },
            { label: 'Storage Used', value: '2.4 TB', icon: Database, warning: false },
            { label: 'API Error Rate', value: '0.02%', icon: Zap, warning: false },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-border">
              <Icon className="w-5 h-5 text-indigo-400 mb-3" />
              <div className="font-heading text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-heading font-semibold text-foreground mb-1">CPU & Memory</h3>
            <p className="text-xs text-muted-foreground mb-4">Real-time utilization (last 60 seconds)</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={CPU_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} interval={4} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '11px' }} />
                <Line type="monotone" dataKey="cpu" stroke="#6366f1" strokeWidth={2} dot={false} name="CPU %" />
                <Line type="monotone" dataKey="mem" stroke="#06b6d4" strokeWidth={2} dot={false} name="Memory %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-heading font-semibold text-foreground mb-1">Network Traffic</h3>
            <p className="text-xs text-muted-foreground mb-4">Inbound/outbound (MB/s) last 12 min</p>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={NETWORK_DATA}>
                <defs>
                  <linearGradient id="netIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="netOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                <XAxis dataKey="t" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="in" stroke="#6366f1" fill="url(#netIn)" strokeWidth={2} name="In (MB/s)" />
                <Area type="monotone" dataKey="out" stroke="#06b6d4" fill="url(#netOut)" strokeWidth={2} name="Out (MB/s)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Services table */}
        <div>
          <h2 className="font-heading font-semibold text-foreground mb-3">Service Status</h2>
          <div className="space-y-2">
            {SERVICES.map(svc => (
              <div key={svc.name} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-indigo-500/20 transition-all">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${svc.status === 'operational' ? 'bg-green-500' : svc.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                <span className="flex-1 text-sm font-medium text-foreground">{svc.name}</span>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-center hidden sm:block">
                    <div className="text-xs font-medium text-foreground">{svc.latency}</div>
                    <div className="text-[10px] text-muted-foreground">Latency</div>
                  </div>
                  <div className="text-center hidden sm:block">
                    <div className="text-xs font-medium text-foreground">{svc.uptime}</div>
                    <div className="text-[10px] text-muted-foreground">Uptime</div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${STATUS_STYLES[svc.status]}`}>{svc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-green-600/10 to-indigo-500/10 border border-green-500/20 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-heading font-semibold text-foreground">Configure system health alerts</p>
            <p className="text-xs text-muted-foreground mt-1">Get notified via Slack, email, or PagerDuty when services degrade.</p>
          </div>
          <Link to="/settings" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-green-600 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all whitespace-nowrap">
            Configure Alerts <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
