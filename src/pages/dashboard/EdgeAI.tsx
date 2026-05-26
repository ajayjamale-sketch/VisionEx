import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Cpu, Plus, Zap, Wifi, WifiOff, Activity, ArrowRight, Settings, X, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

interface EdgeDevice {
  id: string; name: string; type: string; location: string;
  status: 'online' | 'offline'; model: string; fps: number;
  latency: string; cpu: number; mem: number; uptime: string;
}

const INITIAL_DEVICES: EdgeDevice[] = [
  { id: 'E001', name: 'Jetson AGX Xavier #1', type: 'NVIDIA Jetson', location: 'Factory Floor A', status: 'online', model: 'DefectScan v2', fps: 30, latency: '18ms', cpu: 72, mem: 64, uptime: '14d 6h' },
  { id: 'E002', name: 'Jetson Nano #3', type: 'NVIDIA Jetson', location: 'Entrance Gate', status: 'online', model: 'FaceID Pro', fps: 15, latency: '28ms', cpu: 45, mem: 58, uptime: '7d 12h' },
  { id: 'E003', name: 'AWS Greengrass Node', type: 'AWS Edge', location: 'Data Center', status: 'online', model: 'ObjectDetect v3.2', fps: 25, latency: '12ms', cpu: 38, mem: 41, uptime: '30d 2h' },
  { id: 'E004', name: 'Jetson Orin NX #2', type: 'NVIDIA Jetson', location: 'Parking Lot', status: 'offline', model: 'VehicleAI v1.5', fps: 0, latency: '—', cpu: 0, mem: 0, uptime: 'Offline' },
  { id: 'E005', name: 'Raspberry Pi CM4', type: 'ARM Edge', location: 'Meeting Room B', status: 'online', model: 'OCR Master v4', fps: 8, latency: '45ms', cpu: 88, mem: 75, uptime: '3d 4h' },
];

const LATENCY_DATA = [
  { time: '10m', device1: 18, device2: 28, device3: 12 },
  { time: '8m', device1: 20, device2: 26, device3: 11 },
  { time: '6m', device1: 17, device2: 30, device3: 13 },
  { time: '4m', device1: 19, device2: 27, device3: 12 },
  { time: '2m', device1: 18, device2: 29, device3: 11 },
  { time: 'Now', device1: 18, device2: 28, device3: 12 },
];

