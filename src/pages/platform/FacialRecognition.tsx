import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, Zap, UserCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function FacialRecognition() {
  useScrollTop();
  const [selectedLiveness, setSelectedLiveness] = useState<boolean>(true);

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Users className="w-3.5 h-3.5" /> Biometric Intelligence
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Facial Recognition &<br />
            <span className="text-gradient-indigo-cyan">Identity Verification</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Deploy secure, GDPR-compliant facial recognition for access control, automated attendance, and identity authentication with built-in liveness check.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Integrate Biometrics
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
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Enterprise-Grade Identity Features</h2>
            <p className="text-muted-foreground">High reliability biometric verification suited for security-critical environments.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: 'Liveness Detection', desc: 'Prevent spoofing attacks using static photos or screen videos with dynamic 3D depth validation.' },
              { icon: UserCheck, title: 'Identity Matching (1:N)', desc: 'Scan faces in crowds and match against lists with millions of records in milliseconds.' },
              { icon: Lock, title: 'GDPR & Privacy Compliant', desc: 'Perform identity checks entirely using irreversible vectors. Raw visual files are never stored.' }
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

      {/* 3. Liveness Check Interactive Demo */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Interactive Liveness Simulator</h2>
            <p className="text-muted-foreground">See how our neural models distinguish real human faces from print or digital screens.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card-dark">
            <div className="flex border-b border-border bg-muted/20">
              <button
                onClick={() => setSelectedLiveness(true)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${selectedLiveness ? 'bg-card border-b-2 border-indigo-500 text-indigo-400' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Real Face (Live)
              </button>
              <button
                onClick={() => setSelectedLiveness(false)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${!selectedLiveness ? 'bg-card border-b-2 border-indigo-500 text-indigo-400' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Printed Photo Spoof
              </button>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden border border-border aspect-square max-w-sm mx-auto">
                {selectedLiveness ? (
                  <>
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&fit=crop" alt="Live Face" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 border-4 border-green-500 flex flex-col justify-between p-4">
                      <div className="bg-green-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold self-start uppercase">
                        Real Face: Liveness Passed
                      </div>
                      <div className="bg-black/75 p-2 rounded text-[10px] text-white font-mono self-end">
                        Match Score: 99.7%
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&fit=crop" alt="Photo Spoof" className="w-full h-full object-cover grayscale" />
                    <div className="absolute inset-0 border-4 border-red-500 flex flex-col justify-between p-4">
                      <div className="bg-red-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold self-start uppercase">
                        SPOOF DETECTED
                      </div>
                      <div className="bg-black/75 p-2 rounded text-[10px] text-red-400 font-mono self-end">
                        Liveness Score: 0.02%
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {selectedLiveness ? 'Secure Face Match & Presence Check' : 'Anti-Spoofing & Liveness Shield'}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedLiveness ? 'Validates authentic user presence using dynamic light reflection, blink frequency, and micro-expressions. Recommended for mobile authentication and door control systems.' : 'Instantly blocks attempts to bypass security logs using paper prints, cardboard cutout shapes, or tablet screens.'}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Verification Speed: 80ms
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> False Acceptance Rate (FAR): &lt; 0.0001%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Workflow / Implementation Stages */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">How Biometric Enrolment Works</h2>
            <p className="text-muted-foreground">A secure, encrypted database lifecycle designed for user trust.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Vectorization (Enrolment)', desc: 'User scans face via browser or mobile SDK. The engine immediately converts geometry details to a 512-dimension mathematical array.' },
              { step: '02', title: 'Encrypted Storage', desc: 'The mathematical array vector is securely saved to your PostgreSQL/PgVector or Supabase DB. Raw face imagery is immediately deleted.' },
              { step: '03', title: 'Match & Authenticate', desc: 'When user attempts login, a new temporary vector is generated and compared in the database via cosine similarity.' }
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
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Protect your operations with biometrics</h2>
          <p className="text-muted-foreground mb-8">Access our facial verification API endpoints or download the iOS/Android SDK.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Start Building Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
