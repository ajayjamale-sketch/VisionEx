import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/constants/data';

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive(i => (i + 1) % TESTIMONIALS.length);

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-medium mb-4">
            Customer Stories
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by industry leaders <span className="text-gradient-indigo-cyan">worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how enterprises across manufacturing, security, retail, and smart cities are using VisionEx to transform their operations.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border border-indigo-500/20">
            {/* Quote icon */}
            <Quote className="w-12 h-12 text-indigo-400/30 absolute top-6 left-6" />

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(TESTIMONIALS[active].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed mb-8 font-medium">
                "{TESTIMONIALS[active].content}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={TESTIMONIALS[active].avatar}
                    alt={TESTIMONIALS[active].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/30"
                  />
                  <div>
                    <div className="font-heading font-semibold text-foreground">{TESTIMONIALS[active].name}</div>
                    <div className="text-sm text-muted-foreground">{TESTIMONIALS[active].role} · {TESTIMONIALS[active].company}</div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <button onClick={prev} className="w-10 h-10 rounded-full border border-border hover:border-indigo-500/50 hover:bg-indigo-600/10 flex items-center justify-center text-muted-foreground hover:text-indigo-400 transition-all duration-200">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={next} className="w-10 h-10 rounded-full border border-border hover:border-indigo-500/50 hover:bg-indigo-600/10 flex items-center justify-center text-muted-foreground hover:text-indigo-400 transition-all duration-200">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-200 rounded-full ${i === active ? 'w-6 h-2 bg-gradient-to-r from-indigo-600 to-cyan-500' : 'w-2 h-2 bg-border hover:bg-muted-foreground'}`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 6).map((t, i) => (
            <div
              key={t.id}
              onClick={() => setActive(i)}
              className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                active === i
                  ? 'border-indigo-500/40 bg-indigo-600/10 shadow-glow-indigo'
                  : 'border-border bg-card hover:border-indigo-500/20'
              }`}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <svg key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust logos */}
        <div className="mt-16 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 hover:opacity-60 transition-opacity duration-300">
            {['Siemens', 'Bosch', 'Honeywell', 'Johnson Controls', 'ABB', 'Rockwell'].map((name) => (
              <span key={name} className="font-heading font-bold text-foreground text-lg tracking-tight">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
