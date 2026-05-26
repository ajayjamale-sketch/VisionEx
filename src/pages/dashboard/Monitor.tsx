import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { CAMERA_FEEDS } from '@/constants/data';
import { Video, Maximize2, Grid, LayoutGrid, RefreshCw, ArrowRight, Eye, AlertTriangle } from 'lucide-react';

const EXTENDED_FEEDS = [
  ...CAMERA_FEEDS,
  { id: '7', name: 'Roof Access', location: 'Building C', status: 'online' as const, detections: 12, thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&h=200&fit=crop' },
  { id: '8', name: 'Reception', location: 'Building A', status: 'online' as const, detections: 342, thumbnail: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=300&h=200&fit=crop' },
  { id: '9', name: 'Storage Room', location: 'Warehouse', status: 'processing' as const, detections: 88, thumbnail: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=200&fit=crop' },
  { id: '10', name: 'Generator Room', location: 'Basement', status: 'online' as const, detections: 3, thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop' },
  { id: '11', name: 'Conference A', location: 'Building A', status: 'offline' as const, detections: 0, thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop' },
  { id: '12', name: 'Fire Escape W', location: 'Building A', status: 'online' as const, detections: 7, thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop' },
];

const STATUS_COLORS: Record<string, string> = {
  online: 'bg-cyan-500',
  processing: 'bg-indigo-500 animate-pulse',
  offline: 'bg-red-500',
};

const STATUS_BADGE: Record<string, string> = {
  online: 'text-cyan-400 bg-cyan-500/10',
  processing: 'text-indigo-400 bg-indigo-500/10',
  offline: 'text-red-400 bg-red-500/10',
};

export default function Monitor() {
  useScrollTop();
  const [layout, setLayout] = useState<'grid4' | 'grid9' | 'single'>('grid4');
  const [selectedCam, setSelectedCam] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');

  const filteredFeeds = EXTENDED_FEEDS.filter(f => statusFilter === 'all' || f.status === statusFilter);
  const gridClass = layout === 'grid4' ? 'grid-cols-2 lg:grid-cols-2' : layout === 'grid9' ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1';
  const thumbHeight = layout === 'grid9' ? 'h-36' : 'h-52';

  return (
    <DashboardLayout>
      <div className="page-transition max-w-7xl space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <Video className="w-6 h-6 text-cyan-400" /> Live Monitor
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-cyan-400 font-medium">{EXTENDED_FEEDS.filter(f => f.status === 'online').length} online</span> ·{' '}
              {EXTENDED_FEEDS.filter(f => f.status === 'processing').length} processing ·{' '}
              <span className="text-red-400">{EXTENDED_FEEDS.filter(f => f.status === 'offline').length} offline</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-muted rounded-xl">
              <button onClick={() => setLayout('grid4')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${layout === 'grid4' ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setLayout('grid9')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${layout === 'grid9' ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                <Grid className="w-4 h-4" />
              </button>
            </div>
            {(['all', 'online', 'offline'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all capitalize ${statusFilter === s ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                {s}
              </button>
            ))}
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground rounded-xl hover:text-foreground transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        </div>

        {/* Live stats bar */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs text-cyan-400 font-medium">LIVE MONITORING</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span><Eye className="w-3.5 h-3.5 inline mr-1" />1,247 detections/hr</span>
            <span><AlertTriangle className="w-3.5 h-3.5 inline mr-1 text-yellow-500" />3 active alerts</span>
          </div>
        </div>

        {/* Camera Grid */}
        <div className={`grid ${gridClass} gap-3`}>
          {filteredFeeds.map((cam) => (
            <div
              key={cam.id}
              onClick={() => setSelectedCam(selectedCam === cam.id ? null : cam.id)}
              className={`relative group rounded-2xl overflow-hidden border cursor-pointer transition-all duration-200 ${selectedCam === cam.id ? 'border-indigo-500/60 shadow-glow-indigo' : 'border-border hover:border-indigo-500/30'}`}
            >
              <img src={cam.thumbnail} alt={cam.name} className={`w-full ${thumbHeight} object-cover group-hover:scale-[1.02] transition-transform duration-500`} />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* AI detection overlay simulation */}
              {cam.status === 'online' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-[20%] left-[15%] w-16 h-20 border-2 border-cyan-400/60 rounded-sm">
                    <span className="absolute -top-5 left-0 text-[9px] text-cyan-400 bg-black/50 px-1 rounded whitespace-nowrap">Person 94%</span>
                  </div>
                  {cam.detections > 100 && (
                    <div className="absolute top-[25%] right-[20%] w-20 h-16 border-2 border-indigo-400/60 rounded-sm">
                      <span className="absolute -top-5 left-0 text-[9px] text-indigo-400 bg-black/50 px-1 rounded whitespace-nowrap">Vehicle 89%</span>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">{cam.name}</div>
                    <div className="text-xs text-white/60">{cam.location}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_BADGE[cam.status]}`}>{cam.status}</span>
                  </div>
                </div>
                {cam.status !== 'offline' && (
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-white/60">
                    <span>{cam.detections} detections/hr</span>
                  </div>
                )}
              </div>

              {/* Status dot */}
              <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${STATUS_COLORS[cam.status]}`} />

              {/* Maximize */}
              <button className="absolute top-3 left-3 w-7 h-7 rounded-lg bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </button>

              {/* Offline overlay */}
              {cam.status === 'offline' && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-2">
                      <Video className="w-4 h-4 text-red-400" />
                    </div>
                    <p className="text-xs text-red-400 font-medium">Offline</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-600/10 to-indigo-500/10 border border-cyan-500/20 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-heading font-semibold text-foreground">Connect more cameras</p>
            <p className="text-xs text-muted-foreground mt-1">Add RTSP streams, IP cameras, or IoT devices to your monitoring dashboard.</p>
          </div>
          <Link to="/settings" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-cyan-600 to-indigo-500 text-white rounded-xl hover:shadow-glow-cyan transition-all whitespace-nowrap">
            Add Camera Stream <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
