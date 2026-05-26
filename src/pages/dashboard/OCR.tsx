import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { FileText, Upload, CheckCircle, Clock, ArrowRight, Download, Eye, X, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface OCRJob {
  id: string; name: string; type: string;
  status: 'completed' | 'processing' | 'review';
  confidence: number | null; extracted: number; time: string;
  preview: string | null;
}

const INITIAL_JOBS: OCRJob[] = [
  { id: 'O001', name: 'Invoice_Q4_2024.pdf', type: 'Invoice', status: 'completed', confidence: 98.4, extracted: 12, time: '2 min ago', preview: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=120&h=80&fit=crop' },
  { id: 'O002', name: 'Employee_ID_Batch.zip', type: 'ID Card', status: 'processing', confidence: null, extracted: 0, time: 'Processing...', preview: null },
  { id: 'O003', name: 'Purchase_Order_4821.pdf', type: 'Purchase Order', status: 'completed', confidence: 96.2, extracted: 8, time: '15 min ago', preview: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=120&h=80&fit=crop' },
  { id: 'O004', name: 'Contract_Draft_v3.docx', type: 'Contract', status: 'completed', confidence: 94.7, extracted: 24, time: '1 hr ago', preview: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=120&h=80&fit=crop' },
  { id: 'O005', name: 'Form_W9_Vendor.pdf', type: 'Tax Form', status: 'review', confidence: 87.3, extracted: 6, time: '2 hr ago', preview: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=120&h=80&fit=crop' },
];

const STATUS_STYLES: Record<string, string> = {
  completed: 'text-green-500 bg-green-500/10 border-green-500/20',
  processing: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
  review: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
};

const TYPE_COLORS: Record<string, string> = {
  Invoice: 'bg-cyan-500/20 text-cyan-400',
  'ID Card': 'bg-indigo-500/20 text-indigo-400',
  'Purchase Order': 'bg-green-500/20 text-green-400',
  Contract: 'bg-yellow-500/20 text-yellow-400',
  'Tax Form': 'bg-orange-500/20 text-orange-400',
};

export default function OCRDocs() {
  useScrollTop();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [jobs, setJobs] = useState<OCRJob[]>(INITIAL_JOBS);
  const [previewJob, setPreviewJob] = useState<OCRJob | null>(null);

  const handleFileDrop = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const newJob: OCRJob = {
      id: `O${Date.now()}`,
      name: file.name,
      type: 'Invoice',
      status: 'processing',
      confidence: null,
      extracted: 0,
      time: 'Just now',
      preview: null,
    };
    setJobs(prev => [newJob, ...prev]);
    toast.success(`Uploaded: ${file.name}`, { description: 'OCR extraction started...' });

    // Simulate processing → completed
    setTimeout(() => {
      setJobs(prev => prev.map(j => j.id === newJob.id
        ? { ...j, status: 'completed', confidence: 95.8, extracted: 9, time: 'Just now' }
        : j
      ));
      toast.success(`Extraction complete: ${file.name}`, { description: '9 fields extracted with 95.8% confidence.' });
    }, 3000);
  };

  const handleDownload = (job: OCRJob) => {
    toast.success(`Downloading ${job.name}`, { description: 'Extracted data will download as JSON.' });
  };

  const handleDelete = (id: string) => {
    const job = jobs.find(j => j.id === id);
    setJobs(prev => prev.filter(j => j.id !== id));
    toast.success(`Removed: ${job?.name}`);
  };

  return (
    <DashboardLayout>
      <div className="page-transition max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-400" /> OCR & Document Intelligence
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Extract structured data from documents, invoices, and ID cards</p>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx,.jpg,.jpeg,.png,.tiff"
          onChange={e => handleFileDrop(e.target.files)}
        />

        {/* Upload zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleFileDrop(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${dragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-border hover:border-indigo-500/50 hover:bg-muted/30'}`}
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-6 h-6 text-indigo-400" />
          </div>
          <p className="font-heading font-semibold text-foreground mb-1">Drop documents here or click to upload</p>
          <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOCX, JPG, PNG, TIFF — up to 50MB</p>
          <button
            onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all text-sm"
          >
            Choose Files
          </button>
        </div>

        {/* Supported types */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Invoices & Bills', desc: 'Extract line items, totals, vendor info' },
            { label: 'ID Cards & Passports', desc: 'Parse identity fields and photos' },
            { label: 'Contracts & Agreements', desc: 'Extract clauses and signatures' },
            { label: 'Custom Forms', desc: 'Define custom extraction fields' },
          ].map(({ label, desc }) => (
            <button
              key={label}
              onClick={() => { toast.info(label, { description: desc }); }}
              className="p-4 rounded-xl bg-card border border-border hover:border-indigo-500/20 transition-all text-left"
            >
              <div className="font-heading font-semibold text-foreground text-sm mb-1">{label}</div>
              <div className="text-xs text-muted-foreground">{desc}</div>
            </button>
          ))}
        </div>

        {/* Recent jobs */}
        <div>
          <h2 className="font-heading font-semibold text-foreground mb-3">Recent Extraction Jobs</h2>
          <div className="space-y-2">
            {jobs.map(job => (
              <div key={job.id} className={`flex items-center gap-4 p-4 rounded-2xl border ${STATUS_STYLES[job.status]}`}>
                {job.preview ? (
                  <img src={job.preview} alt={job.name} className="w-16 h-10 object-cover rounded-lg border border-border flex-shrink-0" />
                ) : (
                  <div className="w-16 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-indigo-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading font-semibold text-foreground text-sm truncate">{job.name}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${TYPE_COLORS[job.type] || 'bg-muted text-muted-foreground'}`}>{job.type}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {job.time}{job.confidence ? ` · ${job.confidence}% confidence · ${job.extracted} fields` : ''}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {job.status === 'processing' ? (
                    <div className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin" />
                  ) : (
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${STATUS_STYLES[job.status]}`}>{job.status}</span>
                  )}
                  {job.status === 'completed' && (
                    <>
                      <button
                        onClick={() => setPreviewJob(job)}
                        title="Preview extracted data"
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDownload(job)}
                        title="Download extracted data"
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(job.id)}
                    title="Remove job"
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Modal */}
        {previewJob && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-foreground">Extracted Data</h3>
                <button onClick={() => setPreviewJob(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {previewJob.preview && (
                <img src={previewJob.preview} alt={previewJob.name} className="w-full h-32 object-cover rounded-xl mb-4 border border-border" />
              )}
              <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
                {[
                  { field: 'Document Type', value: previewJob.type },
                  { field: 'File Name', value: previewJob.name },
                  { field: 'Confidence Score', value: `${previewJob.confidence}%` },
                  { field: 'Fields Extracted', value: `${previewJob.extracted} fields` },
                  { field: 'Vendor / Issuer', value: 'Acme Corp International' },
                  { field: 'Date', value: 'Dec 18, 2024' },
                  { field: 'Total Amount', value: '$14,280.00' },
                  { field: 'Currency', value: 'USD' },
                ].map(({ field, value }) => (
                  <div key={field} className="flex justify-between items-center p-2.5 rounded-lg bg-muted/50">
                    <span className="text-xs text-muted-foreground">{field}</span>
                    <span className="text-xs font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleDownload(previewJob)} className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl text-sm hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download JSON
                </button>
                <button onClick={() => setPreviewJob(null)} className="flex-1 py-2.5 border border-border text-muted-foreground rounded-xl hover:text-foreground hover:bg-muted transition-colors text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-600/10 to-indigo-500/10 border border-cyan-500/20 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-heading font-semibold text-foreground">Connect to your document workflow</p>
            <p className="text-xs text-muted-foreground mt-1">Integrate with SharePoint, Google Drive, or Salesforce via our REST API.</p>
          </div>
          <Link to="/settings" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-cyan-600 to-indigo-500 text-white rounded-xl hover:shadow-glow-cyan transition-all whitespace-nowrap">
            Setup Integration <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
