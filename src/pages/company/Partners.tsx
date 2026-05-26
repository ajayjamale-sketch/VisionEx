import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Zap, Handshake, Network, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Partners() {
  useScrollTop();
  const [partnerType, setPartnerType] = useState<'integrator' | 'tech' | 'referral'>('integrator');

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Handshake className="w-3.5 h-3.5" /> VisionEx Ecosystem
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Collaborate & Grow with<br />
            <span className="text-gradient-indigo-cyan">VisionEx Partnership</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Deploy state-of-the-art vision intelligence together. We partner with top system integrators, VARs, and technology leaders worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Apply to Program
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Partner Benefits & Support</h2>
            <p className="text-muted-foreground">Every resource you need to scale visual intelligence sales and deployments.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: 'Dedicated Tech Support', desc: 'Get direct access to senior vision engineers and private Slack channels for deployment assistance.' },
              { icon: Zap, title: 'Shared Revenue Model', desc: 'Enjoy high recurring margins on software subscriptions and exclusive lead-generation support.' },
              { icon: Network, title: 'Co-Marketing Power', desc: 'Boost brand footprint via co-authored whitepapers, mutual case studies, and PR updates.' }
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

      {/* 3. Interactive Partner Tier Sandbox */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Partnership Categories</h2>
            <p className="text-muted-foreground">Select a partnership model to explore resources, guidelines, and benefits.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card-dark">
            <div className="flex border-b border-border bg-muted/20">
              {(['integrator', 'tech', 'referral'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setPartnerType(type)}
                  className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${partnerType === type ? 'bg-card border-b-2 border-indigo-500 text-indigo-400' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {type === 'tech' ? 'Technology' : type === 'integrator' ? 'System Integrator' : 'Referral Affiliate'}
                </button>
              ))}
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden border border-border bg-black/40 p-6 font-mono text-xs text-indigo-300">
                {partnerType === 'integrator' && (
                  <div className="space-y-2">
                    <div>&gt; TIER: Certified System Integrator</div>
                    <div className="text-green-400">&gt; MARGIN: 25% Recurring Commission</div>
                    <div>&gt; TRAINING: Full Developer Bootcamps</div>
                    <div>&gt; DEV LICENSES: 5 Edge Trial Keys</div>
                    <div className="text-cyan-400">&gt; CO-SELLING: Dedicated Sales Engineer</div>
                  </div>
                )}
                {partnerType === 'tech' && (
                  <div className="space-y-2">
                    <div>&gt; TIER: Hardware & Cloud Partner</div>
                    <div className="text-green-400">&gt; INTEGRATION: Pre-baked Docker Containers</div>
                    <div>&gt; SDK SUPPORT: GPU/Cuda Optimization</div>
                    <div>&gt; CHANNELS: VisionEx marketplace listing</div>
                    <div className="text-cyan-400">&gt; MUTUAL SUPPORT: Custom OEM Tiers</div>
                  </div>
                )}
                {partnerType === 'referral' && (
                  <div className="space-y-2">
                    <div>&gt; TIER: Referral Affiliate</div>
                    <div className="text-green-400">&gt; MARGIN: 15% First-Year Reward</div>
                    <div>&gt; ASSETS: Banners, white-label brochures</div>
                    <div>&gt; SUPPORT: Instant billing & tracking dashboard</div>
                    <div className="text-cyan-400">&gt; PAYOUT SPEED: Net-30 via Stripe</div>
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {partnerType === 'integrator' && 'System Integrators & VARs'}
                  {partnerType === 'tech' && 'OEM Technology Partnerships'}
                  {partnerType === 'referral' && 'Referral & Agency Programs'}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {partnerType === 'integrator' && 'Designed for consultants, industrial automation engineers, and security providers. Bundle VisionEx inside your physical deployment bids.'}
                  {partnerType === 'tech' && 'Integrate your camera hardware, IoT sensors, cloud storage systems, or analytics dashboards directly with the VisionEx core API.'}
                  {partnerType === 'referral' && 'For agencies, developers, or creators recommending VisionEx. Earn generous commissions for every enterprise sign-up.'}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Access to Partner Portal
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Joint webinar & conference options
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Onboarding process */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Partnership Path</h2>
            <p className="text-muted-foreground">How we onboard and scale together.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Application Form', desc: 'Fill in our partner request details. Our partnerships team will schedule a 15-minute alignment call.' },
              { step: '02', title: 'Developer Training', desc: 'Complete our basic developer training sandbox to unlock certification badges and portal assets.' },
              { step: '03', title: 'Deploy & Earn', desc: 'Register local client projects on the portal, configure systems, and track your monthly recurring margin payouts.' }
            ].map(({ step, title, desc }) => (
              <div key={step} className="p-6 rounded-2xl bg-card border border-border relative">
                <span className="font-heading font-black text-4xl text-indigo-500/20 absolute top-4 right-4">{step}</span>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2 mt-4">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Let's build the visual intelligence grid together</h2>
          <p className="text-muted-foreground mb-8">Join the VisionEx partner network today and access co-marketing resources, direct API support, and recurring margins.</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
