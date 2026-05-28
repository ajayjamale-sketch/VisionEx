import { Link, useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Shield, Zap, Eye } from 'lucide-react';
import heroImg from '@/assets/hero-vision.jpg';
import { useAuth } from '@/hooks/useAuth';

const BADGES = [
  { icon: Shield, text: 'SOC 2 Certified' },
  { icon: Zap, text: '< 50ms Latency' },
  { icon: Eye, text: '97.4% Accuracy' },
];

export default function HeroSection() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleWatchDemo = () => {
    navigate(user ? '/dashboard' : '/login');
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />

      {/* Glow effects */}
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 dark:text-indigo-300 text-xs font-medium mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Trusted by 500+ Enterprise Teams
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              <span className="text-foreground">See Everything.</span>
              <br />
              <span className="text-gradient-indigo-cyan">Understand Instantly.</span>
              <br />
              <span className="text-foreground">Act Automatically.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              VisionEx is the enterprise AI platform for computer vision, real-time video intelligence, and automated visual analytics — powering security, quality control, and smart operations at scale.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {BADGES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-cyan-500" />
                  {text}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate(user ? '/dashboard' : '/register')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan hover:scale-105 transition-all duration-300"
              >
                {user ? 'Go to Dashboard' : 'Start Free Trial'}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleWatchDemo}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-600/20 flex items-center justify-center">
                  <Play className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
                ].map((src, i) => (
                  <img key={i} src={src} alt="User" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">4.9/5 from 200+ reviews</p>
              </div>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="animate-fade-in-right relative">
            <div className="relative rounded-2xl overflow-hidden border border-indigo-500/20 shadow-card-dark animate-float">
              <img
                src={heroImg}
                alt="VisionEx AI Platform Dashboard"
                className="w-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />

              {/* Floating stat cards */}
              <div className="absolute top-4 right-4 glass-card rounded-xl p-3 border border-white/20 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-medium text-foreground">Live Processing</span>
                </div>
                <div className="text-lg font-bold text-gradient-blue-cyan mt-1">47 Streams</div>
              </div>

              <div className="absolute bottom-4 left-4 glass-card rounded-xl p-3 border border-white/20 dark:border-white/10">
                <div className="text-xs text-muted-foreground mb-1">Detections Today</div>
                <div className="text-xl font-bold text-foreground">12,847</div>
                <div className="text-xs text-cyan-500">↑ 18.3% vs yesterday</div>
              </div>
            </div>

            {/* Glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-20 pt-10 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { label: 'Enterprise Clients', value: '500+' },
            { label: 'Cameras Monitored', value: '50,000+' },
            { label: 'AI Detections Daily', value: '10M+' },
            { label: 'Countries Deployed', value: '42' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold font-heading text-gradient-indigo-cyan">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
