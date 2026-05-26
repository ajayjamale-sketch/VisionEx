import { useState } from 'react';
import { Monitor, AlertTriangle, BarChart2, Activity } from 'lucide-react';
import dashboardImg from '@/assets/dashboard-preview.jpg';

const TABS = [
  { id: 'live', icon: Monitor, label: 'Live Monitor' },
  { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
  { id: 'analytics', icon: BarChart2, label: 'Analytics' },
  { id: 'activity', icon: Activity, label: 'Activity' },
];

const MINI_STATS = [
  { label: 'Streams', value: '47', color: 'text-cyan-400' },
  { label: 'Detections', value: '12.8K', color: 'text-indigo-400' },
  { label: 'Alerts', value: '8', color: 'text-yellow-400' },
  { label: 'Accuracy', value: '97.4%', color: 'text-green-400' },
];

export default function DashboardPreviewSection() {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <section id="demo" className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Live Dashboard Preview
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            A command center for your{' '}
            <span className="text-gradient-indigo-cyan">visual operations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor all your cameras, alerts, and AI insights from a single unified dashboard built for operations teams.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="relative max-w-5xl mx-auto">
          {/* Glow */}
          <div className="absolute -inset-6 bg-gradient-to-r from-indigo-600/20 via-cyan-500/10 to-electric-600/20 rounded-3xl blur-2xl" />

          {/* Browser chrome */}
          <div className="relative rounded-2xl border border-indigo-500/30 bg-card shadow-card-dark overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-4 h-6 rounded-md bg-background/60 flex items-center px-3">
                <span className="text-xs text-muted-foreground">app.visionex.ai/dashboard</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs text-cyan-400">Live</span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-4 sm:p-6">
              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {MINI_STATS.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-background/50 border border-border p-3">
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                    <div className={`text-xl font-bold font-heading ${stat.color}`}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mb-4 bg-muted/50 rounded-lg p-1 w-fit">
                {TABS.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      activeTab === id
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>

              {/* Main dashboard image */}
              <div className="rounded-xl overflow-hidden border border-border">
                <img
                  src={dashboardImg}
                  alt="VisionEx Dashboard"
                  className="w-full object-cover max-h-80"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature callouts */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { title: 'Multi-Camera Grid', desc: 'Monitor up to 64 feeds simultaneously with AI overlays and real-time detections visible on each stream.', icon: '📹' },
            { title: 'Smart Alert Inbox', desc: 'Prioritized alerts with evidence images, severity scores, and one-click escalation to your team.', icon: '🔔' },
            { title: 'Analytics Heatmaps', desc: 'Visualize movement patterns, hotspots, and activity trends with interactive analytical heatmaps.', icon: '📊' },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h4 className="font-heading font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
