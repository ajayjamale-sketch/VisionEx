import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Shield, AlertTriangle, CheckCircle, Clock, Eye, Lock, ArrowRight, X, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface SecurityEvent {
  id: string; type: string; severity: string; event: string;
  location: string; timestamp: string; operator: string;
  status: 'active' | 'resolved' | 'under_review'; evidence: string | null;
}

const INITIAL_EVENTS: SecurityEvent[] = [
  { id: '1', type: 'intrusion', severity: 'high', event: 'Unauthorized zone entry', location: 'Server Room B', timestamp: '10:42 AM', operator: 'Jordan Blake', status: 'active', evidence: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=120&fit=crop' },
  { id: '2', type: 'access', severity: 'medium', event: 'Tailgating attempt at main entrance', location: 'Building A Entrance', timestamp: '09:18 AM', operator: 'Jordan Blake', status: 'resolved', evidence: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=120&fit=crop' },
  { id: '3', type: 'perimeter', severity: 'high', event: 'Perimeter breach — east fence', location: 'East Perimeter', timestamp: '08:55 AM', operator: 'Unassigned', status: 'active', evidence: null },
  { id: '4', type: 'face', severity: 'medium', event: 'Unknown individual in restricted area', location: 'R&D Lab Floor 3', timestamp: 'Yesterday', operator: 'Jordan Blake', status: 'under_review', evidence: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=200&h=120&fit=crop' },
  { id: '5', type: 'vehicle', severity: 'low', event: 'Unregistered vehicle parked in restricted zone', location: 'Lot B', timestamp: 'Yesterday', operator: 'Sam Rivera', status: 'resolved', evidence: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=200&h=120&fit=crop' },
];

const STATUS_STYLES: Record<string, string> = {
  active: 'text-red-500 bg-red-500/10 border-red-500/20',
  resolved: 'text-green-500 bg-green-500/10 border-green-500/20',
  under_review: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
};

const ACCESS_LOG = [
  { user: 'Alex Morrison', action: 'Dashboard login', time: '10:52 AM', ip: '192.168.1.42', status: 'success' },
  { user: 'Priya Nair', action: 'Model deployed', time: '10:38 AM', ip: '10.0.0.15', status: 'success' },
  { user: 'Unknown', action: 'Failed login (3 attempts)', time: '10:12 AM', ip: '203.0.113.42', status: 'failure' },
  { user: 'Jordan Blake', action: 'Alert acknowledged', time: '09:45 AM', ip: '192.168.1.88', status: 'success' },
  { user: 'Marcus Chen', action: 'Report exported', time: '09:20 AM', ip: '10.0.0.22', status: 'success' },
];

export default function Security() {
  useScrollTop();
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const [events, setEvents] = useState<SecurityEvent[]>(INITIAL_EVENTS);
  const [detailEvent, setDetailEvent] = useState<SecurityEvent | null>(null);

  const filtered = events.filter(e =>
    filter === 'all' || e.status === filter || (filter === 'active' && e.status === 'under_review')
  );

  const resolveEvent = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'resolved' } : e));
    const ev = events.find(e => e.id === id);
    toast.success(`Incident resolved`, { description: ev?.event });
    if (detailEvent?.id === id) setDetailEvent(prev => prev ? { ...prev, status: 'resolved' } : null);
  };

  const reviewEvent = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'under_review' } : e));
    const ev = events.find(e => e.id === id);
    toast.success('Marked for review', { description: ev?.event });
  };

  return (
    <DashboardLayout>
      <div className="page-transition max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <Shield className="w-6 h-6 text-cyan-400" /> Security & Incidents
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-red-400">{events.filter(e => e.status === 'active').length} active incidents</span> · {events.filter(e => e.status === 'resolved').length} resolved today
            </p>
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'resolved'] as const).map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all capitalize ${filter === s ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Incidents', value: events.filter(e => e.status === 'active').length, icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
            { label: 'Resolved Today', value: events.filter(e => e.status === 'resolved').length, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
            { label: 'Under Review', value: events.filter(e => e.status === 'under_review').length, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
            { label: 'Cameras Monitored', value: 47, icon: Eye, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-border">
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="font-heading text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Incidents */}
        <div>
          <h2 className="font-heading font-semibold text-foreground mb-3">Security Incidents</h2>
          <div className="space-y-3">
            {filtered.map(event => (
              <div key={event.id} className={`flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border ${STATUS_STYLES[event.status]}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-heading font-semibold text-foreground text-sm">{event.event}</span>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-current/20">{event.severity}</span>
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full border ${STATUS_STYLES[event.status]}`}>{event.status.replace('_', ' ')}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{event.location} · {event.timestamp} · Assigned: {event.operator}</div>
                </div>
                {event.evidence && (
                  <div className="flex-shrink-0">
                    <img src={event.evidence} alt="Evidence" className="w-28 h-16 object-cover rounded-xl border border-border" />
                  </div>
                )}
                <div className="flex gap-2 flex-shrink-0 sm:flex-col sm:justify-center">
                  <button
                    onClick={() => setDetailEvent(event)}
                    className="px-3 py-1.5 text-xs font-medium bg-current/10 rounded-lg hover:bg-current/20 transition-colors"
                  >
                    View Details
                  </button>
                  {event.status === 'active' && (
                    <button
                      onClick={() => reviewEvent(event.id)}
                      className="px-3 py-1.5 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                    >
                      Review
                    </button>
                  )}
                  {event.status !== 'resolved' && (
                    <button
                      onClick={() => resolveEvent(event.id)}
                      className="px-3 py-1.5 text-xs font-medium bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail modal */}
        {detailEvent && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-foreground">Incident Details</h3>
                <button onClick={() => setDetailEvent(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {detailEvent.evidence && (
                <img src={detailEvent.evidence} alt="Evidence" className="w-full h-40 object-cover rounded-xl mb-4 border border-border" />
              )}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="text-xs text-muted-foreground">Event</div>
                    <div className="text-sm font-medium text-foreground mt-0.5">{detailEvent.event}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="text-sm font-medium text-foreground mt-0.5">{detailEvent.location}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="text-xs text-muted-foreground">Severity</div>
                    <div className="text-sm font-semibold capitalize text-foreground mt-0.5">{detailEvent.severity}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="text-xs text-muted-foreground">Assigned To</div>
                    <div className="text-sm font-medium text-foreground mt-0.5">{detailEvent.operator}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  {detailEvent.status !== 'resolved' && (
                    <button
                      onClick={() => { resolveEvent(detailEvent.id); setDetailEvent(null); }}
                      className="flex-1 py-2.5 bg-gradient-to-r from-green-600 to-cyan-500 text-white font-semibold rounded-xl text-sm hover:shadow-lg transition-all"
                    >
                      Mark Resolved
                    </button>
                  )}
                  <button onClick={() => setDetailEvent(null)} className="flex-1 py-2.5 border border-border text-muted-foreground rounded-xl hover:text-foreground hover:bg-muted transition-colors text-sm">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audit log */}
        <div>
          <h2 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" /> Audit Log
          </h2>
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Action</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">IP Address</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {ACCESS_LOG.map((log, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => toast.info(`${log.user} — ${log.action}`, { description: `IP: ${log.ip} at ${log.time}` })}>
                    <td className="px-4 py-3 text-sm text-foreground">{log.user}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{log.action}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{log.time}</td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground hidden md:table-cell">{log.ip}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${log.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-600/10 to-indigo-500/10 border border-cyan-500/20 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-heading font-semibold text-foreground">Configure intrusion detection rules</p>
            <p className="text-xs text-muted-foreground mt-1">Set custom zones, sensitivity levels, and escalation paths for your team.</p>
          </div>
          <Link to="/settings" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-cyan-600 to-indigo-500 text-white rounded-xl hover:shadow-glow-cyan transition-all whitespace-nowrap">
            Configure Rules <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
