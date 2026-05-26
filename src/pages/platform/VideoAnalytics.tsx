import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Video, Shield, Activity, Radio, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function VideoAnalytics() {
  useScrollTop();
  const [activeStream, setActiveStream] = useState<'surveillance' | 'traffic' | 'retail'>('surveillance');

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-electric-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Video className="w-3.5 h-3.5" /> Live Stream Intelligence
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Real-Time Video Analytics<br />
            <span className="text-gradient-indigo-cyan">at Global Scale</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Process live CCTV, warehouse, or municipal camera feeds instantly. Detect events, track movement, and configure smart alerts in real-time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Connect Your First Camera
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
              Schedule Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Enterprise Video Processing Features</h2>
            <p className="text-muted-foreground">Powering municipal operations, retail malls, and industrial yards.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Radio, title: 'Multi-Protocol Ingestion', desc: 'Ingest RTSP, RTMP, WebRTC, and HLS camera feeds with automatic reconnection mechanisms.' },
              { icon: Shield, title: 'Intrusion Zones & Gates', desc: 'Draw dynamic virtual tripwires and exclusion polygons directly on the stream using the UI.' },
              { icon: Activity, title: 'Crowd & Density Maps', desc: 'Aggregate spatial coordinates to map activity hot-spots, line queues, and occupancy flows.' }
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

      {/* 3. Interactive Stream Demo */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Simulate Live Camera Feeds</h2>
            <p className="text-muted-foreground">Toggle between camera presets to view real-time detections and stream state.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card-dark">
            <div className="flex border-b border-border bg-muted/20">
              {(['surveillance', 'traffic', 'retail'] as const).map(stream => (
                <button
                  key={stream}
                  onClick={() => setActiveStream(stream)}
                  className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${activeStream === stream ? 'bg-card border-b-2 border-indigo-500 text-indigo-400' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {stream === 'surveillance' ? 'Security Gate' : stream + ' Feed'}
                </button>
              ))}
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden border border-border aspect-video">
                {activeStream === 'surveillance' && (
                  <>
                    <img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&fit=crop" alt="Surveillance" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-1 bg-red-600/90 text-white text-[9px] uppercase font-bold rounded animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> Live Feed
                    </div>
                    <div className="absolute top-1/2 left-1/4 border-2 border-red-500 bg-red-500/25 px-2 py-0.5 rounded text-[10px] text-white font-bold animate-pulse">
                      INTRUDER DETECTED
                    </div>
                  </>
                )}
                {activeStream === 'traffic' && (
                  <>
                    <img src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&fit=crop" alt="Traffic" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-1 bg-green-600/90 text-white text-[9px] uppercase font-bold rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" /> Online
                    </div>
                    <div className="absolute top-20 left-24 border-2 border-cyan-500 bg-cyan-500/20 px-2 py-0.5 rounded text-[10px] text-white font-bold">
                      SUV: LPR [XYZ-998]
                    </div>
                  </>
                )}
                {activeStream === 'retail' && (
                  <>
                    <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&fit=crop" alt="Retail" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-1 bg-green-600/90 text-white text-[9px] uppercase font-bold rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" /> Online
                    </div>
                    <div className="absolute inset-0 bg-yellow-500/10 border-2 border-dashed border-yellow-500/40 m-6 flex items-end p-2">
                      <span className="bg-black/80 px-2 py-0.5 text-[9px] font-bold text-yellow-400">Dwell Zone: 4 Customers</span>
                    </div>
                  </>
                )}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {activeStream === 'surveillance' && 'Secure Perimeter Ingress'}
                  {activeStream === 'traffic' && 'Vehicle Flow & License Plate recognition'}
                  {activeStream === 'retail' && 'Retail Dwell-Time & Queue Analytics'}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {activeStream === 'surveillance' && 'Instantly flags human or vehicle entry into unauthorized locations. Triggers live alerts on the Slack, Teams, and Web dashboard.'}
                  {activeStream === 'traffic' && 'Counts cars, trucks, and buses. Deciphers license plate numbers (LPR) dynamically across multiple lanes, ideal for automated parking or smart cities.'}
                  {activeStream === 'retail' && 'Measures customer engagement inside predefined custom polygon zones. Integrates into retail metrics to track shelf engagement rates.'}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Latency: &lt; 200ms end-to-end
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> H.264 & H.265 Hardware Decoding
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stream Management Pipeline */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">How Stream Ingestion Works</h2>
            <p className="text-muted-foreground">Easy configuration to integrate your camera infrastructure seamlessly.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Connect Protocol', desc: 'Generate stream credentials on our dashboard and input the RTSP, RTMP or WebRTC link of your local network cameras.' },
              { step: '02', title: 'Define Logic Rules', desc: 'Draw intrusion polygons or crossing tripwires directly onto the video grid, and select alert severity.' },
              { step: '03', title: 'Webhooks & Actions', desc: 'Set up webhooks to deliver instantaneous notifications to mobile devices, database stores, or external software systems.' }
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
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Connect your first stream in minutes</h2>
          <p className="text-muted-foreground mb-8">Deploying video analytics has never been this simple. Try our edge-compatible streaming sandbox free.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
