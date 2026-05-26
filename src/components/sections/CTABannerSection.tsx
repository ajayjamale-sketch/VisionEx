import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function CTABannerSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-600/15 via-cyan-500/10 to-electric-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Get Started Today — Free 14-Day Trial
        </div>

        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          <span className="text-gradient-white">Transform how you see.</span>
          <br />
          <span className="text-gradient-indigo-cyan">Transform how you act.</span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Join 500+ enterprise teams using VisionEx to automate visual workflows, enhance security, and drive operational intelligence with AI.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => navigate(user ? '/dashboard' : '/register')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-base rounded-xl hover:shadow-glow-cyan hover:scale-105 transition-all duration-300"
          >
            {user ? 'Go to Dashboard' : 'Start Free Trial'}
            <ArrowRight className="w-5 h-5" />
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium text-base rounded-xl hover:border-indigo-500/50 hover:bg-muted transition-all duration-300"
          >
            <Play className="w-4 h-4" />
            Schedule Demo
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          {[
            '✓ No credit card required',
            '✓ Setup in under 30 minutes',
            '✓ Cancel anytime',
            '✓ SOC 2 Certified',
          ].map((item) => (
            <span key={item} className="text-muted-foreground">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
