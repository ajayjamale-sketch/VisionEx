import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, Lock, Key, Award, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Security() {
  useScrollTop();
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [vulnDetails, setVulnDetails] = useState({ title: '', desc: '', email: '' });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vulnDetails.title && vulnDetails.desc && vulnDetails.email) {
      setReportSubmitted(true);
      setVulnDetails({ title: '', desc: '', email: '' });
    }
  };

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Security Center
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Enterprise-Grade Infrastructure<br />
            <span className="text-gradient-indigo-cyan">Security & Defense</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            How VisionEx safeguards your video streams, model configurations, and organization profiles with rigorous encryption and compliance standards.
          </p>
        </div>
      </section>

      {/* 2. Security Capabilities */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Defense-in-Depth Architecture</h2>
            <p className="text-muted-foreground">Multiple independent encryption and testing layers protecting active feeds.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: 'AES-256 Encryption', desc: 'All stream coordinates, metadata database rows, and vector databases are encrypted at rest with AES-256.' },
              { icon: Key, title: 'Role-Based Access (RBAC)', desc: 'Configure user boundaries with granular access levels (Admin, Engineer, Security, Quality).' },
              { icon: Award, title: 'SOC 2 Type II Certified', desc: 'Our processes and hosting infrastructures are audited yearly for operational security and trust.' }
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

      {/* 3. Interactive Vulnerability Report Form */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Coordinated Vulnerability Disclosure</h2>
            <p className="text-muted-foreground">Submit potential security bug findings directly to our response team.</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl">
            {reportSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
                <h4 className="font-heading font-semibold text-foreground">Report Received</h4>
                <p className="text-xs text-muted-foreground">Thank you for reporting. Our security engineers will analyze the finding and reply within 12 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Vulnerability Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CSRF on invite users link"
                      value={vulnDetails.title}
                      onChange={(e) => setVulnDetails({ ...vulnDetails, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="researcher@sec.com"
                      value={vulnDetails.email}
                      onChange={(e) => setVulnDetails({ ...vulnDetails, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Technical Description</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details of the bug, API endpoints involved, steps to reproduce, and payloads."
                    value={vulnDetails.desc}
                    onChange={(e) => setVulnDetails({ ...vulnDetails, desc: e.target.value })}
                    className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-xs focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>
                <div className="text-center pt-2">
                  <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold rounded-xl hover:shadow-glow-cyan transition-all flex items-center gap-2 mx-auto">
                    <ShieldAlert className="w-4 h-4" /> Submit Disclosure Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. Penetration Tests & Audits Log */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">External Security Audits</h2>
            <p className="text-muted-foreground">We undergo regular penetration testing by certified third-party cybersecurity firms.</p>
          </div>
          <div className="space-y-4">
            {[
              { firm: 'Bishop Fox, LLC', date: 'March 2026', scope: 'Complete API penetration test, edge agent vulnerability audits, and Supabase config review.' },
              { firm: 'Cobalt Labs, Inc.', date: 'November 2025', scope: 'Social engineering audits, internal auth infrastructure tests, and billing systems penetration checks.' }
            ].map((audit, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-500" /> {audit.firm} Audit
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{audit.scope}</p>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono self-start sm:self-auto flex-shrink-0">{audit.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Request our SOC 2 Report</h2>
          <p className="text-muted-foreground mb-8">Access our secure trust portal to sign our NDA and download compliance packages, including penetration reports.</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Request Security Pack
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
