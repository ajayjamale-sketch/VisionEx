import { useState } from 'react';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Calendar, Video, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function BookDemo() {
  useScrollTop();
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', date: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
    toast.success("Demo request received!");
  };

  return (
    <div className="page-transition min-h-screen bg-background">
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-6">
            <Video className="w-3.5 h-3.5" /> Live Demonstration
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            See VisionEx in <span className="text-gradient-indigo-cyan">Action</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a personalized walkthrough with our experts to see how VisionEx can transform your visual intelligence workflows.
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
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Work Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Company</label>
                    <input type="text" required value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Role</label>
                    <input type="text" required value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Date</label>
                  <input type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">What are you looking to solve?</label>
                  <textarea rows={4} required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 mt-4">
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Calendar className="w-4 h-4" /> Request Demo</>}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Demo Requested!</h3>
                <p className="text-muted-foreground mb-6">Our sales team will be in touch shortly to confirm your booking.</p>
                <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
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
