import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '@/constants/data';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Technical', 'AI', 'Security', 'Pricing', 'Deployment'];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('1');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(f => f.category === activeCategory);

  return (
    <section id="faq" className="py-24 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-electric-500/30 bg-electric-500/10 text-electric-400 text-xs font-medium mb-4">
            Frequently Asked
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need to <span className="text-gradient-indigo-cyan">know</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Can't find the answer? Reach our support team via chat or email.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={cn(
                'rounded-2xl border transition-all duration-200',
                openId === item.id
                  ? 'border-indigo-500/30 bg-indigo-600/5'
                  : 'border-border bg-card hover:border-indigo-500/20'
              )}
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-5 text-left gap-4"
              >
                <span className={cn('font-medium text-sm leading-relaxed', openId === item.id ? 'text-foreground' : 'text-muted-foreground')}>
                  {item.question}
                </span>
                <div className={cn(
                  'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200',
                  openId === item.id
                    ? 'bg-gradient-to-br from-indigo-600 to-cyan-500 text-white'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {openId === item.id ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>

              {openId === item.id && (
                <div className="px-5 pb-5 animate-fade-in">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  <span className="inline-block mt-3 text-xs font-medium text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-card to-indigo-600/5 border border-border">
          <h3 className="font-heading font-semibold text-foreground mb-2">Still have questions?</h3>
          <p className="text-sm text-muted-foreground mb-4">Our team is available 24/7 to help you get started.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:hello@visionex.ai" className="px-4 py-2 text-sm font-medium text-indigo-400 border border-indigo-500/30 rounded-lg hover:bg-indigo-600/10 transition-colors">
              Email Support
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-lg hover:shadow-glow-indigo transition-all duration-200">
              Start Live Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
