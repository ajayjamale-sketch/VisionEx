import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { SAMPLE_ALERTS } from '@/constants/data';
import { AlertTriangle, CheckCircle, Clock, Filter, RefreshCw, Bell, Search, ArrowRight, MoreHorizontal } from 'lucide-react';
import type { Alert } from '@/types';

const ALL_ALERTS: Alert[] = [
  { id: '1', type: 'intrusion', severity: 'high', message: 'Unauthorized access detected in restricted zone', location: 'Server Room B', timestamp: '2 min ago', status: 'new' },
  { id: '2', type: 'defect', severity: 'medium', message: 'Surface defect detected on product batch #4821', location: 'Production Line 3', timestamp: '8 min ago', status: 'new' },
  { id: '3', type: 'motion', severity: 'low', message: 'Motion detected outside business hours', location: 'Parking Lot C', timestamp: '15 min ago', status: 'acknowledged' },
  { id: '4', type: 'face', severity: 'medium', message: 'Unknown individual in secure area', location: 'R&D Lab', timestamp: '32 min ago', status: 'acknowledged' },
  { id: '5', type: 'vehicle', severity: 'low', message: 'Unregistered vehicle in reserved zone', location: 'Loading Bay 2', timestamp: '1 hr ago', status: 'resolved' },
  { id: '6', type: 'intrusion', severity: 'high', message: 'Perimeter breach detected on east fence', location: 'East Perimeter', timestamp: '1.5 hr ago', status: 'resolved' },
  { id: '7', type: 'motion', severity: 'medium', message: 'Unusual crowd density at main gate', location: 'Main Entrance', timestamp: '2 hr ago', status: 'new' },
  { id: '8', type: 'defect', severity: 'high', message: 'Critical defect rate spike on Line 1', location: 'Production Line 1', timestamp: '3 hr ago', status: 'new' },
  { id: '9', type: 'face', severity: 'low', message: 'Multiple failed facial recognition attempts', location: 'Executive Floor', timestamp: '4 hr ago', status: 'acknowledged' },
  { id: '10', type: 'vehicle', severity: 'medium', message: 'Vehicle speed violation in warehouse zone', location: 'Warehouse A', timestamp: '5 hr ago', status: 'resolved' },
];

const SEVERITY_COLORS: Record<string, string> = {
  high: 'text-red-500 bg-red-500/10 border-red-500/20',
  medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  low: 'text-green-500 bg-green-500/10 border-green-500/20',
};
const STATUS_STYLES: Record<string, string> = {
  new: 'bg-red-500/20 text-red-400 border border-red-500/30',
  acknowledged: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  resolved: 'bg-green-500/20 text-green-400 border border-green-500/30',
};
const TYPE_ICONS: Record<string, React.ElementType> = {
  intrusion: AlertTriangle,
  defect: AlertTriangle,
  motion: Clock,
  face: AlertTriangle,
  vehicle: Clock,
};

export default function Alerts() {
  useScrollTop();
  const [filter, setFilter] = useState<'all' | 'new' | 'acknowledged' | 'resolved'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [search, setSearch] = useState('');
  const [alerts, setAlerts] = useState(ALL_ALERTS);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = alerts.filter(a => {
    if (filter !== 'all' && a.status !== filter) return false;
    if (severityFilter !== 'all' && a.severity !== severityFilter) return false;
    if (search && !a.message.toLowerCase().includes(search.toLowerCase()) && !a.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleStatusChange = (id: string, status: Alert['status']) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const bulkAcknowledge = () => {
    setAlerts(prev => prev.map(a => selected.includes(a.id) ? { ...a, status: 'acknowledged' } : a));
    setSelected([]);
  };

  const counts = {
    all: alerts.length,
    new: alerts.filter(a => a.status === 'new').length,
    acknowledged: alerts.filter(a => a.status === 'acknowledged').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
  };

  return (
    <DashboardLayout>
      <div className="page-transition max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <Bell className="w-6 h-6 text-indigo-400" /> Alert Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{counts.new} new alerts require your attention</p>
          </div>
          <div className="flex gap-2">
            {selected.length > 0 && (
              <button onClick={bulkAcknowledge} className="px-4 py-2 text-sm font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-colors">
                Acknowledge ({selected.length})
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-xl hover:text-foreground transition-colors">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl hover:shadow-glow-cyan transition-all">
              Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3">
          {(['all', 'new', 'acknowledged', 'resolved'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`p-4 rounded-xl border transition-all text-center ${filter === s ? 'border-indigo-500/50 bg-indigo-600/10' : 'border-border bg-card hover:border-indigo-500/20'}`}
            >
              <div className="font-heading text-2xl font-bold text-foreground">{counts[s]}</div>
              <div className="text-xs text-muted-foreground capitalize mt-0.5">{s === 'all' ? 'Total' : s}</div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by message or location..."
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'high', 'medium', 'low'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSeverityFilter(s)}
                className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all capitalize ${severityFilter === s ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts list */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No alerts match your filters</p>
            </div>
          ) : filtered.map((alert) => {
            const Icon = TYPE_ICONS[alert.type] || AlertTriangle;
            return (
              <div
                key={alert.id}
                className={`flex items-center gap-4 p-4 rounded-xl border ${SEVERITY_COLORS[alert.severity]} cursor-pointer hover:opacity-90 transition-opacity`}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(alert.id)}
                  onChange={() => toggleSelect(alert.id)}
                  className="w-4 h-4 rounded border-border flex-shrink-0"
                  onClick={e => e.stopPropagation()}
                />
                <div className="w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground text-sm">{alert.message}</span>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-current/20">{alert.severity}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{alert.location} · {alert.timestamp} · {alert.type}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${STATUS_STYLES[alert.status]}`}>
                    {alert.status}
                  </span>
                  <div className="relative group">
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/10 transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <div className="absolute right-0 top-full mt-1 w-36 bg-card border border-border rounded-xl shadow-lg p-1 hidden group-hover:block z-10">
                      {alert.status !== 'acknowledged' && (
                        <button onClick={() => handleStatusChange(alert.id, 'acknowledged')} className="flex w-full items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg">
                          <Clock className="w-3 h-3" /> Acknowledge
                        </button>
                      )}
                      {alert.status !== 'resolved' && (
                        <button onClick={() => handleStatusChange(alert.id, 'resolved')} className="flex w-full items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg">
                          <CheckCircle className="w-3 h-3" /> Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border border-indigo-500/20 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-heading font-semibold text-foreground">Configure custom alert rules</p>
            <p className="text-xs text-muted-foreground mt-1">Set thresholds, escalation paths, and notification channels for your team.</p>
          </div>
          <Link to="/settings" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl hover:shadow-glow-cyan transition-all whitespace-nowrap">
            Configure Rules
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
