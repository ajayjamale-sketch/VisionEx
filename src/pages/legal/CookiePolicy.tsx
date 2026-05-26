import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info, ToggleLeft, ToggleRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function CookiePolicy() {
  useScrollTop();
  const [essential, setEssential] = useState(true); // essential cannot be toggled off
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Legal Standards
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
            VisionEx Platform<br />
            <span className="text-gradient-indigo-cyan">Cookie Policy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            How we use cookies to secure authentication sessions, store configurations, and analyze platform usage patterns.
          </p>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Cookie Classification</h2>
            <p className="text-muted-foreground">Every cookie we set has a specific, transparent purpose.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: 'Essential Cookies', desc: 'Required for secure login authentication, verification, and API tokens setup. Cannot be disabled.' },
              { icon: Info, title: 'Functional Cookies', desc: 'Remember preferences like dark mode, dashboard layout choices, and telemetry display configurations.' },
              { icon: ToggleRight, title: 'Analytical Tracking', desc: 'Gather anonymous interaction metrics to help us optimize user experience and platform speed.' }
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

      {/* 3. Interactive Consent Center */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Consent Preferences</h2>
            <p className="text-muted-foreground">Toggle and save your preferred cookie configurations below.</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/30 border border-border">
              <div>
                <h4 className="font-heading font-semibold text-foreground text-sm">Strictly Necessary Cookies</h4>
                <p className="text-xs text-muted-foreground mt-1">Handles security, authentication, and layout choices. Active by default.</p>
              </div>
              <button disabled className="text-indigo-500 cursor-not-allowed">
                <ToggleRight className="w-8 h-8" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/30 border border-border">
              <div>
                <h4 className="font-heading font-semibold text-foreground text-sm">Performance & Analytics Cookies</h4>
                <p className="text-xs text-muted-foreground mt-1">Collects details on page loads and buttons clicked to help us improve features.</p>
              </div>
              <button onClick={() => setAnalytics(!analytics)} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                {analytics ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-muted-foreground" />}
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/30 border border-border">
              <div>
                <h4 className="font-heading font-semibold text-foreground text-sm">Marketing & Advertising Cookies</h4>
                <p className="text-xs text-muted-foreground mt-1">Used to deliver targeted ads when you browse other websites. Always off unless allowed.</p>
              </div>
              <button onClick={() => setMarketing(!marketing)} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                {marketing ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-muted-foreground" />}
              </button>
            </div>
            <div className="text-center">
              <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold rounded-xl hover:shadow-glow-cyan transition-all">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Detailed Cookie Inventory */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Cookie Manifest Inventory</h2>
            <p className="text-muted-foreground">List of technical cookies set by the VisionEx web application.</p>
          </div>
          <div className="space-y-3">
            {[
              { name: 'vx_session_token', type: 'Essential', duration: '30 Days', desc: 'Stores secure authentication web token to identify user account session.' },
              { name: 'vx_theme_preference', type: 'Functional', duration: 'Permanent', desc: 'Remembers dark/light mode stylesheet choices.' },
              { name: '_ga_tracker', type: 'Analytics', duration: '2 Years', desc: 'Allows Google Analytics engine to cluster anonymous activity maps.' }
            ].map(cookie => (
              <div key={cookie.name} className="p-4 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-heading font-semibold text-foreground text-sm font-mono">{cookie.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{cookie.desc}</p>
                </div>
                <div className="flex items-center gap-6 text-xs text-muted-foreground flex-shrink-0">
                  <div>Type: <span className="text-foreground font-semibold">{cookie.type}</span></div>
                  <div>Duration: <span className="text-foreground font-semibold">{cookie.duration}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Have questions about your data privacy?</h2>
          <p className="text-muted-foreground mb-8">Read our complete Privacy Policy, or write directly to our Data Protection Officer (DPO).</p>
          <div className="flex justify-center gap-4">
            <Link to="/privacy" className="px-8 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
              Read Privacy Policy
            </Link>
            <Link to="/contact" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Contact DPO
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
