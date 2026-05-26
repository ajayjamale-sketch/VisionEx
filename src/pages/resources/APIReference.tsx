import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Code2, Key, Terminal, FileJson, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const ENDPOINTS = [
  { method: 'POST', path: '/v1/detections', desc: 'Perform object detection on static imagery.', auth: 'vx_key_...' },
  { method: 'GET', path: '/v1/streams', desc: 'Retrieve a list of connected edge camera streams.', auth: 'vx_key_...' },
  { method: 'POST', path: '/v1/liveness', desc: 'Evaluate biometric presence and anti-spoof checks.', auth: 'vx_key_...' },
  { method: 'POST', path: '/v1/ocr', desc: 'Extract unstructured text blocks from uploaded documents.', auth: 'vx_key_...' },
];

export default function APIReference() {
  useScrollTop();
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/v1/detections');

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Code2 className="w-3.5 h-3.5" /> API Specification
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            VisionEx REST API<br />
            <span className="text-gradient-indigo-cyan">Reference Manual</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Access exhaustive specifications for our visual intelligence endpoints. Learn about parameters, formats, and response payloads.
          </p>
        </div>
      </section>

      {/* 2. Authentication Protocol */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Authorization Protocol</h2>
            <p className="text-muted-foreground">VisionEx uses Bearer Tokens to authenticate requests securely.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Key, title: 'Header Auth', desc: 'Pass your secret API key inside the HTTP Authorization header: Authorization: Bearer vx_key_...' },
              { icon: FileJson, title: 'JSON Requests', desc: 'All POST endpoints accept application/json or multipart/form-data for image uploads.' },
              { icon: Terminal, title: 'TLS 1.3 Encryption', desc: 'All connections must be established over HTTPS. HTTP requests are automatically dropped.' }
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

      {/* 3. Interactive Endpoint Schema */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Endpoint Interactive Sandbox</h2>
            <p className="text-muted-foreground">Select an endpoint below to view the expected JSON response body.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card-dark">
            <div className="flex border-b border-border bg-muted/20 overflow-x-auto">
              {ENDPOINTS.map(ep => (
                <button
                  key={ep.path}
                  onClick={() => setSelectedEndpoint(ep.path)}
                  className={`flex-1 min-w-[120px] py-3 text-xs font-semibold transition-colors ${selectedEndpoint === ep.path ? 'bg-card border-b-2 border-indigo-500 text-indigo-400' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <span className="text-cyan-400 font-bold mr-1.5">{ep.method}</span>{ep.path}
                </button>
              ))}
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden border border-border bg-black/40 p-4 font-mono text-[10px] text-indigo-300">
                {selectedEndpoint === '/v1/detections' && (
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    &#123;<br />
                    &nbsp;&nbsp;"status": "success",<br />
                    &nbsp;&nbsp;"detections": [<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"label": "person",<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"confidence": 0.992,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"bbox": [104, 250, 480, 600]<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                    &nbsp;&nbsp;]<br />
                    &#125;
                  </pre>
                )}
                {selectedEndpoint === '/v1/streams' && (
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    &#123;<br />
                    &nbsp;&nbsp;"total_streams": 2,<br />
                    &nbsp;&nbsp;"streams": [<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&#123; "id": "cam_01", "status": "online" &#125;,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&#123; "id": "cam_02", "status": "offline" &#125;<br />
                    &nbsp;&nbsp;]<br />
                    &#125;
                  </pre>
                )}
                {selectedEndpoint === '/v1/liveness' && (
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    &#123;<br />
                    &nbsp;&nbsp;"liveness_check": "passed",<br />
                    &nbsp;&nbsp;"liveness_score": 0.998,<br />
                    &nbsp;&nbsp;"spoof_probability": 0.002<br />
                    &#125;
                  </pre>
                )}
                {selectedEndpoint === '/v1/ocr' && (
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    &#123;<br />
                    &nbsp;&nbsp;"ocr_blocks": [<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&#123; "text": "TOTAL BALANCE", "confidence": 0.98 &#125;,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&#123; "text": "$1,450.00", "confidence": 0.99 &#125;<br />
                    &nbsp;&nbsp;]<br />
                    &#125;
                  </pre>
                )}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {selectedEndpoint === '/v1/detections' && 'Image Object Recognition'}
                  {selectedEndpoint === '/v1/streams' && 'Camera Stream Summary'}
                  {selectedEndpoint === '/v1/liveness' && 'Facial Anti-Spoofing'}
                  {selectedEndpoint === '/v1/ocr' && 'Document Text Extraction'}
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  {selectedEndpoint === '/v1/detections' && 'Processes visual image feeds and returns object classifications alongside coordinates mapping pixel bounding boxes.'}
                  {selectedEndpoint === '/v1/streams' && 'Queries connected edge device RTSP statuses to verify frame transmission and latency parameters.'}
                  {selectedEndpoint === '/v1/liveness' && 'Analyzes facial coordinates to verify physical liveness. Use as a secure access check step.'}
                  {selectedEndpoint === '/v1/ocr' && 'Deciphers characters from uploaded media, returning parsed alphanumeric arrays with individual block confidences.'}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Response header: application/json
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" /> CORS: Enabled for web browser clients
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Common Error Codes */}
      <section className="py-16 bg-muted/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">HTTP Response Codes</h2>
            <p className="text-muted-foreground">Standard errors you should handle when executing API queries.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { code: '400 Bad Request', desc: 'Missing required parameters, invalid image formatting, or model name does not exist.' },
              { code: '401 Unauthorized', desc: 'Missing or expired API secret key, or scope permission does not cover selected models.' },
              { code: '429 Rate Limit', desc: 'Rate limit has been exceeded. Back off queries or upgrade plan to increase concurrency.' },
              { code: '500 Server Error', desc: 'Internal error in our neural hardware node. Automatically logged and monitored.' }
            ].map(({ code, desc }) => (
              <div key={code} className="p-4 rounded-xl bg-card border border-border flex gap-3">
                <AlertCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-semibold text-foreground text-sm">{code}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Integrate neural nodes today</h2>
          <p className="text-muted-foreground mb-8">Access our free trial credentials dashboard. Includes API key setups, billing profiles, and query analytics.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Create Developer Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
