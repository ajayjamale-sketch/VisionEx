import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, AlertCircle, Zap } from 'lucide-react';
import { useAuth, DEMO_USERS } from '@/hooks/useAuth';
import { useScrollTop } from '@/hooks/useScrollTop';
import { toast } from 'sonner';
import type { UserRole } from '@/types';

const ROLE_COLORS: Record<string, string> = {
  admin: 'border-indigo-500/40 hover:border-indigo-500 hover:bg-indigo-600/10',
  security: 'border-cyan-500/40 hover:border-cyan-500 hover:bg-cyan-500/10',
  engineer: 'border-blue-500/40 hover:border-blue-500 hover:bg-blue-500/10',
  quality: 'border-green-500/40 hover:border-green-500 hover:bg-green-500/10',
  sysadmin: 'border-orange-500/40 hover:border-orange-500 hover:bg-orange-500/10',
};

const ROLE_BADGE: Record<string, string> = {
  admin: 'bg-indigo-600/20 text-indigo-400',
  security: 'bg-cyan-500/20 text-cyan-400',
  engineer: 'bg-blue-500/20 text-blue-400',
  quality: 'bg-green-500/20 text-green-400',
  sysadmin: 'bg-orange-500/20 text-orange-400',
};

export default function Login() {
  useScrollTop();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [demoLoading, setDemoLoading] = useState<UserRole | null>(null);
  const { login, loginAsRole, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    const success = await login(email, password);
    if (success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = async (role: UserRole) => {
    setDemoLoading(role);
    await loginAsRole(role);
    const demo = DEMO_USERS.find(d => d.role === role);
    toast.success(`Logged in as ${demo?.roleLabel}`, { description: `Welcome, ${demo?.name}` });
    navigate('/dashboard');
    setDemoLoading(null);
  };

  return (
    <div className="min-h-screen bg-background flex overflow-hidden relative">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="relative z-10 p-12 max-w-md">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-glow-cyan">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="1.5"/>
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-heading font-bold text-2xl text-white">Vision<span className="text-gradient-indigo-cyan">Ex</span></span>
          </Link>
          <h2 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">
            AI-powered visual<br />intelligence platform
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed mb-10">
            Real-time video analytics, object detection, facial recognition, and industrial quality inspection — all in one platform.
          </p>
          <div className="space-y-4">
            {[
              { icon: '🎯', text: '97.4% detection accuracy across all models' },
              { icon: '⚡', text: 'Sub-50ms inference latency on live streams' },
              { icon: '🔒', text: 'SOC 2 Type II certified and GDPR compliant' },
              { icon: '🌍', text: 'Trusted by 500+ enterprise teams worldwide' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                <span className="text-sm text-indigo-200">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="1.5"/>
                  <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-heading font-bold text-xl">Vision<span className="text-gradient-indigo-cyan">Ex</span></span>
            </Link>
          </div>

          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Welcome back</h1>
          <p className="text-muted-foreground text-sm mb-8">Sign in to your VisionEx account</p>

          {/* Demo Role Buttons */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Quick Demo Access — Click Any Role</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.role}
                  onClick={() => handleDemoLogin(demo.role as UserRole)}
                  disabled={loading || demoLoading !== null}
                  className={`relative flex items-center gap-3 w-full px-4 py-3 rounded-xl border transition-all duration-200 text-left group disabled:opacity-60 disabled:cursor-not-allowed ${ROLE_COLORS[demo.role]}`}
                >
                  {demoLoading === demo.role ? (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin" />
                    </div>
                  ) : (
                    <img src={demo.avatar} alt={demo.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{demo.name}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${ROLE_BADGE[demo.role]}`}>
                        {demo.roleLabel}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{demo.description}</p>
                  </div>
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or sign in with credentials</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className={`w-full px-4 py-2.5 rounded-xl bg-background border text-foreground placeholder-muted-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${errors.email ? 'border-red-500' : 'border-border'}`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                <Link to="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-background border text-foreground placeholder-muted-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${errors.password ? 'border-red-500' : 'border-border'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || demoLoading !== null}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><LogIn className="w-4 h-4" /> Sign In</>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Create one free</Link>
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-indigo-400 hover:underline">Terms</Link> and{' '}
            <Link to="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
