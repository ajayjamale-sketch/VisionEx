import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Eye, Video, Users, Wrench, Brain, FileText, Bell, BarChart3, Code2, Cpu, Shield, Zap, ArrowRight, Check } from 'lucide-react';

const MODULES = [
  {
    id: 'vision',
    icon: Eye,
    title: 'AI Vision Processing Engine',
    description: 'Core visual intelligence with 40+ pre-trained models for object detection, classification, image segmentation, OCR, and scene understanding.',
    features: ['Object Detection & Classification', 'Image Segmentation (Semantic & Instance)', 'OCR Text Recognition', 'Scene Understanding', 'Custom Model Support', 'Batch Processing'],
    gradient: 'from-indigo-600 to-indigo-500',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&h=320&fit=crop',
  },
  {
    id: 'video',
    icon: Video,
    title: 'Real-Time Video Analytics',
    description: 'Live video intelligence for CCTV streams, motion detection, intrusion alerts, crowd monitoring, and vehicle recognition at scale.',
    features: ['CCTV Stream Processing (RTSP/RTMP)', 'Real-Time Object Tracking', 'Motion & Intrusion Detection', 'Crowd Density Monitoring', 'Vehicle Recognition & LPR', 'Event Detection & Logging'],
    gradient: 'from-electric-600 to-electric-500',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=320&fit=crop',
  },
  {
    id: 'facial',
    icon: Users,
    title: 'Facial Recognition & Identity',
    description: 'Enterprise-grade facial recognition for access control, visitor management, attendance, and identity verification.',
    features: ['Face Detection & Liveness Check', 'Identity Verification (1:1 & 1:N)', 'Attendance & Time Tracking', 'Visitor Management', 'Access Control Integration', 'Multi-Face Simultaneous'],
    gradient: 'from-cyan-600 to-cyan-500',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=320&fit=crop',
  },
  {
    id: 'quality',
    icon: Wrench,
    title: 'Industrial Quality Inspection',
    description: 'Automated visual inspection for manufacturing with defect detection, surface analysis, and production line monitoring.',
    features: ['Defect Detection & Classification', 'Surface & Texture Analysis', 'Dimensional Measurement', 'Packaging Verification', 'Production Line Monitoring', 'Quality Scoring & Reports'],
    gradient: 'from-indigo-500 to-cyan-500',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=320&fit=crop',
  },
  {
    id: 'training',
    icon: Brain,
    title: 'Custom AI Model Training',
    description: 'No-code platform to build domain-specific vision models with dataset management, annotation tools, and transfer learning.',
    features: ['Dataset Upload & Management', 'Visual Data Annotation Tools', 'Transfer Learning Pipeline', 'Model Evaluation & Metrics', 'One-Click Deployment', 'A/B Model Testing'],
    gradient: 'from-electric-600 to-indigo-600',
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=320&fit=crop',
  },
  {
    id: 'edge',
    icon: Cpu,
    title: 'Edge AI & IoT Integration',
    description: 'Deploy AI models directly to edge devices for offline processing, low latency, and maximum data privacy.',
    features: ['NVIDIA Jetson Deployment', 'AWS Greengrass Compatible', 'Offline Inference Mode', 'IoT Camera Integration', 'Smart Sensor Support', 'OTA Model Updates'],
    gradient: 'from-indigo-500 to-indigo-700',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=320&fit=crop',
  },
];

export default function Features() {
  useScrollTop();

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Zap className="w-3.5 h-3.5" /> Full Platform Overview
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Every AI vision capability<br /><span className="text-gradient-indigo-cyan">you'll ever need</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            12 enterprise-grade modules covering every visual intelligence use case — from factory floors to city surveillance networks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Start Free Trial
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Modules */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div key={mod.id} id={mod.id} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? '' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">{mod.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{mod.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {mod.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/register" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                    Explore this module <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className={`relative ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="rounded-2xl overflow-hidden border border-indigo-500/20 shadow-card-dark">
                    <img src={mod.img} alt={mod.title} className="w-full h-64 lg:h-80 object-cover" />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/10 to-cyan-500/10 rounded-3xl blur-2xl -z-10" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Additional modules grid */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">More Platform Capabilities</h2>
            <p className="text-muted-foreground">Everything else you need for enterprise visual AI operations.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: FileText, title: 'OCR & Document Intelligence', desc: 'Extract structured data from invoices, ID cards, forms with multi-language support.' },
              { icon: Bell, title: 'Smart Alert Management', desc: 'Rule-based triggers, escalation workflows, and multi-channel notifications.' },
              { icon: BarChart3, title: 'Analytics & Reporting', desc: 'Heatmaps, detection trends, performance reports, and AI accuracy dashboards.' },
              { icon: Code2, title: 'REST API & SDKs', desc: 'Python, Node.js, Java SDKs plus webhooks and ERP/CRM integrations.' },
              { icon: Shield, title: 'Enterprise Governance', desc: 'RBAC, SSO, audit logs, compliance controls, and SOC 2 certification.' },
              { icon: Users, title: 'Team & Organization', desc: 'Multi-org support, team management, and granular permission controls.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Ready to explore the platform?</h2>
          <p className="text-muted-foreground mb-8">Start with a 14-day free trial or schedule a live demo with our team.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Start Free Trial
            </Link>
            <Link to="/contact" className="px-8 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
