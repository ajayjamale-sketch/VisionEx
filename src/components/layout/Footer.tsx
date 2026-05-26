import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const FOOTER_LINKS = {
  Platform: [
    { label: 'AI Vision Engine', href: '/platform/ai-vision' },
    { label: 'Video Analytics', href: '/platform/video-analytics' },
    { label: 'Facial Recognition', href: '/platform/facial-recognition' },
    { label: 'Quality Inspection', href: '/platform/quality-inspection' },
    { label: 'Edge AI & IoT', href: '/platform/edge-ai-iot' },
    { label: 'API Platform', href: '/platform/api-platform' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Partners', href: '/partners' },
  ],
  Resources: [
    { label: 'Documentation', href: '/documentation' },
    { label: 'API Reference', href: '/api-reference' },
    { label: 'SDK Downloads', href: '/sdk-downloads' },
    { label: 'Status Page', href: '/status' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'GDPR Compliance', href: '/gdpr' },
    { label: 'Security', href: '/security' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="1.5"/>
                  <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                Vision<span className="text-gradient-indigo-cyan">Ex</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              AI-powered visual intelligence platform for enterprise image processing, video analytics, and smart automation.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <a href="mailto:hello@visionex.ai" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-cyan-500" />
                hello@visionex.ai
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-cyan-500" />
                San Francisco, CA 94105
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-cyan-500" />
                +1 (888) 847-6639
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-indigo-600/20 hover:text-indigo-400 text-muted-foreground transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-sm text-foreground mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VisionEx Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">All systems operational</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
