import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Wrench, CheckCircle, AlertTriangle, Clock, ArrowRight, Upload, TrendingUp, BarChart3, X, Play, Loader2, ImagePlus, FileImage } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

interface InspectionJob {
  id: string; batch: string; product: string;
  status: 'pass' | 'fail' | 'review';
  inspected: number; defects: number; passRate: number;
  time: string; line: string;
}

const INITIAL_JOBS: InspectionJob[] = [
  { id: 'J001', batch: 'Batch #4821', product: 'Circuit Board Type A', status: 'pass', inspected: 500, defects: 2, passRate: 99.6, time: '2 min ago', line: 'Line 1' },
  { id: 'J002', batch: 'Batch #4820', product: 'Aluminum Housing', status: 'fail', inspected: 250, defects: 18, passRate: 92.8, time: '15 min ago', line: 'Line 2' },
  { id: 'J003', batch: 'Batch #4819', product: 'Plastic Casing v2', status: 'pass', inspected: 750, defects: 4, passRate: 99.5, time: '32 min ago', line: 'Line 3' },
  { id: 'J004', batch: 'Batch #4818', product: 'Sensor Array X4', status: 'pass', inspected: 200, defects: 1, passRate: 99.5, time: '1 hr ago', line: 'Line 1' },
  { id: 'J005', batch: 'Batch #4817', product: 'Cable Assembly', status: 'review', inspected: 1000, defects: 9, passRate: 99.1, time: '2 hr ago', line: 'Line 4' },
  { id: 'J006', batch: 'Batch #4816', product: 'PCB Module V3', status: 'pass', inspected: 320, defects: 0, passRate: 100, time: '3 hr ago', line: 'Line 2' },
];

const DEFECT_TREND = [
  { batch: '#4816', defects: 0 }, { batch: '#4817', defects: 9 },
  { batch: '#4818', defects: 1 }, { batch: '#4819', defects: 4 },
  { batch: '#4820', defects: 18 }, { batch: '#4821', defects: 2 },
];

const DEFECT_TYPES = [
  { type: 'Surface Scratch', count: 12, color: '#6366f1' },
  { type: 'Dimensional', count: 8, color: '#ef4444' },
  { type: 'Discoloration', count: 6, color: '#f59e0b' },
  { type: 'Missing Part', count: 4, color: '#06b6d4' },
  { type: 'Misalignment', count: 4, color: '#22c55e' },
];

const PRODUCTS = [
  'Circuit Board Type A', 'Aluminum Housing', 'Plastic Casing v2',
  'Sensor Array X4', 'Cable Assembly', 'PCB Module V3', 'Motor Assembly', 'Connector Block',
];

const STATUS_STYLES: Record<string, string> = {
  pass: 'text-green-500 bg-green-500/10 border-green-500/20',
  fail: 'text-red-500 bg-red-500/10 border-red-500/20',
  review: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
};

type ModalStep = 'config' | 'running' | 'result';

interface InspectionResult {
  inspected: number; defects: number; passRate: number;
  status: 'pass' | 'fail' | 'review';
  defectBreakdown: { type: string; count: number }[];
}

