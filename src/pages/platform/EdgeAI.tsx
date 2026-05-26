import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Zap, HardDrive, Network, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function EdgeAI() {
  useScrollTop();
  const [edgeDevice, setEdgeDevice] = useState<'jetson' | 'raspi' | 'server'>('jetson');

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Cpu className="w-3.5 h-3.5" /> Edge Processing & IoT
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Vision Intelligence at<br />
            <span className="text-gradient-indigo-cyan">The Local Edge Network</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Deploy optimized AI models directly to NVIDIA Jetson hardware or local server nodes. Process video streams offline with zero data transit costs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Download Edge Daemon
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
              Talk to Edge Engineer
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Engineered for Remote Operations</h2>
            <p className="text-muted-foreground">High performance local nodes that continue running when the internet drops.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: HardDrive, title: '100% Offline Mode', desc: 'Run complete inferences, object tracking, and trigger local relay alarms without active cloud connection.' },
              { icon: Zap, title: '90% Bandwidth Savings', desc: 'Avoid streaming high-definition video to the cloud. Process raw streams locally and upload only JSON logs.' },
              { icon: Network, title: 'Fleet Orchestration', desc: 'Manage, deploy, and update model versions across thousands of remote edge devices via Docker/OTA.' }
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

      {/* 3. Interactive Hardware Simulator */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Supported Hardware Configs</h2>
            <p className="text-muted-foreground">Select hardware tiers to view local latency indices and stream capacity details.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card-dark">
            <div className="flex border-b border-border bg-muted/20">
              {(['jetson', 'raspi', 'server'] as const).map(tier => (
                <button
                  key={tier}
                  onClick={() => setEdgeDevice(tier)}
                  className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${edgeDevice === tier ? 'bg-card border-b-2 border-indigo-500 text-indigo-400' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {tier === 'jetson' ? 'NVIDIA Jetson' : tier === 'raspi' ? 'Raspberry Pi 5' : 'Edge Server Rack'}
                </button>
              ))}
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden border border-border bg-black/40 p-6 font-mono text-xs text-indigo-300">
                {edgeDevice === 'jetson' && (
                  <div className="space-y-2">
                    <div>&gt; HOSTNAME: jetson-nano-node-04</div>
                    <div className="text-green-400">&gt; STATUS: ONLINE (JetPack v5.1.2)</div>
                    <div>&gt; INTEL CORE CAPACITY: 100% UTILIZED</div>
                    <div>&gt; GPU RUNTIME: CUDA 11.8 (TensorRT 8.6)</div>
                    <div className="text-cyan-400">&gt; INFERENCE TIMING: 8.4ms (FP16)</div>
                    <div>&gt; STREAMS CONNECTED: 4 (RTSP 1080p)</div>
                  </div>
                )}
                {edgeDevice === 'raspi' && (
                  <div className="space-y-2">
                    <div>&gt; HOSTNAME: rpi5-sensor-node-12</div>
                    <div className="text-green-400">&gt; STATUS: ONLINE (RPi OS Bookworm)</div>
                    <div>&gt; NPU ACCELERATOR: Coral Edge TPU</div>
                    <div>&gt; RUNTIME: TensorFlow Lite (Quantized)</div>
                    <div className="text-cyan-400">&gt; INFERENCE TIMING: 22.1ms (INT8)</div>
                    <div>&gt; STREAMS CONNECTED: 1 (USB Camera)</div>
                  </div>
                )}
                {edgeDevice === 'server' && (
                  <div className="space-y-2">
                    <div>&gt; HOSTNAME: edge-rack-srv-01</div>
                    <div className="text-green-400">&gt; STATUS: ONLINE (Ubuntu 22.04 LTS)</div>
                    <div>&gt; HARDWARE: 2x NVIDIA RTX A6000 GPU</div>
                    <div>&gt; FRAMEWORK: Triton Inference Server</div>
                    <div className="text-cyan-400">&gt; INFERENCE TIMING: 1.8ms (Batch Size 16)</div>
                    <div>&gt; STREAMS CONNECTED: 32 (RTSP 4K UHD)</div>
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {edgeDevice === 'jetson' && 'NVIDIA Jetson AGX / Orin Series'}
                  {edgeDevice === 'raspi' && 'Raspberry Pi 5 with Coral USB Accelerator'}
                  {edgeDevice === 'server' && 'Industrial Edge Server with GPUs'}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {edgeDevice === 'jetson' && 'Optimal choice for retail or security corridors. Combines compact build size with raw neural compute speed for multiple high-definition camera feeds.'}
                  {edgeDevice === 'raspi' && 'Budget-friendly micro deployments. Ideal for simple triggers, counting sensors, or low-frequency image classification in IoT setups.'}
                  {edgeDevice === 'server' && 'Engineered for smart factory plants, airports, or large properties. Aggregates and runs predictions on dozens of active feeds in a centralized local rack.'}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Remote SSH & secure tunnel built-in
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Over-The-Air (OTA) container updates
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Deployment workflow */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Edge Daemon Setup</h2>
            <p className="text-muted-foreground">Get your edge node connected and configured in three terminal commands.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Install Daemon Container', desc: 'Pull our official Docker engine image on the edge hardware node and supply your device token keys.' },
              { step: '02', title: 'Local Stream Bind', desc: 'Bind local RTSP/USB cameras to the Edge Daemon configuration file, enabling processing logic to start.' },
              { step: '03', title: 'Cloud Log Sync', desc: 'The Daemon begins processing data locally, establishing a secure connection to sync metadata summary logs when online.' }
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
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Unleash low latency on-site processing</h2>
          <p className="text-muted-foreground mb-8">Deploy our Docker-based Edge Daemon on your local hardware today. Registration includes 3 trial device licenses.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Register Edge Device
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
