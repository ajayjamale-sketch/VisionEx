import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Video, Bell, Brain, Search, Settings, User,
  LogOut, Menu, X, ChevronDown, Sun, Moon, BarChart3, Shield,
  FileText, Cpu, Users, Zap, Wrench, Activity, Home, UserCheck, Network
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

// Role-based nav config
const NAV_BY_ROLE: Record<UserRole, { icon: React.ElementType; label: string; href: string; badge?: number }[]> = {
  admin: [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Video, label: 'Live Monitor', href: '/dashboard/monitor' },
    { icon: Bell, label: 'Alerts', href: '/dashboard/alerts', badge: 8 },
    { icon: Brain, label: 'AI Models', href: '/dashboard/models' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Shield, label: 'Security', href: '/dashboard/security' },
    { icon: UserCheck, label: 'Identity', href: '/dashboard/identity' },
    { icon: FileText, label: 'OCR / Docs', href: '/dashboard/ocr' },
    { icon: Cpu, label: 'Edge AI', href: '/dashboard/edge' },
    { icon: Network, label: 'Integrations', href: '/dashboard/integrations' },
    { icon: Users, label: 'Team & Users', href: '/dashboard/users' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ],
  security: [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Video, label: 'Live Monitor', href: '/dashboard/monitor' },
    { icon: Bell, label: 'Alerts', href: '/dashboard/alerts', badge: 8 },
    { icon: Shield, label: 'Incidents', href: '/dashboard/security' },
    { icon: UserCheck, label: 'Identity', href: '/dashboard/identity' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ],
  engineer: [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Brain, label: 'AI Models', href: '/dashboard/models' },
    { icon: Cpu, label: 'Edge AI', href: '/dashboard/edge' },
    { icon: Network, label: 'Integrations', href: '/dashboard/integrations' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: FileText, label: 'OCR / Docs', href: '/dashboard/ocr' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ],
  quality: [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Wrench, label: 'Inspections', href: '/dashboard/quality' },
    { icon: Bell, label: 'Defect Alerts', href: '/dashboard/alerts', badge: 3 },
    { icon: BarChart3, label: 'Quality Reports', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ],
  sysadmin: [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Users, label: 'User Management', href: '/dashboard/users' },
    { icon: Activity, label: 'System Health', href: '/dashboard/system' },
    { icon: Shield, label: 'Security Logs', href: '/dashboard/security' },
    { icon: Network, label: 'Integrations', href: '/dashboard/integrations' },
    { icon: BarChart3, label: 'Usage Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ],
};

const ROLE_BADGE_STYLES: Record<UserRole, string> = {
  admin: 'bg-indigo-600/20 text-indigo-400',
  security: 'bg-cyan-500/20 text-cyan-400',
  engineer: 'bg-blue-500/20 text-blue-400',
  quality: 'bg-green-500/20 text-green-400',
  sysadmin: 'bg-orange-500/20 text-orange-400',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const role = (user?.role ?? 'admin') as UserRole;
  const navItems = NAV_BY_ROLE[role] ?? NAV_BY_ROLE.admin;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo — click goes to landing page */}
      <Link
        to="/"
        className="flex items-center gap-2.5 px-4 py-5 border-b border-border hover:bg-muted/50 transition-colors group"
        title="Back to Home"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:shadow-glow-cyan transition-all">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="1.5"/>
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        {sidebarOpen && (
          <span className="font-heading font-bold text-lg text-foreground">
            Vision<span className="text-gradient-indigo-cyan">Ex</span>
          </span>
        )}
      </Link>

      {/* Role badge */}
      {sidebarOpen && user && (
        <div className="mx-3 mt-3 mb-1">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${ROLE_BADGE_STYLES[role]}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
            {user.roleLabel}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map(({ icon: Icon, label, href, badge }) => {
          const active = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              onClick={() => setMobileSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                active
                  ? 'bg-gradient-to-r from-indigo-600/20 to-cyan-500/10 text-indigo-400 border border-indigo-500/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-indigo-400' : '')} />
              {sidebarOpen && (
                <span className="text-sm font-medium flex-1 truncate">{label}</span>
              )}
              {sidebarOpen && badge && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User panel */}
      <div className="border-t border-border p-2">
        {user && sidebarOpen ? (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-muted/50">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-border" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-foreground truncate">{user.name}</div>
              <div className="text-[10px] text-muted-foreground capitalize">{user.plan} plan</div>
            </div>
          </div>
        ) : user && !sidebarOpen ? (
          <div className="flex justify-center py-1">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-border" />
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden md:flex flex-col bg-card border-r border-border transition-all duration-300 flex-shrink-0',
        sidebarOpen ? 'w-56' : 'w-16'
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-card border-r border-border flex flex-col" style={{ animation: 'slideInLeft 0.2s ease-out' }}>
            <SidebarContent />
          </div>
          <button onClick={() => setMobileSidebarOpen(false)} className="flex-1 bg-black/50" />
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-card/50 nav-blur flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground"
            >
              <Menu className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search cameras, alerts..."
                className="pl-9 pr-4 py-1.5 text-sm bg-muted rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500/50 w-48 lg:w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Home link */}
            <Link to="/" className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground transition-colors" title="Back to Home">
              <Home className="w-4 h-4" />
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs text-cyan-400 font-medium">47 Live</span>
            </div>

            <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground transition-colors">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground transition-colors" onClick={() => navigate('/dashboard/alerts')}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {user && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-muted transition-colors"
                >
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-border" />
                  <span className="hidden sm:block text-xs font-medium text-foreground max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-52 bg-card border border-border rounded-xl shadow-xl p-1 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-border mb-1">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      <span className={`inline-flex mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${ROLE_BADGE_STYLES[role]}`}>
                        {user.roleLabel}
                      </span>
                    </div>
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link to="/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <Link to="/" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Home className="w-4 h-4" /> Landing Page
                    </Link>
                    <Link to="/login" onClick={() => { setUserMenuOpen(false); logout(); }} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Zap className="w-4 h-4" /> Switch Role
                    </Link>
                    <hr className="my-1 border-border" />
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
