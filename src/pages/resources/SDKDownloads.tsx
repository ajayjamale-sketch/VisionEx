import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Cpu, Terminal, Shield, Download, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const SDKS = [
  { id: 'python', name: 'Python SDK', version: 'v2.4.1', install: 'pip install visionex', desc: 'Full wrapper supporting async query loops, batch imports, and OpenCV integrations.' },
  { id: 'node', name: 'NodeJS SDK', version: 'v1.8.9', install: 'npm install @visionex/sdk', desc: 'TypeScript-typed library for server-side integrations, complete with promise support.' },
  { id: 'cpp', name: 'C++ Native SDK', version: 'v3.0.2', install: 'cmake build & link', desc: 'High-performance binary library optimized for CUDA threads and local camera boards.' },
  { id: 'go', name: 'Go SDK', version: 'v1.2.0', install: 'go get github.com/visionex/sdk-go', desc: 'Concurrent-safe wrapper for building highly scalable backend pipelines.' },
];

export default function SDKDownloads() {
  useScrollTop();
  const [selectedSdk, setSelectedSdk] = useState<string>('python');

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Download className="w-3.5 h-3.5" /> SDK Libraries
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Official Developer<br />
            <span className="text-gradient-indigo-cyan">SDK Packages</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Download pre-built helper libraries and bindings to integrate the VisionEx engine into your choice of backend stack.
          </p>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Engineered for Developer Comfort</h2>
            <p className="text-muted-foreground">Every SDK is officially maintained, fully typed, and optimized for performance.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Terminal, title: 'Type Definitions', desc: 'All SDK libraries include complete TypeScript typings or PEP-484 annotations for auto-completion.' },
              { icon: Cpu, title: 'Automatic Backoffs', desc: 'Built-in retry queues and exponential backoffs automatically handle network jitters and rate limits.' },
              { icon: Shield, title: 'Secure Vector Enrolment', desc: 'Features built-in encryption pipelines to secure visual inputs prior to database storage.' }
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

      {/* 3. Interactive Installation Guide */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Install Instructions</h2>
            <p className="text-muted-foreground">Select a package to copy package manager command blocks.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card-dark">
            <div className="flex border-b border-border bg-muted/20 overflow-x-auto">
              {SDKS.map(sdk => (
                <button
                  key={sdk.id}
                  onClick={() => setSelectedSdk(sdk.id)}
                  className={`flex-1 min-w-[120px] py-3 text-xs font-semibold transition-colors ${selectedSdk === sdk.id ? 'bg-card border-b-2 border-indigo-500 text-indigo-400' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {sdk.name}
                </button>
              ))}
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
              {(() => {
                const sdk = SDKS.find(s => s.id === selectedSdk)!;
                return (
                  <>
                    <div className="relative rounded-xl overflow-hidden border border-border bg-black/40 p-4 font-mono text-xs text-indigo-300">
                      <div>&gt; {sdk.install}</div>
                      <div className="text-[10px] text-muted-foreground mt-4"># Status: Installed {sdk.name} {sdk.version}</div>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-lg text-foreground mb-1">{sdk.name}</h4>
                      <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wide">Version: {sdk.version}</span>
                      <p className="text-sm text-muted-foreground mt-3 mb-4">{sdk.desc}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Complete documentation included
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Open Source: Apache-2.0 License
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Additional Files & Bindings */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Pre-compiled Binaries & Resources</h2>
            <p className="text-muted-foreground">Download model files or reference configuration maps.</p>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Triton Model Repositories (ONNX Layout)', size: '124 MB', desc: 'Pre-configured folder layouts to deploy our face-identification models inside Triton environments.' },
              { title: 'YOLOv8 custom-weight export maps', size: '48 MB', desc: 'Export mappings to translate model coordinates from custom annotated files to our webhooks.' },
              { title: 'Docker Compose Edge Templates', size: '12 KB', desc: 'Starter yaml configs to orchestrate multi-camera ingestion edge nodes locally.' }
            ].map(bin => (
              <div key={bin.title} className="p-4 rounded-xl bg-card border border-border flex justify-between items-center gap-4 hover:border-indigo-500/20 transition-all">
                <div>
                  <h4 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" /> {bin.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{bin.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground font-mono">{bin.size}</span>
                  <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Start your build pipeline</h2>
          <p className="text-muted-foreground mb-8">Access our credentials dashboard to retrieve your secret keys and integrate our SDKs into your test environment.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
