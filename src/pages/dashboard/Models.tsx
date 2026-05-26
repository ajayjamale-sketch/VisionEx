import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Brain, Plus, Play, Pause, Trash2, CheckCircle, Clock, ArrowRight, X } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { toast } from 'sonner';

const INITIAL_MODELS = [
  { id: '1', name: 'ObjectDetect v3.2', type: 'Object Detection', accuracy: 97.4, status: 'deployed', inferenceTime: '12ms', trainedOn: '50K images', lastUpdated: '3 days ago', framework: 'YOLOv8' },
  { id: '2', name: 'FaceID Pro', type: 'Facial Recognition', accuracy: 99.1, status: 'deployed', inferenceTime: '28ms', trainedOn: '200K faces', lastUpdated: '1 week ago', framework: 'ArcFace' },
  { id: '3', name: 'DefectScan v2', type: 'Quality Inspection', accuracy: 95.8, status: 'deployed', inferenceTime: '35ms', trainedOn: '30K products', lastUpdated: '2 weeks ago', framework: 'ResNet-50' },
  { id: '4', name: 'VehicleAI v1.5', type: 'Vehicle Recognition', accuracy: 93.2, status: 'training', inferenceTime: '18ms', trainedOn: '80K vehicles', lastUpdated: 'In progress', framework: 'EfficientDet' },
  { id: '5', name: 'OCR Master v4', type: 'OCR / Documents', accuracy: 98.6, status: 'deployed', inferenceTime: '45ms', trainedOn: '1M documents', lastUpdated: '5 days ago', framework: 'PaddleOCR' },
  { id: '6', name: 'CrowdFlow Beta', type: 'Crowd Analytics', accuracy: 91.0, status: 'paused', inferenceTime: '22ms', trainedOn: '15K scenes', lastUpdated: '3 weeks ago', framework: 'OpenPose' },
];

const RADAR_DATA = [
  { metric: 'Accuracy', ObjectDetect: 97, FaceID: 99, DefectScan: 96 },
  { metric: 'Speed', ObjectDetect: 88, FaceID: 72, DefectScan: 65 },
  { metric: 'Recall', ObjectDetect: 95, FaceID: 98, DefectScan: 93 },
  { metric: 'Precision', ObjectDetect: 96, FaceID: 99, DefectScan: 94 },
  { metric: 'F1 Score', ObjectDetect: 95, FaceID: 98, DefectScan: 93 },
];

const PERF_DATA = [
  { name: 'Jan', accuracy: 94.2 }, { name: 'Feb', accuracy: 95.1 },
  { name: 'Mar', accuracy: 95.8 }, { name: 'Apr', accuracy: 96.3 },
  { name: 'May', accuracy: 97.0 }, { name: 'Jun', accuracy: 97.4 },
];

const STATUS_STYLES: Record<string, string> = {
  deployed: 'bg-green-500/20 text-green-400 border border-green-500/30',
  training: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 animate-pulse',
  paused: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
};

type ModelStatus = 'deployed' | 'training' | 'paused';
interface Model {
  id: string; name: string; type: string; accuracy: number;
  status: ModelStatus; inferenceTime: string; trainedOn: string;
  lastUpdated: string; framework: string;
}

