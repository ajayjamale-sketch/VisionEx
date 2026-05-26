import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown, LogOut, User, Settings, LayoutDashboard } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Platform', href: '/features', children: [
    { label: 'AI Vision Engine', href: '/features#vision' },
    { label: 'Video Analytics', href: '/features#video' },
    { label: 'Facial Recognition', href: '/features#facial' },
    { label: 'Quality Inspection', href: '/features#quality' },
    { label: 'Edge AI & IoT', href: '/features#edge' },
  ]},
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'nav-blur bg-white/90 dark:bg-[#0d0f1e]/90 border-b border-border shadow-sm'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-glow-indigo group-hover:shadow-glow-cyan transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="1.5"/>
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M3.5 3.5l1.5 1.5M11 11l1.5 1.5M3.5 12.5l1.5-1.5M11 5l1.5-1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              Vision<span className="text-gradient-indigo-cyan">Ex</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative">
                {link.children ? (
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                    onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                    onBlur={() => setTimeout(() => setActiveDropdown(null), 150)}
                  >
                    {link.label}
                    <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', activeDropdown === link.label && 'rotate-180')} />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={cn(
                      'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      location.pathname === link.href
                        ? 'text-foreground bg-muted'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {link.label}
                  </Link>
                )}

                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-52 glass-card rounded-xl shadow-lg p-1 border border-border animate-fade-in">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-muted transition-colors"
                >
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-sm font-medium text-foreground">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-52 glass-card rounded-xl shadow-lg p-1 border border-border animate-fade-in">
                    <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link to="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <hr className="my-1 border-border" />
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-lg hover:shadow-glow-indigo transition-all duration-300">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-md text-foreground hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border nav-blur bg-background/95 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.href}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              {user ? (
                <>
                  <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm text-red-500">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-center text-muted-foreground border border-border rounded-lg">
                    Sign In
                  </Link>
                  <Link to="/register" className="px-4 py-2 text-sm font-semibold text-center text-white bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-lg">
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
