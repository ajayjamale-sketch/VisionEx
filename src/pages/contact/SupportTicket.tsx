import { useState } from 'react';
import { useScrollTop } from '@/hooks/useScrollTop';
import { LifeBuoy, CheckCircle, ArrowRight, Tag } from 'lucide-react';
import { toast } from 'sonner';

export default function SupportTicket() {
  useScrollTop();
  const [form, setForm] = useState({ name: '', email: '', category: '', severity: '', subject: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
    toast.success("Support ticket created!");
  };

  return (
    <div className="page-transition min-h-screen bg-background">
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-electric-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-electric-500/30 bg-electric-500/10 text-electric-400 text-xs font-medium mb-6">
            <LifeBuoy className="w-3.5 h-3.5" /> Support Center
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            How can we <span className="text-gradient-electric-purple">help?</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Submit a support ticket and our technical experts will get back to you with a solution as quickly as possible.
          </p>
        </div>
      </section>

      <section className="pb-24 relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-card border border-border shadow-card-dark">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Account Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Issue Category</label>
                    <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50">
                      <option value="">Select category...</option>
                      <option value="billing">Billing & Account</option>
                      <option value="technical">Technical Issue</option>
                      <option value="api">API / Integration</option>
                      <option value="bug">Bug Report</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Severity</label>
                    <select required value={form.severity} onChange={e => setForm({...form, severity: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50">
                      <option value="">Select severity...</option>
                      <option value="low">Low - General inquiry</option>
                      <option value="medium">Medium - Non-critical issue</option>
                      <option value="high">High - Core functionality impaired</option>
                      <option value="critical">Critical - Complete outage</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                  <input type="text" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Brief summary of the issue" className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                  <textarea rows={5} required value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Please provide as much detail as possible, including steps to reproduce the issue..." className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50 resize-none" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-electric-600 to-purple-500 text-white font-semibold rounded-xl hover:shadow-glow-electric transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 mt-4">
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Tag className="w-4 h-4" /> Submit Ticket</>}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Ticket Submitted</h3>
                <p className="text-muted-foreground mb-6">Your ticket ID is <strong>#TKT-{Math.floor(Math.random() * 10000)}</strong>. We've sent a confirmation email.</p>
                <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-electric-400 hover:text-electric-300 font-medium transition-colors">
                  <ArrowRight className="w-4 h-4 rotate-180" /> Return
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
