import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Wrench, Shield, CheckCircle, AlertTriangle, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function QualityInspection() {
  useScrollTop();
  const [inspectionPassed, setInspectionPassed] = useState<boolean>(true);

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Wrench className="w-3.5 h-3.5" /> Automated Quality Control
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Industrial Visual Inspection<br />
            <span className="text-gradient-indigo-cyan">Powered by AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Deploy real-time defect detection, dimension validation, and assembly auditing on factory assembly lines with sub-millimeter precision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Set Up Inspection Line
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Engineered for Precision Manufacturing</h2>
            <p className="text-muted-foreground">Integrating directly with PLCs, conveyors, and smart factory hubs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: AlertTriangle, title: 'Micro Defect Detection', desc: 'Detect hairline fractures, surface scratches, air bubbles, and color deviations in real-time.' },
              { icon: Shield, title: 'Dimensional Audit', desc: 'Verify physical tolerances, height alignments, and circular shapes with sub-millimeter laser-visual algorithms.' },
              { icon: CheckCircle, title: 'Assembly Validation', desc: 'Confirm component placements, screw tightness, labels, and packaging completeness automatically.' }
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

      {/* 3. Interactive QA Simulator */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Live Line Simulation</h2>
            <p className="text-muted-foreground">Test how the VisionEx quality model classifies items passing through a conveyor stream.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card-dark">
            <div className="flex border-b border-border bg-muted/20">
              <button
                onClick={() => setInspectionPassed(true)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${inspectionPassed ? 'bg-card border-b-2 border-green-500 text-green-400' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Compliant Item (Pass)
              </button>
              <button
                onClick={() => setInspectionPassed(false)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${!inspectionPassed ? 'bg-card border-b-2 border-red-500 text-red-400' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Defective Item (Fail)
              </button>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden border border-border aspect-video max-w-sm mx-auto">
                {inspectionPassed ? (
                  <>
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&fit=crop" alt="Inspected PCB" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 border-4 border-green-500 flex flex-col justify-between p-4 bg-green-500/5">
                      <div className="bg-green-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold self-start uppercase">
                        PCB Pass: 100% Assembly OK
                      </div>
                      <div className="bg-black/75 p-2 rounded text-[10px] text-white font-mono self-end">
                        Cycle Time: 12ms
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&fit=crop" alt="Defective PCB" className="w-full h-full object-cover saturate-50" />
                    <div className="absolute inset-0 border-4 border-red-500 flex flex-col justify-between p-4 bg-red-500/10">
                      <div className="bg-red-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold self-start uppercase">
                        CRITICAL FAULT: Missing Capacitor C12
                      </div>
                      <div className="bg-black/75 p-2 rounded text-[10px] text-red-400 font-mono self-end">
                        Action: Diverted Conveyor
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {inspectionPassed ? 'High Speed Circuit Assembly Audit' : 'Instant Defect Flagging & Actuator Trigger'}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {inspectionPassed ? 'Audits PCB circuit boards passing at up to 120 items per minute. Confirms placement of surface-mount components, polarity alignments, and solder completeness.' : 'Identifies missing parts or hairline cracks, immediately signaling the conveyor controller (via PLC webhook) to route the defect to the sorting chute.'}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Integration protocols: OPC UA, Modbus TCP, MQTT
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Defect Classification: Resnet-50 custom annotated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Manufacturing Deployment Pipeline */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Line Integration Process</h2>
            <p className="text-muted-foreground">We support deployment in standard manufacturing networks.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Mount Smart Cameras', desc: 'Install high-speed industrial IP cameras above inspection positions, connecting via standard PoE adapters.' },
              { step: '02', title: 'Annotate & Train', desc: 'Upload 200-500 images of standard products and defect types. Use our visual dataset tool to highlight tolerances.' },
              { step: '03', title: 'Connect PLC Controller', desc: 'Map digital outputs to PLC inputs to trigger reject arms or line halts whenever anomalies occur.' }
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
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Reduce defect rates to near zero</h2>
          <p className="text-muted-foreground mb-8">Deploy VisionEx on local server hardware or edge devices. Get a free trial of our dataset annotation software.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Start Dataset Upload
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