export default function Quality() {
  useScrollTop();
  const [jobs, setJobs] = useState<InspectionJob[]>(INITIAL_JOBS);
  const [filter, setFilter] = useState<'all' | 'pass' | 'fail' | 'review'>('all');

  // Run Inspection modal
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<ModalStep>('config');
  const [batchNumber, setBatchNumber] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedLine, setSelectedLine] = useState('Line 1');
  const [sampleCount, setSampleCount] = useState('500');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<InspectionResult | null>(null);

  // Upload images
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const filtered = jobs.filter(j => filter === 'all' || j.status === filter);
  const avgPass = (jobs.reduce((s, j) => s + j.passRate, 0) / jobs.length).toFixed(1);

  const openModal = () => {
    setBatchNumber(`Batch #${4822 + jobs.length - INITIAL_JOBS.length}`);
    setModalStep('config');
    setProgress(0);
    setResult(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setProgress(0);
  };

  const startInspection = () => {
    if (!batchNumber.trim()) {
      toast.error('Please enter a batch number');
      return;
    }
    const count = parseInt(sampleCount) || 100;
    if (count < 1 || count > 5000) {
      toast.error('Sample count must be between 1 and 5,000');
      return;
    }
    setModalStep('running');
    setProgress(0);

    // Simulate progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);

        // Generate realistic result
        const defectRate = Math.random() * 0.08; // 0–8% defect rate
        const defects = Math.round(count * defectRate);
        const passRate = parseFloat(((count - defects) / count * 100).toFixed(1));
        const status: 'pass' | 'fail' | 'review' =
          passRate >= 99 ? 'pass' : passRate >= 95 ? 'review' : 'fail';

        const breakdown = defects > 0 ? [
          { type: 'Surface Scratch', count: Math.round(defects * 0.35) },
          { type: 'Dimensional', count: Math.round(defects * 0.25) },
          { type: 'Discoloration', count: Math.round(defects * 0.2) },
          { type: 'Misalignment', count: Math.round(defects * 0.2) },
        ].filter(d => d.count > 0) : [];

        const res: InspectionResult = { inspected: count, defects, passRate, status, defectBreakdown: breakdown };
        setResult(res);
        setModalStep('result');
      }
      setProgress(Math.min(p, 100));
    }, 180);
  };

  const saveResult = () => {
    if (!result) return;
    const newJob: InspectionJob = {
      id: `J${Date.now()}`,
      batch: batchNumber,
      product: selectedProduct,
      status: result.status,
      inspected: result.inspected,
      defects: result.defects,
      passRate: result.passRate,
      time: 'Just now',
      line: selectedLine,
    };
    setJobs(prev => [newJob, ...prev]);
    toast.success(`Inspection complete — ${result.status.toUpperCase()}`, {
      description: `${result.inspected} units · ${result.defects} defects · ${result.passRate}% pass rate`,
    });
    closeModal();
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const names = files.map(f => f.name);
    setUploadedFiles(prev => [...prev, ...names]);
    toast.success(`${files.length} image${files.length > 1 ? 's' : ''} uploaded`, {
      description: names.slice(0, 3).join(', ') + (names.length > 3 ? ` +${names.length - 3} more` : ''),
    });
    e.target.value = '';
  };

  return (
    <DashboardLayout>
      <div className="page-transition max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <Wrench className="w-6 h-6 text-green-400" /> Quality Inspection
            </h1>
            <p className="text-sm text-muted-foreground mt-1">AI-powered defect detection across production lines</p>
          </div>
          <div className="flex gap-2">
            <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFilesSelected} />
            <button
              onClick={handleUpload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-xl hover:text-foreground hover:bg-muted/80 transition-colors"
            >
              <Upload className="w-4 h-4" /> Upload Images
            </button>
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-green-600 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <Play className="w-4 h-4" /> Run Inspection
            </button>
          </div>
        </div>

        {/* Uploaded files pill */}
        {uploadedFiles.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Uploaded:</span>
            {uploadedFiles.slice(-4).map((name, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                <FileImage className="w-3 h-3" />{name}
              </span>
            ))}
            {uploadedFiles.length > 4 && (
              <span className="text-xs text-muted-foreground">+{uploadedFiles.length - 4} more</span>
            )}
          </div>
        )}

        {/* Run Inspection Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl w-full max-w-lg animate-fade-in shadow-2xl">

              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600/20 to-cyan-500/20 flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground text-sm">
                      {modalStep === 'config' && 'Configure Inspection'}
                      {modalStep === 'running' && 'Running AI Inspection...'}
                      {modalStep === 'result' && 'Inspection Complete'}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {modalStep === 'config' && 'Set batch parameters before starting'}
                      {modalStep === 'running' && 'AI is scanning for defects'}
                      {modalStep === 'result' && 'Review results and save to log'}
                    </p>
                  </div>
                </div>
                {modalStep !== 'running' && (
                  <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Config Step */}
              {modalStep === 'config' && (
                <div className="p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Batch Number *</label>
                      <input
                        value={batchNumber}
                        onChange={e => setBatchNumber(e.target.value)}
                        placeholder="e.g. Batch #4822"
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Production Line</label>
                      <select
                        value={selectedLine}
                        onChange={e => setSelectedLine(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      >
                        {['Line 1', 'Line 2', 'Line 3', 'Line 4'].map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Product Type</label>
                    <select
                      value={selectedProduct}
                      onChange={e => setSelectedProduct(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    >
                      {PRODUCTS.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Sample Count</label>
                    <input
                      type="number"
                      min={1} max={5000}
                      value={sampleCount}
                      onChange={e => setSampleCount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Number of units to inspect (1–5,000)</p>
                  </div>

                  {/* Optional upload area */}
                  <button
                    type="button"
                    onClick={handleUpload}
                    className="w-full flex flex-col items-center gap-2 p-4 rounded-xl border border-dashed border-border hover:border-green-500/40 hover:bg-green-500/5 transition-all group"
                  >
                    <ImagePlus className="w-6 h-6 text-muted-foreground group-hover:text-green-400 transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      Attach inspection images (optional)
                    </span>
                  </button>

                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={startInspection}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all text-sm"
                    >
                      <Play className="w-4 h-4" /> Start AI Inspection
                    </button>
                    <button onClick={closeModal} className="px-5 py-3 border border-border text-muted-foreground rounded-xl hover:text-foreground hover:bg-muted transition-colors text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Running Step */}
              {modalStep === 'running' && (
                <div className="p-6 space-y-6">
                  <div className="text-center py-4">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-muted" />
                      <div
                        className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin"
                        style={{ animationDuration: '1s' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-foreground">{Math.round(progress)}%</span>
                      </div>
                    </div>
                    <p className="font-heading font-semibold text-foreground mb-1">Analyzing {sampleCount} units</p>
                    <p className="text-xs text-muted-foreground">Running {selectedProduct} · {selectedLine}</p>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-green-600 to-cyan-500 transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Processing frames...</span>
                      <span>{Math.round((progress / 100) * parseInt(sampleCount))} / {sampleCount} units</span>
                    </div>
                  </div>

                  {/* Live log */}
                  <div className="rounded-xl bg-muted/50 border border-border p-3 space-y-1.5 font-mono text-xs">
                    {progress > 5 && <p className="text-green-400">✓ Model loaded: DefectScan v2.1</p>}
                    {progress > 20 && <p className="text-muted-foreground">→ Scanning surface texture...</p>}
                    {progress > 40 && <p className="text-muted-foreground">→ Checking dimensional accuracy...</p>}
                    {progress > 60 && <p className="text-muted-foreground">→ Analyzing color consistency...</p>}
                    {progress > 80 && <p className="text-muted-foreground">→ Running final defect pass...</p>}
                    {progress >= 100 && <p className="text-cyan-400">✓ Analysis complete</p>}
                  </div>
                </div>
              )}

              {/* Result Step */}
              {modalStep === 'result' && result && (
                <div className="p-6 space-y-5">
                  {/* Pass/Fail banner */}
                  <div className={`flex items-center gap-3 p-4 rounded-xl border ${STATUS_STYLES[result.status]}`}>
                    {result.status === 'pass' ? <CheckCircle className="w-6 h-6 flex-shrink-0" /> :
                      result.status === 'fail' ? <AlertTriangle className="w-6 h-6 flex-shrink-0" /> :
                        <Clock className="w-6 h-6 flex-shrink-0" />}
                    <div>
                      <p className="font-heading font-bold text-base capitalize">{result.status === 'pass' ? 'Passed Quality Check' : result.status === 'fail' ? 'Failed — Defects Detected' : 'Review Required'}</p>
                      <p className="text-xs opacity-80 mt-0.5">{batchNumber} · {selectedProduct} · {selectedLine}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-muted/50 text-center">
                      <div className="font-heading font-bold text-foreground text-lg">{result.inspected.toLocaleString()}</div>
                      <div className="text-[10px] text-muted-foreground">Units Inspected</div>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50 text-center">
                      <div className={`font-heading font-bold text-lg ${result.defects > 0 ? 'text-red-400' : 'text-green-400'}`}>{result.defects}</div>
                      <div className="text-[10px] text-muted-foreground">Defects Found</div>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50 text-center">
                      <div className={`font-heading font-bold text-lg ${result.passRate >= 99 ? 'text-green-400' : result.passRate >= 95 ? 'text-yellow-400' : 'text-red-400'}`}>{result.passRate}%</div>
                      <div className="text-[10px] text-muted-foreground">Pass Rate</div>
                    </div>
                  </div>

                  {/* Defect breakdown */}
                  {result.defectBreakdown.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-2">Defect Breakdown</p>
                      <div className="space-y-2">
                        {result.defectBreakdown.map(d => (
                          <div key={d.type} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{d.type}</span>
                            <span className="font-medium text-foreground">{d.count} units</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.defects === 0 && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>No defects detected — batch cleared for shipping</span>
                    </div>
                  )}

                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={saveResult}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-green-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm"
                    >
                      <CheckCircle className="w-4 h-4" /> Save to Log
                    </button>
                    <button onClick={closeModal} className="px-5 py-2.5 border border-border text-muted-foreground rounded-xl hover:text-foreground hover:bg-muted transition-colors text-sm">
                      Discard
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Batches Today', value: String(247 + jobs.length - INITIAL_JOBS.length), icon: Wrench, color: 'text-green-400' },
            { label: 'Avg Pass Rate', value: `${avgPass}%`, icon: TrendingUp, color: 'text-cyan-400' },
            { label: 'Defects Found', value: String(jobs.reduce((s, j) => s + j.defects, 0)), icon: AlertTriangle, color: 'text-red-400' },
            { label: 'Lines Active', value: '4/4', icon: BarChart3, color: 'text-indigo-400' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-border">
              <Icon className={`w-5 h-5 ${color} mb-3`} />
              <div className="font-heading text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-heading font-semibold text-foreground mb-1">Defects per Batch</h3>
            <p className="text-xs text-muted-foreground mb-4">Recent 6 batches</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={DEFECT_TREND} barSize={28}>
                <defs>
                  <linearGradient id="defGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444"/>
                    <stop offset="100%" stopColor="#f59e0b"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" vertical={false} />
                <XAxis dataKey="batch" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="defects" fill="url(#defGrad)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-heading font-semibold text-foreground mb-4">Defect Type Breakdown</h3>
            <div className="space-y-3">
              {DEFECT_TYPES.map(d => (
                <div key={d.type}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{d.type}</span>
                    <span className="font-medium text-foreground">{d.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${(d.count / 34) * 100}%`, backgroundColor: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters + Table */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            {(['all', 'pass', 'fail', 'review'] as const).map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all capitalize ${filter === s ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                {s}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filtered.map(job => (
              <div key={job.id} className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border ${STATUS_STYLES[job.status]}`}>
                <div className="flex-shrink-0">
                  {job.status === 'pass' ? <CheckCircle className="w-5 h-5" /> : job.status === 'fail' ? <AlertTriangle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading font-semibold text-foreground text-sm">{job.batch}</span>
                    <span className="text-xs text-muted-foreground">{job.product}</span>
                    <span className="text-[10px] text-muted-foreground">· {job.line}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{job.time}</div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-center">
                    <div className="font-heading font-bold text-foreground text-sm">{job.inspected.toLocaleString()}</div>
                    <div className="text-[10px] text-muted-foreground">Inspected</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-heading font-bold text-sm ${job.defects > 0 ? 'text-red-500' : 'text-green-500'}`}>{job.defects}</div>
                    <div className="text-[10px] text-muted-foreground">Defects</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-heading font-bold text-sm ${job.passRate >= 99 ? 'text-green-500' : job.passRate >= 95 ? 'text-yellow-500' : 'text-red-500'}`}>{job.passRate}%</div>
                    <div className="text-[10px] text-muted-foreground">Pass Rate</div>
                  </div>
                  <div className="w-16 hidden sm:block">
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${job.passRate}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                <Wrench className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium text-sm">No inspections match this filter</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-green-600/10 to-cyan-500/10 border border-green-500/20 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-heading font-semibold text-foreground">Train a custom defect detection model</p>
            <p className="text-xs text-muted-foreground mt-1">Improve accuracy for your specific products using transfer learning.</p>
          </div>
          <Link to="/dashboard/models" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-green-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all whitespace-nowrap">
            Train Model <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
