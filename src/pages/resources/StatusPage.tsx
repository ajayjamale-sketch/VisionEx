import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, CheckCircle2, AlertCircle, Clock, Bell, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const STATUS_ITEMS = [
  { name: 'AI Ingress Gateway', status: 'operational', uptime: '99.99%', latency: '8ms' },
  { name: 'Neural Model Inference nodes', status: 'operational', uptime: '99.98%', latency: '14ms' },
  { name: 'Live Video Processing service', status: 'operational', uptime: '99.95%', latency: '24ms' },
  { name: 'Database Cluster & Vector Index', status: 'operational', uptime: '100%', latency: '2ms' },
];

export default function StatusPage() {
  useScrollTop();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero / Header */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-600/10 text-green-400 text-xs font-medium mb-6">
            <Activity className="w-3.5 h-3.5" /> Live System Monitor
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            VisionEx System Status
          </h1>
          <div className="mt-8 p-4 rounded-xl bg-green-500/10 border border-green-500/20 max-w-md mx-auto flex items-center justify-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span className="text-sm font-semibold text-foreground">All Core Services Operational</span>
          </div>
        </div>
      </section>

      {/* 2. Core Service List */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Service Status Overview</h2>
            <p className="text-muted-foreground">Detailed view of individual service operational statistics.</p>
          </div>
          <div className="space-y-3">
            {STATUS_ITEMS.map(item => (
              <div key={item.name} className="p-4 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <h4 className="font-heading font-semibold text-foreground text-sm">{item.name}</h4>
                </div>
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <div>Uptime: <span className="text-foreground font-semibold">{item.uptime}</span></div>
                  <div>Latency: <span className="text-foreground font-semibold">{item.latency}</span></div>
                  <span className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-400 uppercase">Operational</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Global Network Latency Graphic */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Global Routing Nodes</h2>
            <p className="text-muted-foreground">Our edge models are replicated globally to keep latency times low.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { region: 'Americas (US East)', ping: '11ms', load: 'Normal' },
              { region: 'Europe (Frankfurt)', ping: '16ms', load: 'Normal' },
              { region: 'Asia Pacific (Singapore)', ping: '24ms', load: 'Normal' }
            ].map(node => (
              <div key={node.region} className="p-5 rounded-2xl bg-card border border-border text-center">
                <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wide">{node.region}</span>
                <div className="font-heading text-3xl font-bold text-foreground my-2">{node.ping}</div>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-[9px] font-bold text-cyan-400 uppercase">{node.load} Load</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Past Incidents List */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Past Incident Log</h2>
            <p className="text-muted-foreground">Historical records of resolved platform events.</p>
          </div>
          <div className="space-y-4">
            {[
              { date: 'May 14, 2026', title: 'Temporary Latency Jitter - API Ingress', desc: 'Resolved. Our DNS load balancing routers encountered minor packet dropping. Fixed in 14 minutes by routing queries to backup endpoints.' },
              { date: 'April 28, 2026', title: 'Scheduled Database Cluster Maintenance', desc: 'Completed. Upgraded indexing libraries to optimize vector similarity searches. Uptime remained unaffected.' }
            ].map((incident, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-card border border-border">
                <span className="text-[10px] text-muted-foreground font-mono">{incident.date}</span>
                <h4 className="font-heading font-semibold text-foreground text-sm mt-1.5 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-cyan-400" /> {incident.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{incident.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Subscribe CTA */}
      <section className="py-20 bg-gradient-to-br from-green-600/10 to-indigo-500/10 border-t border-green-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Get Real-time Status Notifications</h2>
          <p className="text-muted-foreground mb-8">Receive instant SMS or email updates when services fail or undergo maintenance schedules.</p>
          {isSubscribed ? (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 inline-flex items-center gap-2 max-w-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-xs font-semibold text-foreground">Subscribed successfully!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter email for alerts"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-card border border-border rounded-xl text-xs focus:outline-none focus:border-green-500 transition-colors"
              />
              <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-indigo-500 text-white text-xs font-bold rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                <Bell className="w-4 h-4" /> Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