export default function EdgeAI() {
  useScrollTop();
  const [devices, setDevices] = useState<EdgeDevice[]>(INITIAL_DEVICES);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState<EdgeDevice | null>(null);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceType, setNewDeviceType] = useState('NVIDIA Jetson');
  const [newDeviceLocation, setNewDeviceLocation] = useState('');

  const restartDevice = (id: string) => {
    const device = devices.find(d => d.id === id);
    toast.success(`Restarting ${device?.name}...`, { description: 'Device will reconnect in ~30 seconds.' });
    setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'offline' } : d));
    setTimeout(() => {
      setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'online', uptime: '0d 0h' } : d));
      toast.success(`${device?.name} is back online`);
    }, 3000);
  };

  const handleRegister = () => {
    if (!newDeviceName.trim() || !newDeviceLocation.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    const newDevice: EdgeDevice = {
      id: `E${Date.now()}`,
      name: newDeviceName,
      type: newDeviceType,
      location: newDeviceLocation,
      status: 'offline',
      model: 'Unassigned',
      fps: 0, latency: '—', cpu: 0, mem: 0,
      uptime: 'Pending',
    };
    setDevices(prev => [...prev, newDevice]);
    setShowRegisterModal(false);
    setNewDeviceName('');
    setNewDeviceLocation('');
    toast.success(`${newDeviceName} registered!`, { description: 'Complete setup by assigning a model.' });
  };

  return (
    <DashboardLayout>
      <div className="page-transition max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <Cpu className="w-6 h-6 text-blue-400" /> Edge AI & IoT
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {devices.filter(d => d.status === 'online').length} online · {devices.filter(d => d.status === 'offline').length} offline
            </p>
          </div>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" /> Register Device
          </button>
        </div>

        {/* Register Device Modal */}
        {showRegisterModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-foreground">Register Edge Device</h3>
                <button onClick={() => setShowRegisterModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Device Name *</label>
                  <input value={newDeviceName} onChange={e => setNewDeviceName(e.target.value)} placeholder="e.g. Jetson Nano #5" className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Device Type</label>
                  <select value={newDeviceType} onChange={e => setNewDeviceType(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                    <option>NVIDIA Jetson</option>
                    <option>AWS Greengrass</option>
                    <option>ARM Edge</option>
                    <option>Azure Edge</option>
                    <option>Custom Hardware</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Location *</label>
                  <input value={newDeviceLocation} onChange={e => setNewDeviceLocation(e.target.value)} placeholder="e.g. Warehouse C" className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleRegister} className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm">Register</button>
                  <button onClick={() => setShowRegisterModal(false)} className="flex-1 py-2.5 border border-border text-muted-foreground rounded-xl hover:text-foreground hover:bg-muted transition-colors text-sm">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettingsModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-foreground">Device Settings</h3>
                <button onClick={() => setShowSettingsModal(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-muted/50">
                  <div className="text-xs text-muted-foreground">Device</div>
                  <div className="text-sm font-semibold text-foreground">{showSettingsModal.name}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="text-xs text-muted-foreground">Type</div>
                    <div className="text-sm font-medium text-foreground">{showSettingsModal.type}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="text-sm font-medium text-foreground">{showSettingsModal.location}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="text-xs text-muted-foreground">Assigned Model</div>
                    <div className="text-sm font-medium text-foreground">{showSettingsModal.model}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="text-xs text-muted-foreground">Status</div>
                    <div className={`text-sm font-semibold ${showSettingsModal.status === 'online' ? 'text-green-400' : 'text-red-400'}`}>{showSettingsModal.status}</div>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => { restartDevice(showSettingsModal.id); setShowSettingsModal(null); }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-colors text-sm font-medium"
                  >
                    <RefreshCw className="w-4 h-4" /> Restart
                  </button>
                  <button onClick={() => setShowSettingsModal(null)} className="flex-1 py-2.5 border border-border text-muted-foreground rounded-xl hover:text-foreground hover:bg-muted transition-colors text-sm">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Connected Devices', value: devices.length.toString(), icon: Cpu },
            { label: 'Online Now', value: devices.filter(d => d.status === 'online').length.toString(), icon: Wifi },
            { label: 'Avg Latency', value: '24ms', icon: Zap },
            { label: 'Total Inferences/hr', value: '14.2K', icon: Activity },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-border">
              <Icon className="w-5 h-5 text-indigo-400 mb-3" />
              <div className="font-heading text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Latency chart */}
        <div className="p-5 rounded-2xl bg-card border border-border">
          <h3 className="font-heading font-semibold text-foreground mb-1">Real-Time Latency</h3>
          <p className="text-xs text-muted-foreground mb-4">Inference latency (ms) for top 3 devices</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={LATENCY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="device1" stroke="#6366f1" strokeWidth={2} dot={false} name="Jetson AGX" />
              <Line type="monotone" dataKey="device2" stroke="#06b6d4" strokeWidth={2} dot={false} name="Jetson Nano" />
              <Line type="monotone" dataKey="device3" stroke="#22c55e" strokeWidth={2} dot={false} name="AWS Edge" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Device list */}
        <div className="space-y-3">
          {devices.map(device => (
            <div key={device.id} className={`p-5 rounded-2xl border transition-all ${device.status === 'online' ? 'bg-card border-border hover:border-indigo-500/30' : 'bg-card border-red-500/20'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  {device.status === 'online' ? <Wifi className="w-5 h-5 text-blue-400" /> : <WifiOff className="w-5 h-5 text-red-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-heading font-semibold text-foreground text-sm">{device.name}</h3>
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full ${device.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{device.status}</span>
                    {device.cpu > 80 && device.status === 'online' && (
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400">High CPU</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{device.type} · {device.location} · Model: {device.model}</div>
                </div>
                {device.status === 'online' && (
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="text-center">
                      <div className="font-heading font-semibold text-foreground text-sm">{device.fps} fps</div>
                      <div className="text-[10px] text-muted-foreground">FPS</div>
                    </div>
                    <div className="text-center">
                      <div className="font-heading font-semibold text-foreground text-sm">{device.latency}</div>
                      <div className="text-[10px] text-muted-foreground">Latency</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-heading font-semibold text-sm ${device.cpu > 80 ? 'text-red-400' : 'text-foreground'}`}>{device.cpu}%</div>
                      <div className="text-[10px] text-muted-foreground">CPU</div>
                    </div>
                    <div className="text-center">
                      <div className="font-heading font-semibold text-foreground text-sm">{device.uptime}</div>
                      <div className="text-[10px] text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setShowSettingsModal(device)}
                  title="Device settings"
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              {device.status === 'online' && (
                <div className="mt-3 flex gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>CPU</span><span>{device.cpu}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${device.cpu > 80 ? 'bg-red-500' : 'bg-indigo-500'}`} style={{ width: `${device.cpu}%` }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>Memory</span><span>{device.mem}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-cyan-500" style={{ width: `${device.mem}%` }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-500/10 border border-blue-500/20 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-heading font-semibold text-foreground">Deploy AI to new edge devices</p>
            <p className="text-xs text-muted-foreground mt-1">Support for NVIDIA Jetson, AWS Greengrass, Raspberry Pi, and custom ARM devices.</p>
          </div>
          <Link to="/contact" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all whitespace-nowrap">
            Get Edge Deployment Guide <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
