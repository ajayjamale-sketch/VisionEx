import { Camera, Settings, Brain, Eye, BarChart3, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Camera,
    title: 'Connect Your Sources',
    description: 'Connect IP cameras, CCTV systems, file uploads, or cloud storage buckets in minutes with zero-code setup.',
    detail: 'Supports RTSP, RTMP, HTTP streams, S3, GCS, and direct API uploads.',
  },
  {
    step: '02',
    icon: Settings,
    title: 'Configure AI Models',
    description: 'Choose from 40+ pre-trained models or train custom models for your specific detection needs.',
    detail: 'Object detection, facial recognition, defect detection, OCR, and more.',
  },
  {
    step: '03',
    icon: Brain,
    title: 'AI Processes & Learns',
    description: 'Our neural networks analyze every frame with GPU-accelerated inference at sub-50ms latency.',
    detail: 'Continuous learning improves accuracy over time with your data.',
  },
  {
    step: '04',
    icon: Eye,
    title: 'Real-Time Detection',
    description: 'Detections happen instantly with bounding boxes, labels, confidence scores, and event metadata.',
    detail: 'All events logged with timestamps, location, and evidence images.',
  },
  {
    step: '05',
    icon: BarChart3,
    title: 'Insights & Automation',
    description: 'Smart alerts trigger automated workflows, and analytics dashboards reveal operational intelligence.',
    detail: 'Integrate with Slack, ServiceNow, SAP, and 100+ business tools.',
  },
];

export default function WorkflowSection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-4">
            <ArrowRight className="w-3.5 h-3.5" />
            How It Works
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            From camera to{' '}
            <span className="text-gradient-indigo-cyan">intelligence</span>{' '}
            in 5 steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your AI vision system running in hours, not months. Our streamlined workflow makes enterprise-grade deployment simple.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-[calc(100%-200px)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative group">
                  {/* Mobile connector */}
                  {index < STEPS.length - 1 && (
                    <div className="lg:hidden absolute left-10 top-20 w-px h-8 bg-gradient-to-b from-indigo-500/40 to-transparent" />
                  )}

                  <div className="flex lg:flex-col items-start lg:items-center gap-4">
                    {/* Icon + Step */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 border border-indigo-500/30 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:shadow-glow-cyan transition-all duration-300">
                        <Icon className="w-7 h-7 text-indigo-400 dark:text-indigo-300" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white">{step.step}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:text-center">
                      <h3 className="font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{step.description}</p>
                      <p className="text-xs text-indigo-400 dark:text-indigo-300">{step.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Flow cards */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { role: 'Enterprise', flow: 'Register → Connect → Configure → Monitor → Report', color: 'from-indigo-600 to-indigo-500' },
            { role: 'Security Operator', flow: 'Monitor Streams → Receive Alerts → Review → Escalate', color: 'from-electric-600 to-electric-500' },
            { role: 'Quality Manager', flow: 'Upload Data → Run Checks → Review Defects → Improve', color: 'from-cyan-600 to-cyan-500' },
            { role: 'AI Engineer', flow: 'Dataset Upload → Train Models → Evaluate → Deploy', color: 'from-indigo-500 to-cyan-500' },
          ].map((item) => (
            <div key={item.role} className="p-5 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200">
              <div className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${item.color} mb-3`}>
                {item.role}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.flow}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
