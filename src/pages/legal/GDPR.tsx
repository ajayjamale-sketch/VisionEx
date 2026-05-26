import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Shield, EyeOff, UserCheck, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function GDPR() {
  useScrollTop();
  const [requestType, setRequestType] = useState<'access' | 'deletion' | 'export'>('access');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
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
            <Shield className="w-3.5 h-3.5" /> GDPR Compliance
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            European Privacy &<br />
            <span className="text-gradient-indigo-cyan">GDPR Compliance Guidelines</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            How VisionEx adheres to European General Data Protection Regulations. Learn about your data rights and our secure processing layers.
          </p>
        </div>
      </section>

      {/* 2. User Data Rights */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Your Statutory Data Rights</h2>
            <p className="text-muted-foreground">Under GDPR Chapter 3, you hold the complete authority to govern your personal records.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: UserCheck, title: 'Right to Rectify & Access', desc: 'Query and review all your account logs, active camera names, billing details, and update them instantly.' },
              { icon: EyeOff, title: 'Right to Be Forgotten', desc: 'Request absolute deletion of all profile vectors, emails, alert histories, and organizations logs.' },
              { icon: FileText, title: 'Right to Data Portability', desc: 'Download a complete JSON backup containing all profile parameters, camera listings, and metrics.' }
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

      {/* 3. Interactive Data Rights Request Form */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Privacy Consent Portal</h2>
            <p className="text-muted-foreground">Select a request type to initiate your statutory GDPR data access or deletion flow.</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl">
            <div className="flex border-b border-border bg-muted/20 rounded-t-xl overflow-hidden">
              {(['access', 'deletion', 'export'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setRequestType(type)}
                  className={`flex-1 py-3 text-xs font-semibold capitalize transition-colors ${requestType === type ? 'bg-card border-b-2 border-indigo-500 text-indigo-400' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {type === 'access' ? 'Data Access' : type === 'deletion' ? 'Account Deletion' : 'JSON Export'}
                </button>
              ))}
            </div>
            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
                <h4 className="font-heading font-semibold text-foreground">Request Submitted Successfully</h4>
                <p className="text-xs text-muted-foreground">Our legal team has received your verification request. We will email your verification link within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Verify Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {requestType === 'access' && 'You will receive an email containing a secure link to review your registered profile details, active integrations, and payment history.'}
                  {requestType === 'deletion' && 'WARNING: This will permanently delete your account, billing profile, camera streams configurations, and custom models. This action is irreversible.'}
                  {requestType === 'export' && 'Our automated script will package your account metrics, annotations datasets, and logs into a single downloadable .zip folder containing JSON logs.'}
                </div>
                <div className="text-center pt-2">
                  <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold rounded-xl hover:shadow-glow-cyan transition-all">
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. Subprocessors List */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Authorised Subprocessors</h2>
            <p className="text-muted-foreground">We partner with secure technology vendors to host files and manage payments.</p>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Amazon Web Services (AWS)', location: 'Dublin (Ireland) region', purpose: 'Primary cloud hosting, data backups, and GPU server clusters.' },
              { name: 'Stripe, Inc.', location: 'United States', purpose: 'Subscription invoicing, credit card handling, and payment gateways.' },
              { name: 'Supabase, Inc.', location: 'Frankfurt (Germany) region', purpose: 'Metadata indexing, user auth sessions, and vector databases.' }
            ].map(sub => (
              <div key={sub.name} className="p-4 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-heading font-semibold text-foreground text-sm">{sub.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{sub.purpose}</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-indigo-600/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 self-start sm:self-auto uppercase">{sub.location}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Questions about GDPR or data privacy?</h2>
          <p className="text-muted-foreground mb-8">Download our pre-signed Data Processing Addendum (DPA) or reach out directly to our privacy support channels.</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Submit Ticket
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
