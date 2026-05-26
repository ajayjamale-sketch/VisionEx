import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const RELEASES = [
  {
    version: 'v2.4.0',
    date: 'May 18, 2026',
    title: 'TensorRT 8.6 Acceleration & Liveness Checks',
    highlights: [
      'Liveness spoofing check integrated into access biometric controls.',
      'Upgraded TensorRT engine bindings to v8.6 for 12% faster GPU inference.',
      'Introduced python SDK v2.4 wrapper supporting thread pools.',
    ],
  },
  {
    version: 'v2.3.0',
    date: 'April 2, 2026',
    title: 'OPC UA Integration & Custom Models Support',
    highlights: [
      'Added support for OPC UA industrial controllers on quality inspection routes.',
      'Allow upload of custom weights maps (YOLOv8) via model panel.',
      'Implemented rate-limiting retry protocols within client libraries.',
    ],
  },
];

export default function Changelog() {
  useScrollTop();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Calendar className="w-3.5 h-3.5" /> Product Updates
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            VisionEx Platform<br />
            <span className="text-gradient-indigo-cyan">Changelog & Releases</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Stay up to date on new AI model releases, edge agent container optimizations, and API features.
          </p>
        </div>
      </section>

      {/* 2. Release Feature Capabilities */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Product Delivery Philosophy</h2>
            <p className="text-muted-foreground">Continuous integration ensuring stable, secure, and performant neural computing.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: CheckCircle2, title: 'Zero Downtime Deploys', desc: 'Neural server models roll out progressively to prevent query disruptions.' },
              { icon: ShieldCheck, title: 'Backwards Compatibility', desc: 'API endpoints maintain versioning schedules. Legacy formats remain supported for 12 months.' },
              { icon: Clock, title: 'Weekly Updates', desc: 'Updates are pushed every Tuesday, covering client feedback items and security fixes.' }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Version Selector & Summary */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Latest Release Details</h2>
            <p className="text-muted-foreground">Select and review our recent product upgrades.</p>
          </div>
          <div className="space-y-12">
            {RELEASES.map(rel => (
              <div key={rel.version} className="relative border-l-2 border-indigo-500/30 pl-6 sm:pl-8 ml-2 sm:ml-4">
                <div className="absolute w-4 h-4 rounded-full bg-indigo-500 -left-[9px] top-1.5 border border-background shadow-glow-indigo" />
                <div className="bg-card border border-border p-6 rounded-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-xs font-bold text-indigo-400 font-mono">{rel.version}</span>
                    <span className="text-xs text-muted-foreground">{rel.date}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">{rel.title}</h3>
                  <ul className="space-y-2">
                    {rel.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Release Distribution List */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-3">API Versions Support Lifecycle</h2>
          <p className="text-xs text-muted-foreground mb-8">Detailed roadmap for older endpoint retirement.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-foreground">API v1.x (Legacy)</span>
                <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-[9px] font-bold text-yellow-400 uppercase">Deprecated</span>
              </div>
              <p className="text-xs text-muted-foreground">Retired on August 1st, 2026. Please upgrade endpoints to v2.x to prevent integration loss.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-foreground">API v2.x (Current)</span>
                <span className="px-2 py-0.5 rounded bg-green-500/10 text-[9px] font-bold text-green-400 uppercase">Active</span>
              </div>
              <p className="text-xs text-muted-foreground">Supported until late 2028. Receives regular feature additions and performance improvements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Never miss a product update</h2>
          <p className="text-muted-foreground mb-8">Subscribe to get notifications delivered directly to your inbox when a new version gets released.</p>
          {subscribed ? (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 inline-flex items-center gap-2 max-w-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-xs font-semibold text-foreground">Subscribed successfully!</span>
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              <button onClick={() => setSubscribed(true)} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
                Subscribe to Changes
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
