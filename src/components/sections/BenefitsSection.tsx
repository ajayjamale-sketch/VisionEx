import AnimatedCounter from '@/components/ui/AnimatedCounter';
import qualityImg from '@/assets/quality-inspection.jpg';
import facialImg from '@/assets/facial-recognition.jpg';

const METRICS = [
  { value: 94, suffix: '%', label: 'Defect Detection Rate', description: 'Improvement in manufacturing QC accuracy' },
  { value: 78, suffix: '%', label: 'Reduced Security Incidents', description: 'Fewer security breaches with AI surveillance' },
  { value: 60, suffix: '%', label: 'Inspection Cost Reduction', description: 'Savings on manual quality inspection labor' },
  { value: 50, suffix: 'ms', label: 'Processing Latency', description: 'Average AI inference time per frame' },
];

const BENEFITS = [
  {
    title: 'Industrial Quality Control',
    description: 'Replace manual inspection with AI vision that detects surface defects, packaging issues, and dimensional variations at 10x the speed with higher accuracy.',
    points: [
      '99.2% defect detection precision',
      'Real-time production line monitoring',
      'Automated rejection and flagging',
      'Quality trend analytics',
    ],
    image: qualityImg,
  },
  {
    title: 'Intelligent Security & Access',
    description: 'Deploy facial recognition and behavioral AI across your facilities for seamless access control, visitor management, and instant threat detection.',
    points: [
      'Sub-second identity verification',
      'Multi-face simultaneous tracking',
      'Visitor pre-registration system',
      'Integration with door access systems',
    ],
    image: facialImg,
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-electric-500/30 bg-electric-500/10 text-electric-400 text-xs font-medium mb-4">
            Proven Impact
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real results for{' '}
            <span className="text-gradient-indigo-cyan">real businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise teams across manufacturing, security, retail, and logistics are transforming operations with VisionEx.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="p-6 rounded-2xl bg-gradient-to-br from-card to-indigo-600/5 border border-border hover:border-indigo-500/30 transition-all duration-300 text-center group"
            >
              <div className="text-4xl font-bold font-heading text-gradient-indigo-cyan mb-1">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} />
              </div>
              <div className="font-semibold text-foreground text-sm mb-1">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Use Case Features */}
        <div className="space-y-16">
          {BENEFITS.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{benefit.description}</p>
                <ul className="space-y-3">
                  {benefit.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="rounded-2xl overflow-hidden border border-indigo-500/20 shadow-card-dark">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent rounded-2xl pointer-events-none" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/10 to-cyan-500/10 rounded-3xl blur-2xl -z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
