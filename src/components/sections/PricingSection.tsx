import { useState } from 'react';
import { Check, Zap, X, CreditCard, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PRICING_PLANS } from '@/constants/data';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface SelectedPlan {
  id: string;
  name: string;
  price: number;
  annual: boolean;
}

function PaymentModal({ plan, onClose }: { plan: SelectedPlan; onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useAuth();

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
    if (!form.cardName.trim()) errs.cardName = 'Cardholder name required';
    if (form.cardNumber.replace(/\s/g, '').length < 16) errs.cardNumber = 'Enter a valid 16-digit card number';
    if (form.expiry.length < 5) errs.expiry = 'Enter expiry MM/YY';
    if (form.cvv.length < 3) errs.cvv = 'Enter 3-digit CVV';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep('processing');
    setTimeout(() => setStep('success'), 2200);
  };

  const handleDone = () => {
    toast.success(`${plan.name} activated!`, { description: 'Your subscription is now live.' });
    onClose();
  };

  const yearly = plan.annual ? plan.price * 12 : null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl animate-fade-in">

        {/* Success State */}
        {step === 'success' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Welcome to <span className="text-foreground font-semibold">{plan.name}</span>.
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              A receipt has been sent to <span className="text-foreground">{form.email || user?.email}</span>.
            </p>
            <div className="p-4 rounded-xl bg-muted/50 border border-border text-sm mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-semibold text-foreground">{plan.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Billing</span>
                <span className="font-semibold text-foreground">{plan.annual ? 'Annual' : 'Monthly'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-cyan-400">${plan.annual ? (plan.price * 12).toFixed(2) : plan.price.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleDone}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {/* Processing State */}
        {step === 'processing' && (
          <div className="p-10 text-center">
            <div className="relative w-16 h-16 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full border-4 border-muted" />
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <h3 className="font-heading font-bold text-foreground mb-2">Processing Payment...</h3>
            <p className="text-muted-foreground text-sm">Securely charging your card. Please wait.</p>
          </div>
        )}

        {/* Form State */}
        {step === 'form' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="font-heading font-bold text-foreground">Complete Your Order</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {plan.name} · ${plan.annual ? (plan.price * 12).toFixed(2) + '/yr' : plan.price.toFixed(2) + '/mo'}
                </p>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Order summary */}
              <div className="p-3 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-foreground">{plan.name} Plan</div>
                  <div className="text-xs text-muted-foreground">{plan.annual ? 'Billed annually' : 'Billed monthly'}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gradient-indigo-cyan">
                    ${plan.annual ? (plan.price * 12).toFixed(2) : plan.price.toFixed(2)}
                  </div>
                  {plan.annual && (
                    <div className="text-[10px] text-cyan-500">${plan.price}/mo × 12</div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={form.email || user?.email || ''}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="billing@company.com"
                  className={`w-full px-4 py-2.5 rounded-xl bg-background border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${errors.email ? 'border-red-500' : 'border-border'}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>

              {/* Card name */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Cardholder Name</label>
                <input
                  type="text"
                  value={form.cardName}
                  onChange={e => setForm(f => ({ ...f, cardName: e.target.value }))}
                  placeholder="Alex Morrison"
                  className={`w-full px-4 py-2.5 rounded-xl bg-background border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${errors.cardName ? 'border-red-500' : 'border-border'}`}
                />
                {errors.cardName && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.cardName}</p>}
              </div>

              {/* Card number */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={form.cardNumber}
                    onChange={e => setForm(f => ({ ...f, cardNumber: formatCardNumber(e.target.value) }))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${errors.cardNumber ? 'border-red-500' : 'border-border'}`}
                  />
                </div>
                {errors.cardNumber && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.cardNumber}</p>}
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Expiry Date</label>
                  <input
                    type="text"
                    value={form.expiry}
                    onChange={e => setForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full px-4 py-2.5 rounded-xl bg-background border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${errors.expiry ? 'border-red-500' : 'border-border'}`}
                  />
                  {errors.expiry && <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">CVV</label>
                  <input
                    type="text"
                    value={form.cvv}
                    onChange={e => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    placeholder="•••"
                    maxLength={4}
                    className={`w-full px-4 py-2.5 rounded-xl bg-background border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${errors.cvv ? 'border-red-500' : 'border-border'}`}
                  />
                  {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Lock className="w-4 h-4" />
                Pay ${plan.annual ? (plan.price * 12).toFixed(2) : plan.price.toFixed(2)}
                {plan.annual ? '/year' : '/month'}
              </button>

              <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" /> 256-bit SSL encryption · Cancel anytime
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlanCTA = (plan: typeof PRICING_PLANS[0]) => {
    if (plan.id === 'enterprise') {
      navigate('/contact');
      return;
    }
    if (user) {
      setSelectedPlan({
        id: plan.id,
        name: plan.name,
        price: annual ? plan.price.annual : plan.price.monthly,
        annual,
      });
    } else {
      navigate('/register');
    }
  };

  return (
    <section id="pricing" className="py-24 bg-background">
      {selectedPlan && (
        <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            Simple, Transparent Pricing
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Scale your vision intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Start with a 14-day free trial. No credit card required.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-muted border border-border">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${!annual ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${annual ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Annual
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlighted
                  ? 'border-indigo-500/50 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 shadow-glow-indigo scale-105'
                  : 'border-border bg-card hover:border-indigo-500/30'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading font-bold text-xl text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                {plan.id === 'enterprise' ? (
                  <div>
                    <span className="text-3xl font-bold font-heading text-foreground">Custom</span>
                    <span className="text-muted-foreground text-sm ml-2">/ negotiated</span>
                  </div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold font-heading text-gradient-indigo-cyan">
                      ${annual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground text-sm mb-1">/ month</span>
                  </div>
                )}
                {annual && plan.id !== 'enterprise' && (
                  <div className="text-xs text-cyan-500 mt-1">
                    Save ${(plan.price.monthly - plan.price.annual) * 12}/year
                  </div>
                )}
              </div>

              <button
                onClick={() => handlePlanCTA(plan)}
                className={`w-full block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 mb-6 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:shadow-glow-cyan hover:scale-105'
                    : 'border border-border text-foreground hover:border-indigo-500/50 hover:bg-indigo-600/10'
                }`}
              >
                {user && plan.id !== 'enterprise' ? `Subscribe to ${plan.name}` : plan.cta}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-cyan-500' : 'text-indigo-500'}`} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Enterprise callout */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-indigo-600/10 to-cyan-500/10 border border-indigo-500/20 text-center max-w-2xl mx-auto">
          <h3 className="font-heading font-bold text-foreground mb-2">Need a custom solution?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our enterprise team will work with you to create a tailored plan that fits your exact requirements, including on-premise deployment, custom integrations, and dedicated support.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-indigo transition-all duration-300 text-sm">
            Talk to Enterprise Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
