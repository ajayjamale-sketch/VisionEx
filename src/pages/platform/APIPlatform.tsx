import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Code2, Key, RefreshCcw, Terminal, Webhook, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function APIPlatform() {
  useScrollTop();
  const [selectedLanguage, setSelectedLanguage] = useState<'curl' | 'python' | 'node'>('curl');

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Code2 className="w-3.5 h-3.5" /> Developer Platform
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Robust APIs Built for<br />
            <span className="text-gradient-indigo-cyan">Vision Developers</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Integrate object detection, OCR, and identity checks into your software stack with simple RESTful endpoints and language SDKs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Get API Keys Free
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
              Explore Docs
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Comprehensive Developer Features</h2>
            <p className="text-muted-foreground">High availability APIs with sub-50ms round-trip times and detailed logging.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Key, title: 'Granular Auth Tokens', desc: 'Generate scoped public/secret API keys to access specific models and streams securely.' },
              { icon: Webhook, title: 'Instant Webhooks', desc: 'Register endpoints to receive real-time notifications when models identify targets.' },
              { icon: Terminal, title: 'Official SDK Library', desc: 'Natively interact with our APIs using helper libraries for Python, Node.js, and Golang.' }
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

      {/* 3. Interactive Code Sandbox */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Copy. Paste. Deploy.</h2>
            <p className="text-muted-foreground">Integrate neural network triggers in your codebase with three lines of code.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card-dark">
            <div className="flex border-b border-border bg-muted/20">
              {(['curl', 'python', 'node'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`flex-1 py-3 text-sm font-semibold uppercase transition-colors ${selectedLanguage === lang ? 'bg-card border-b-2 border-indigo-500 text-indigo-400' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {lang === 'curl' ? 'cURL (REST)' : lang === 'python' ? 'Python SDK' : 'NodeJS SDK'}
                </button>
              ))}
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden border border-border bg-black/40 p-4 font-mono text-[11px] text-indigo-300">
                {selectedLanguage === 'curl' && (
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    curl -X POST "https://api.visionex.ai/v1/detection" \<br />
                    &nbsp;&nbsp;-H "Authorization: Bearer $VISIONEX_API_KEY" \<br />
                    &nbsp;&nbsp;-F "image=@/path/to/img.jpg" \<br />
                    &nbsp;&nbsp;-F "model=object_detection_v2"
                  </pre>
                )}
                {selectedLanguage === 'python' && (
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    import visionex<br /><br />
                    client = visionex.Client(api_key="vx_key_...")<br />
                    result = client.detect.object(<br />
                    &nbsp;&nbsp;image_path="./img.jpg",<br />
                    &nbsp;&nbsp;model="object_detection_v2"<br />
                    )<br />
                    print(result.objects)
                  </pre>
                )}
                {selectedLanguage === 'node' && (
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    const {"{"} VisionEx {"}"} = require('visionex');<br /><br />
                    const client = new VisionEx({"{"} apiKey: 'vx_key_...' {"}"});<br />
                    client.detect.object({"{"}<br />
                    &nbsp;&nbsp;image: './img.jpg',<br />
                    &nbsp;&nbsp;model: 'object_detection_v2'<br />
                    {"}"}).then(res =&gt; console.log(res.data));
                  </pre>
                )}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {selectedLanguage === 'curl' && 'Standard REST Endpoints'}
                  {selectedLanguage === 'python' && 'Async Python Neural Client'}
                  {selectedLanguage === 'node' && 'Promise-Based NodeJS Driver'}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedLanguage === 'curl' && 'Use standard HTTP libraries to invoke models from any programming language. Output is delivered in standard serialized JSON structure.'}
                  {selectedLanguage === 'python' && 'Supports asynchronous loops, connection pooling, and multi-thread streaming. Installs in seconds via pip.'}
                  {selectedLanguage === 'node' && 'Leverages modern JavaScript ES6 syntax, supporting native async/await patterns for clean, readable code.'}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Response output: JSON body with coordinates
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Rate Limits: 6,000 req/min (Scale plan)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. API Ingestion Flow */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Integration Pipeline</h2>
            <p className="text-muted-foreground">Integrate vision features inside your backend ecosystem in three steps.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Generate Token', desc: 'Create your developer profile and request keys from the credentials dashboard section.' },
              { step: '02', title: 'Code Integration', desc: 'Install our libraries using your package manager (pip, npm) and specify model keys.' },
              { step: '03', title: 'Register Webhooks', desc: 'Configure webhook URL parameters to process detection events asynchronously in the background.' }
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

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Start building on our API today</h2>
          <p className="text-muted-foreground mb-8">Access our complete API platform free. Registration requires no billing details and takes less than 2 minutes.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Generate Free API Key
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
