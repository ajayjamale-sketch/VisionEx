import { Eye, Video, Users, Wrench, Brain, FileText, Bell, BarChart3, Code2, Cpu, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    icon: Eye,
    title: 'AI Vision Engine',
    description: 'Object detection, classification, segmentation, and scene understanding powered by state-of-the-art neural networks.',
    gradient: 'from-indigo-600 to-indigo-500',
    tag: 'Core',
  },
  {
    icon: Video,
    title: 'Real-Time Video Analytics',
    description: 'Process live CCTV streams for motion detection, intrusion alerts, crowd monitoring, and vehicle recognition.',
    gradient: 'from-electric-500 to-electric-400',
    tag: 'Live',
  },
  {
    icon: Users,
    title: 'Facial Recognition',
    description: 'Identity verification, attendance tracking, visitor identification, and access control integration.',
    gradient: 'from-cyan-600 to-cyan-400',
    tag: 'Identity',
  },
  {
    icon: Wrench,
    title: 'Quality Inspection',
    description: 'Automated defect detection, product inspection, surface analysis, and production line monitoring.',
    gradient: 'from-indigo-500 to-cyan-500',
    tag: 'Manufacturing',
  },
  {
    icon: Brain,
    title: 'Custom Model Training',
    description: 'Build organization-specific vision models with no-code dataset management, annotation, and transfer learning.',
    gradient: 'from-electric-600 to-indigo-600',
    tag: 'AI/ML',
  },
  {
    icon: FileText,
    title: 'OCR & Document Intelligence',
    description: 'Extract structured data from invoices, ID cards, forms, and documents with multi-language support.',
    gradient: 'from-cyan-500 to-indigo-500',
    tag: 'Documents',
  },
  {
    icon: Bell,
    title: 'Smart Alert Management',
    description: 'Rule-based triggers, incident reporting, alert escalation, and real-time notification center.',
    gradient: 'from-indigo-600 to-electric-600',
    tag: 'Monitoring',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Detection analytics, performance reports, activity trends, heatmaps, and AI accuracy metrics.',
    gradient: 'from-electric-500 to-cyan-500',
    tag: 'Analytics',
  },
  {
    icon: Code2,
    title: 'API & Integration Platform',
    description: 'REST APIs, webhooks, Python/Node.js SDKs, ERP/CRM integrations, and third-party connectors.',
    gradient: 'from-cyan-600 to-electric-500',
    tag: 'Developer',
  },
  {
    icon: Cpu,
    title: 'Edge AI & IoT',
    description: 'Deploy intelligence to edge devices and IoT cameras for offline processing and distributed inference.',
    gradient: 'from-indigo-500 to-indigo-700',
    tag: 'Edge',
  },
  {
    icon: Shield,
    title: 'Enterprise Governance',
    description: 'Centralized user management, compliance controls, security monitoring, and audit logging.',
    gradient: 'from-electric-600 to-electric-400',
    tag: 'Security',
  },
  {
    icon: Zap,
    title: 'Real-Time Processing',
    description: 'Sub-50ms latency with GPU-accelerated inference for mission-critical real-time applications.',
    gradient: 'from-cyan-500 to-cyan-700',
    tag: 'Performance',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            12 Powerful Modules
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything you need for{' '}
            <span className="text-gradient-indigo-cyan">visual intelligence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From real-time video surveillance to industrial quality control — VisionEx brings AI vision to every critical workflow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/30 hover:shadow-card-light dark:hover:shadow-card-dark transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Tag */}
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide bg-muted px-2 py-0.5 rounded-full">
                  {feature.tag}
                </span>

                <h3 className="font-heading font-semibold text-foreground mt-2 mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/features"
            className="inline-flex items-center gap-2 px-6 py-3 border border-indigo-500/40 text-indigo-400 font-medium rounded-xl hover:bg-indigo-600/10 transition-all duration-200"
          >
            Explore All Features
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
