import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useScrollTop } from '@/hooks/useScrollTop';

export default function NotFound() {
  useScrollTop();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4">
        <div className="font-heading text-[120px] sm:text-[160px] font-bold leading-none text-gradient-indigo-cyan opacity-20 mb-4">
          404
        </div>
        <div className="-mt-16 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Page not found</h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              <Home className="w-4 h-4" /> Go Home
            </Link>
            <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
          {[
            { label: 'Features', href: '/features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Contact', href: '/contact' },
          ].map(({ label, href }) => (
            <Link key={href} to={href} className="py-2 px-3 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-foreground hover:border-indigo-500/30 transition-all duration-200 text-center">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
