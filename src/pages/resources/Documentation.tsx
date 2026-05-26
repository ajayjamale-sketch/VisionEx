import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { FileText, Search, BookOpen, Key, Video, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const DOC_CATEGORIES = [
  { icon: BookOpen, title: 'Getting Started', count: '6 articles', desc: 'Create account, retrieve API keys, and launch your first object detection query in minutes.' },
  { icon: Video, title: 'Video Analytics', count: '12 articles', desc: 'Connect RTSP feeds, specify virtual boundary crossings, and register alert webhooks.' },
  { icon: Cpu, title: 'Edge Deployments', count: '8 articles', desc: 'Install our Docker edge daemon container on NVIDIA Jetson, AWS Greengrass, or local servers.' },
  { icon: Key, title: 'API & SDKs', count: '10 articles', desc: 'Access comprehensive endpoint structures for Python, NodeJS, Golang, and raw cURL.' },
];

export default function Documentation() {
  useScrollTop();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <FileText className="w-3.5 h-3.5" /> Help Center Docs
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
            VisionEx Platform<br />
            <span className="text-gradient-indigo-cyan">Documentation & Guides</span>
          </h1>
          <div className="max-w-md mx-auto relative mt-6">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides, APIs, edge errors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* 2. Quick Start Guides */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Quickstart Tutorials</h2>
            <p className="text-muted-foreground">Select a category below to browse step-by-step guides.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOC_CATEGORIES.map(({ icon: Icon, title, count, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-1 text-base">{title}</h3>
                  <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wide">{count}</span>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{desc}</p>
                </div>
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 mt-4 transition-colors">
                  View Articles <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Deep Dive / Key Concepts */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Explore the Core Concepts</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our documentation is structured around key paradigms of modern computer vision. Learn about pipelines, models, edge orchestration, and secure vector comparisons.
              </p>
              <div className="space-y-4">
                {[
                  'Understanding Detection vs Classifications',
                  'Configuring dynamic tripwires and custom polygons',
                  'Deploying model binaries over low-bandwidth channels',
                  'Handling secure OAuth2 api integrations'
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative bg-card border border-border p-6 rounded-2xl">
              <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" /> Popular Documents
              </h4>
              <div className="space-y-3">
                {[
                  'RTSP Ingestion Configuration',
                  'Docker Daemon Installation Guide',
                  'API Rate Limits & Handling HTTP 429',
                  'Updating CUDA versions on Jetson AGX Orin',
                  'Managing organization roles & billing accounts'
                ].map(doc => (
                  <Link key={doc} to="/contact" className="block p-3 rounded-xl bg-muted/30 border border-border hover:border-indigo-500/20 transition-all text-xs text-muted-foreground hover:text-foreground">
                    {doc}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Common FAQs */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common developer questions.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'How do I authenticate API calls?', a: 'All requests must supply the API secret key inside the HTTP request headers using: Bearer vx_key_...' },
              { q: 'What is the maximum RTSP resolution supported?', a: 'Our edge nodes support up to 4K UHD camera feeds. Cloud processing supports up to 1080p Full HD feeds.' },
              { q: 'Can I upload custom trained models?', a: 'Yes! We support ONNX and PyTorch formats. You can register model configurations directly on the models tab.' }
            ].map(({ q, a }, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-card border border-border">
                <h4 className="font-heading font-semibold text-foreground text-sm mb-2">{q}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Can't find the answers you need?</h2>
          <p className="text-muted-foreground mb-8">Our support forums, developer Discord channels, and dedicated support teams are available to help.</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Submit Ticket
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
