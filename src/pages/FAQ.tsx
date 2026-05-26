import { useScrollTop } from '@/hooks/useScrollTop';
import FAQSection from '@/components/sections/FAQSection';
import { Link } from 'react-router-dom';
import { MessageSquare, FileText, Video } from 'lucide-react';

export default function FAQ() {
  useScrollTop();

  return (
    <div className="page-transition min-h-screen bg-background">
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            Help Center
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-gradient-indigo-cyan">Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Find answers to common questions about VisionEx's platform, pricing, and integrations.
          </p>
        </div>
      </section>

      {/* Quick help links */}
      <section className="py-10 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with our team in real time for immediate help.', color: 'text-cyan-400' },
              { icon: FileText, title: 'Documentation', desc: 'Full technical docs, guides, and API references.', color: 'text-indigo-400' },
              { icon: Video, title: 'Video Tutorials', desc: 'Step-by-step setup and feature walkthrough videos.', color: 'text-electric-400' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="p-5 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200 text-center">
                <Icon className={`w-6 h-6 ${color} mx-auto mb-3`} />
                <h3 className="font-heading font-semibold text-foreground mb-1 text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="py-16 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6">Our support team is available 24/7 for Enterprise customers and during business hours for all other plans.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