export default function Models() {
  useScrollTop();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'models' | 'performance'>('models');
  const [models, setModels] = useState<Model[]>(INITIAL_MODELS);
  const [showTrainModal, setShowTrainModal] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [newModelType, setNewModelType] = useState('Object Detection');

  const toggleStatus = (id: string) => {
    setModels(prev => prev.map(m => {
      if (m.id !== id) return m;
      if (m.status === 'deployed') {
        toast.success(`${m.name} paused`, { description: 'Model is no longer processing requests.' });
        return { ...m, status: 'paused' as ModelStatus };
      }
      if (m.status === 'paused') {
        toast.success(`${m.name} resumed`, { description: 'Model is now accepting inference requests.' });
        return { ...m, status: 'deployed' as ModelStatus };
      }
      return m;
    }));
  };

  const deleteModel = (id: string) => {
    const model = models.find(m => m.id === id);
    if (!model) return;
    setModels(prev => prev.filter(m => m.id !== id));
    toast.success(`${model.name} deleted`, { description: 'Model and all associated data removed.' });
  };

  const handleTrainNew = () => {
    if (!newModelName.trim()) {
      toast.error('Please enter a model name');
      return;
    }
    const newModel: Model = {
      id: Date.now().toString(),
      name: newModelName,
      type: newModelType,
      accuracy: 0,
      status: 'training',
      inferenceTime: '—',
      trainedOn: 'Pending',
      lastUpdated: 'Just started',
      framework: 'AutoML',
    };
    setModels(prev => [newModel, ...prev]);
    setShowTrainModal(false);
    setNewModelName('');
    toast.success('Training job started!', { description: `${newModelName} is now in the training queue.` });
  };

  return (
    <DashboardLayout>
      <div className="page-transition max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <Brain className="w-6 h-6 text-indigo-400" /> AI Models
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {models.filter(m => m.status === 'deployed').length} deployed · {models.filter(m => m.status === 'training').length} training · {models.filter(m => m.status === 'paused').length} paused
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex p-1 bg-muted rounded-xl">
              {(['models', 'performance'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${tab === t ? 'bg-card text-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
                  {t}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTrainModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl hover:shadow-glow-cyan transition-all"
            >
              <Plus className="w-4 h-4" /> Train New Model
            </button>
          </div>
        </div>

        {/* Train New Model Modal */}
        {showTrainModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-foreground">Train New Model</h3>
                <button onClick={() => setShowTrainModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Model Name</label>
                  <input
                    value={newModelName}
                    onChange={e => setNewModelName(e.target.value)}
                    placeholder="e.g. CustomDetect v1.0"
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Model Type</label>
                  <select
                    value={newModelType}
                    onChange={e => setNewModelType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  >
                    <option>Object Detection</option>
                    <option>Facial Recognition</option>
                    <option>Quality Inspection</option>
                    <option>Vehicle Recognition</option>
                    <option>OCR / Documents</option>
                    <option>Crowd Analytics</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-2">
                  <button onClick={handleTrainNew} className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all text-sm">
                    Start Training
                  </button>
                  <button onClick={() => setShowTrainModal(false)} className="flex-1 py-2.5 border border-border text-muted-foreground rounded-xl hover:text-foreground hover:bg-muted transition-colors text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'models' ? (
          <div className="grid gap-3">
            {models.map(model => (
              <div key={model.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-heading font-semibold text-foreground">{model.name}</h3>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${STATUS_STYLES[model.status]}`}>{model.status}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 flex-wrap">
                    <span className="text-xs text-muted-foreground">{model.type}</span>
                    <span className="text-xs text-muted-foreground">{model.framework}</span>
                    <span className="text-xs text-muted-foreground">Trained on {model.trainedOn}</span>
                    <span className="text-xs text-muted-foreground">Updated {model.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  {model.status !== 'training' && (
                    <>
                      <div className="text-center">
                        <div className="font-heading font-bold text-foreground">{model.accuracy > 0 ? `${model.accuracy}%` : '—'}</div>
                        <div className="text-[10px] text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="font-heading font-bold text-foreground">{model.inferenceTime}</div>
                        <div className="text-[10px] text-muted-foreground">Inference</div>
                      </div>
                      {model.accuracy > 0 && (
                        <div className="w-20 hidden sm:block">
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" style={{ width: `${model.accuracy}%` }} />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div className="flex items-center gap-1.5">
                    {model.status === 'deployed' ? (
                      <button
                        onClick={() => toggleStatus(model.id)}
                        title="Pause model"
                        className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center hover:bg-yellow-500/20 transition-colors"
                      >
                        <Pause className="w-3.5 h-3.5" />
                      </button>
                    ) : model.status === 'paused' ? (
                      <button
                        onClick={() => toggleStatus(model.id)}
                        title="Resume model"
                        className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center hover:bg-green-500/20 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center" title="Training in progress">
                        <Clock className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                      </div>
                    )}
                    <button
                      onClick={() => deleteModel(model.id)}
                      title="Delete model"
                      className="w-8 h-8 rounded-lg bg-muted text-muted-foreground flex items-center justify-center hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-1">Model Comparison Radar</h3>
              <p className="text-xs text-muted-foreground mb-4">Top 3 deployed models vs key metrics</p>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke="rgba(99,102,241,0.15)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Radar name="ObjectDetect" dataKey="ObjectDetect" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} />
                  <Radar name="FaceID" dataKey="FaceID" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} />
                  <Radar name="DefectScan" dataKey="DefectScan" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-1">Accuracy Over Time</h3>
              <p className="text-xs text-muted-foreground mb-4">Average accuracy across all deployed models</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={PERF_DATA} barSize={32}>
                  <defs>
                    <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1"/>
                      <stop offset="100%" stopColor="#06b6d4"/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[90, 100]} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="accuracy" fill="url(#perfGrad)" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border border-indigo-500/20 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-heading font-semibold text-foreground">Build a custom model for your use case</p>
            <p className="text-xs text-muted-foreground mt-1">Upload your dataset, annotate, and train with transfer learning in minutes.</p>
          </div>
          <button
            onClick={() => setShowTrainModal(true)}
            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl hover:shadow-glow-cyan transition-all whitespace-nowrap flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Start Training
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
