import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Eye, Shield, Target, Zap, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function AIVision() {
  useScrollTop();
  const [selectedDemo, setSelectedDemo] = useState<'object' | 'segment' | 'ocr'>('object');

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Eye className="w-3.5 h-3.5" /> AI Vision Core
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Supercharge products with<br />
            <span className="text-gradient-indigo-cyan">AI Vision Processing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Deploy over 40+ pre-trained neural networks for instant object detection, pixel-level segmentation, and deep visual understanding.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Start Building Now
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Enterprise-Grade Architecture</h2>
            <p className="text-muted-foreground">High precision visual processing engineered for scale, reliability, and security.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: '99.8% Accuracy', desc: 'State-of-the-art models optimized through active learning loops for unmatched precision.' },
              { icon: Zap, title: 'Ultra-low Latency', desc: 'Sub-15ms inference times powered by hardware-accelerated TensorRT pipelines.' },
              { icon: Shield, title: 'Secure & Compliant', desc: 'On-premise or cloud deployments adhering strictly to SOC 2, HIPAA, and GDPR standards.' }
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

      {/* 3. Interactive Sandbox Demo */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">See It In Action</h2>
            <p className="text-muted-foreground">Explore real-time visual output from our core AI models.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card-dark">
            <div className="flex border-b border-border bg-muted/20">
              {(['object', 'segment', 'ocr'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedDemo(tab)}
                  className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${selectedDemo === tab ? 'bg-card border-b-2 border-indigo-500 text-indigo-400' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {tab === 'ocr' ? 'OCR Text' : tab + ' detection'}
                </button>
              ))}
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden border border-border">
                {selectedDemo === 'object' && (
                  <>
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&fit=crop" alt="Demo" className="w-full h-64 object-cover" />
                    <div className="absolute top-12 left-16 border-2 border-indigo-500 bg-indigo-500/20 px-2 py-0.5 rounded text-[10px] text-white font-bold">
                      running_shoe: 98.4%
                    </div>
                  </>
                )}
                {selectedDemo === 'segment' && (
                  <>
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&fit=crop" alt="Demo" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-indigo-500/30 mix-blend-multiply flex items-center justify-center">
                      <span className="bg-black/60 px-3 py-1 rounded-full text-xs text-indigo-300 font-bold border border-indigo-500/40">Visual Artwork Segmented</span>
                    </div>
                  </>
                )}
                {selectedDemo === 'ocr' && (
                  <>
                    <img src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=600&fit=crop" alt="Demo" className="w-full h-64 object-cover" />
                    <div className="absolute bottom-6 left-6 right-6 bg-black/80 p-3 rounded-lg border border-border font-mono text-[11px] text-green-400">
                      &gt; EXTRACTED_TEXT: "VisionEx AI platform v2.0"
                    </div>
                  </>
                )}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {selectedDemo === 'object' && 'Real-time Object Detection'}
                  {selectedDemo === 'segment' && 'Pixel-level Instance Segmentation'}
                  {selectedDemo === 'ocr' && 'Optical Character Recognition'}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedDemo === 'object' && 'Identifies and localizes distinct objects within images and video streams. Perfect for inventory counts and surveillance analytics.'}
                  {selectedDemo === 'segment' && 'Classifies every individual pixel in an image to map precise outlines. Excellent for medical imaging, autonomous vehicles, and quality controls.'}
                  {selectedDemo === 'ocr' && 'Extracts text, alphanumeric symbols, serial numbers, and structured fields from low-contrast, angled, or moving documents.'}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> GPU Acceleration Built-in
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Output formats: JSON, XML, ProtoBuf
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Seamless Integration Flow</h2>
            <p className="text-muted-foreground">Go from raw media to visual intelligence in three simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 relative">
            {[
              { step: '01', title: 'Ingest Media', desc: 'Upload static images, documents, or connect active live streams (RTSP/WebRTC) directly to our ingestion endpoints.' },
              { step: '02', title: 'Inference Engine', desc: 'Our engine routes the payload to specified neural models, applying optimization parameters for fast responses.' },
              { step: '03', title: 'Retrieve Output', desc: 'Receive structured JSON outputs detailing detections, coordinates, bounding boxes, labels, and accuracy indices.' }
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

      {/* 5. bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Start processing images in minutes</h2>
          <p className="text-muted-foreground mb-8">Access our free API sandbox today and get 1,000 complimentary processing requests.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
