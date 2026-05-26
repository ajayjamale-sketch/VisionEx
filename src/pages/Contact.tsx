import { useState } from 'react';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Users, Zap } from 'lucide-react';
import { toast } from 'sonner';

const CONTACT_TOPICS = ['Sales Inquiry', 'Technical Support', 'Partnership', 'Press & Media', 'General Question', 'Enterprise Demo'];

export default function Contact() {
  useScrollTop();
  const [form, setForm] = useState({ name: '', email: '', company: '', topic: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
    if (!form.topic) errs.topic = 'Please select a topic';
    if (!form.message.trim() || form.message.length < 20) errs.message = 'Message must be at least 20 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch within 24 hours.");
  };

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium mb-6">
            <MessageSquare className="w-3.5 h-3.5" /> Get In Touch
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            We'd love to <span className="text-gradient-indigo-cyan">hear from you</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're evaluating VisionEx, need technical support, or want to discuss an enterprise partnership — our team is ready to help.
          </p>
        </div>
      </section>

      {/* Quick Options */}
      <section className="pb-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {[
              { icon: Zap, title: 'Sales & Demos', desc: 'Schedule a live demo and discuss how VisionEx fits your needs.', action: 'Book a Demo', color: 'text-indigo-400' },
              { icon: Users, title: 'Enterprise', desc: 'Custom pricing, on-premise deployment, and dedicated support.', action: 'Talk to Sales', color: 'text-cyan-400' },
              { icon: MessageSquare, title: 'Support', desc: 'Technical questions or account help from our expert team.', action: 'Open Ticket', color: 'text-electric-400' },
            ].map(({ icon: Icon, title, desc, action, color }) => (
              <div key={title} className="p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                <button className={`text-sm font-medium ${color} hover:opacity-80 transition-opacity`}>{action} →</button>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Contact Information</h2>
                <p className="text-muted-foreground text-sm">Reach our team directly through any of these channels.</p>
              </div>
              {[
                { icon: Mail, label: 'Email', value: 'hello@visionex.ai', sub: 'Response within 4 hours' },
                { icon: Phone, label: 'Phone', value: '+1 (888) 847-6639', sub: 'Mon–Fri, 9am–6pm PST' },
                { icon: MapPin, label: 'Office', value: '548 Market St, San Francisco', sub: 'CA 94105, United States' },
                { icon: Clock, label: 'Support Hours', value: '24/7 Enterprise Support', sub: 'Business hours for Starter/Pro' },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="text-sm font-medium text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-2xl bg-card border border-border">
                {!submitted ? (
                  <>
                    <h2 className="font-heading text-xl font-bold text-foreground mb-6">Send us a message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                          <input type="text" value={form.name} onChange={update('name')} placeholder="Alex Morrison"
                            className={`w-full px-4 py-2.5 rounded-xl bg-background border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${errors.name ? 'border-red-500' : 'border-border'}`} />
                          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Work Email *</label>
                          <input type="email" value={form.email} onChange={update('email')} placeholder="alex@company.com"
                            className={`w-full px-4 py-2.5 rounded-xl bg-background border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${errors.email ? 'border-red-500' : 'border-border'}`} />
                          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Company</label>
                        <input type="text" value={form.company} onChange={update('company')} placeholder="Acme Corporation"
                          className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Topic *</label>
                        <select value={form.topic} onChange={update('topic')}
                          className={`w-full px-4 py-2.5 rounded-xl bg-background border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${errors.topic ? 'border-red-500' : 'border-border'}`}>
                          <option value="">Select a topic...</option>
                          {CONTACT_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {errors.topic && <p className="mt-1 text-xs text-red-500">{errors.topic}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                        <textarea value={form.message} onChange={update('message')} rows={5} placeholder="Tell us about your use case, team size, and any specific requirements..."
                          className={`w-full px-4 py-2.5 rounded-xl bg-background border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none ${errors.message ? 'border-red-500' : 'border-border'}`} />
                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                      </div>
                      <button type="submit" disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2">
                        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">Message received!</h3>
                    <p className="text-muted-foreground mb-4">Our team will respond within 24 hours.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', topic: '', message: '' }); }}
                      className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                      Send another message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
