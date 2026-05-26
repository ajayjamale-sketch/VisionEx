import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { BarChart3, TrendingUp, Download, ArrowRight } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const WEEKLY = [
  { day: 'Mon', detections: 8420, alerts: 12, accuracy: 97.1 },
  { day: 'Tue', detections: 9340, alerts: 8, accuracy: 97.3 },
  { day: 'Wed', detections: 10120, alerts: 15, accuracy: 96.9 },
  { day: 'Thu', detections: 11280, alerts: 6, accuracy: 97.5 },
  { day: 'Fri', detections: 12847, alerts: 8, accuracy: 97.4 },
  { day: 'Sat', detections: 6210, alerts: 4, accuracy: 97.8 },
  { day: 'Sun', detections: 5380, alerts: 2, accuracy: 98.1 },
];

const MONTHLY_TREND = [
  { month: 'Oct', streams: 32 }, { month: 'Nov', streams: 38 },
  { month: 'Dec', streams: 41 }, { month: 'Jan', streams: 43 },
  { month: 'Feb', streams: 45 }, { month: 'Mar', streams: 47 },
];

const DETECTION_DIST = [
  { name: 'Object', value: 5420, color: '#6366f1' },
  { name: 'Face', value: 2310, color: '#06b6d4' },
  { name: 'Vehicle', value: 3180, color: '#22c55e' },
  { name: 'Motion', value: 1490, color: '#f59e0b' },
  { name: 'Defect', value: 447, color: '#ef4444' },
];

const HEATMAP_HOURS = ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];
const HEATMAP_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HEATMAP_DATA = HEATMAP_DAYS.map(day => ({
  day,
  hours: HEATMAP_HOURS.map(h => ({
    hour: h,
    value: Math.floor(Math.random() * 100),
  })),
}));

function heatColor(val: number) {
  if (val < 20) return 'bg-indigo-500/10';
  if (val < 40) return 'bg-indigo-500/25';
  if (val < 60) return 'bg-indigo-500/45';
  if (val < 80) return 'bg-indigo-500/65';
  return 'bg-indigo-500/90';
}

export default function Analytics() {
  useScrollTop();
  const [period, setPeriod] = useState('7d');

  return (
    <DashboardLayout>
      <div className="page-transition max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-400" /> Analytics
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Visual intelligence metrics and performance insights</p>
          </div>
          <div className="flex items-center gap-2">
            {(['24h', '7d', '30d', '90d'] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${period === p ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                {p}
              </button>
            ))}
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-xl hover:text-foreground transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Detections', value: '63,847', change: '+18.3%', color: 'text-cyan-400' },
            { label: 'Avg Accuracy', value: '97.4%', change: '+0.3%', color: 'text-green-400' },
            { label: 'Total Alerts', value: '55', change: '-12.4%', color: 'text-yellow-400' },
            { label: 'Stream Uptime', value: '99.2%', change: '+0.1%', color: 'text-indigo-400' },
          ].map(({ label, value, change, color }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-border">
              <div className="font-heading text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              <div className={`text-xs font-medium mt-2 flex items-center gap-1 ${color}`}>
                <TrendingUp className="w-3 h-3" /> {change} vs prev period
              </div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-heading font-semibold text-foreground mb-1">Weekly Detections & Alerts</h3>
            <p className="text-xs text-muted-foreground mb-4">Daily breakdown over the past 7 days</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={WEEKLY}>
                <defs>
                  <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="detections" stroke="#6366f1" fill="url(#wGrad)" strokeWidth={2} name="Detections" />
                <Line type="monotone" dataKey="alerts" stroke="#ef4444" strokeWidth={2} dot={false} name="Alerts" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-heading font-semibold text-foreground mb-1">Detection Distribution</h3>
            <p className="text-xs text-muted-foreground mb-4">By type this week</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={DETECTION_DIST} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3} dataKey="value">
                  {DETECTION_DIST.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {DETECTION_DIST.map(d => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-muted-foreground">{d.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-heading font-semibold text-foreground mb-1">Active Streams Growth</h3>
            <p className="text-xs text-muted-foreground mb-4">Camera streams connected over 6 months</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={MONTHLY_TREND} barSize={32}>
                <defs>
                  <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4"/>
                    <stop offset="100%" stopColor="#6366f1"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="streams" fill="url(#streamGrad)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Heatmap */}
          <div className="p-5 rounded-2xl bg-card border border-border overflow-x-auto">
            <h3 className="font-heading font-semibold text-foreground mb-1">Activity Heatmap</h3>
            <p className="text-xs text-muted-foreground mb-4">Detection intensity by day and hour</p>
            <div className="min-w-[420px]">
              <div className="flex gap-1 mb-1 pl-8">
                {HEATMAP_HOURS.map(h => (
                  <div key={h} className="flex-1 text-[8px] text-muted-foreground text-center">{h}</div>
                ))}
              </div>
              {HEATMAP_DATA.map(row => (
                <div key={row.day} className="flex items-center gap-1 mb-1">
                  <div className="w-7 text-[10px] text-muted-foreground text-right pr-1">{row.day}</div>
                  {row.hours.map(cell => (
                    <div key={cell.hour} className={`flex-1 h-6 rounded ${heatColor(cell.value)}`} title={`${row.day} ${cell.hour}: ${cell.value} detections`} />
                  ))}
                </div>
              ))}
              <div className="flex items-center gap-2 mt-3 justify-end">
                <span className="text-[10px] text-muted-foreground">Low</span>
                {[10, 25, 45, 65, 90].map(v => (
                  <div key={v} className={`w-4 h-4 rounded ${heatColor(v)}`} />
                ))}
                <span className="text-[10px] text-muted-foreground">High</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border border-indigo-500/20 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-heading font-semibold text-foreground">Schedule automated intelligence reports</p>
            <p className="text-xs text-muted-foreground mt-1">Deliver weekly PDF summaries to your team via email or Slack.</p>
          </div>
          <Link to="/settings" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl hover:shadow-glow-cyan transition-all whitespace-nowrap">
            Setup Reports <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
