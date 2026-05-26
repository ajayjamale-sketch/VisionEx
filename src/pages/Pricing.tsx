import { useScrollTop } from '@/hooks/useScrollTop';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const COMPARISON = [
  { feature: 'Camera Streams', starter: '5', pro: '50', enterprise: 'Unlimited' },
  { feature: 'API Calls/month', starter: '10K', pro: '500K', enterprise: 'Unlimited' },
  { feature: 'Object Detection', starter: true, pro: true, enterprise: true },
  { feature: 'Facial Recognition', starter: false, pro: true, enterprise: true },
  { feature: 'Custom Model Training', starter: false, pro: true, enterprise: true },
  { feature: 'Edge AI Deployment', starter: false, pro: false, enterprise: true },
  { feature: 'On-Premise Deployment', starter: false, pro: false, enterprise: true },
  { feature: 'SSO Integration', starter: false, pro: true, enterprise: true },
  { feature: 'Data Retention', starter: '30 days', pro: '90 days', enterprise: 'Unlimited' },
  { feature: 'Support', starter: 'Community', pro: 'Priority', enterprise: 'Dedicated' },
  { feature: 'SLA', starter: false, pro: false, enterprise: true },
];

export default function Pricing() {
  useScrollTop();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page-transition min-h-screen bg-background">
      <div className="pt-16">
        <PricingSection />
      </div>

      {/* Comparison Table */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Compare Plans</h2>
            <p className="text-muted-foreground">Detailed feature comparison across all tiers.</p>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden bg-card">
            <div className="grid grid-cols-4 bg-muted/50 border-b border-border">
              <div className="p-4 text-sm font-semibold text-foreground">Feature</div>
              {['Starter', 'Professional', 'Enterprise'].map(plan => (
                <div key={plan} className={`p-4 text-center text-sm font-semibold ${plan === 'Professional' ? 'text-indigo-400' : 'text-foreground'}`}>{plan}</div>
              ))}
            </div>
            {COMPARISON.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-4 border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                <div className="p-4 text-sm text-muted-foreground">{row.feature}</div>
                {[row.starter, row.pro, row.enterprise].map((val, j) => (
                  <div key={j} className="p-4 text-center">
                    {typeof val === 'boolean' ? (
                      val ? <Check className="w-4 h-4 text-cyan-500 mx-auto" /> : <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                    ) : (
                      <span className="text-sm text-foreground">{val}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* Enterprise CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Looking for enterprise pricing?</h2>
          <p className="text-muted-foreground mb-8">Custom contracts, volume discounts, dedicated infrastructure, and white-glove onboarding.</p>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300"
          >
            Talk to Enterprise Sales
          </button>
        </div>
      </section>
    </div>
  );
}
