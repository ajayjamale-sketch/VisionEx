import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { UserCheck, Camera, ScanFace, Search, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

// Mock data
const ACCESS_LOG = [
  { id: '1', name: 'Jordan Blake', role: 'Security Officer', time: '10:42 AM', location: 'Main Entrance', status: 'granted', confidence: 99.8 },
  { id: '2', name: 'Alex Morrison', role: 'Admin', time: '10:15 AM', location: 'Server Room B', status: 'granted', confidence: 98.5 },
  { id: '3', name: 'Unknown', role: 'N/A', time: '09:30 AM', location: 'R&D Lab Floor 3', status: 'denied', confidence: 42.1 },
  { id: '4', name: 'Sam Rivera', role: 'Engineer', time: '08:45 AM', location: 'Main Entrance', status: 'granted', confidence: 99.2 },
];

export default function Identity() {
  useScrollTop();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleRegister = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setShowRegisterModal(false);
      toast.success('Face registered successfully!', { description: 'Identity profile created.' });
    }, 2000);
  };

  const handleVerify = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setShowVerifyModal(false);
      toast.success('Identity verified: Jordan Blake', { description: 'Confidence: 99.8%' });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="page-transition max-w-7xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-indigo-400" /> Facial Recognition
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Manage identity verification, face registration, and access logs.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowVerifyModal(true)} className="px-4 py-2 text-sm font-medium bg-muted text-foreground border border-border rounded-xl hover:bg-muted/80 transition-colors flex items-center gap-2">
              <ScanFace className="w-4 h-4" /> Quick Verify
            </button>
            <button onClick={() => setShowRegisterModal(true)} className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl hover:shadow-glow-cyan transition-all flex items-center gap-2">
              <Camera className="w-4 h-4" /> Register Face
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-3">
              <UserCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">1,248</div>
            <div className="text-xs text-muted-foreground">Registered Faces</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">14.2K</div>
            <div className="text-xs text-muted-foreground">Verifications Today</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">23</div>
            <div className="text-xs text-muted-foreground">Access Denied</div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-foreground">Access Control Integration</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search logs..." className="pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Identity</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Role</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Location</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Time</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Match Confidence</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {ACCESS_LOG.map(log => (
                  <tr key={log.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{log.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{log.role}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{log.location}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{log.time}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className={`h-full ${log.confidence > 90 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${log.confidence}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{log.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${log.status === 'granted' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {log.status === 'granted' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Register Modal */}
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-xl animate-fade-in">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Register New Face</h3>
              <div className="aspect-video bg-black rounded-xl mb-4 relative overflow-hidden flex items-center justify-center border border-border">
                {scanning ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 border-2 border-indigo-500 rounded-lg animate-pulse" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 animate-[scan_2s_ease-in-out_infinite]" />
                    <span className="mt-4 text-xs font-medium text-indigo-400">Capturing biometric data...</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Camera ready. Please face the lens.</p>
                  </div>
                )}
              </div>
              <div className="space-y-3 mb-6">
                <input type="text" placeholder="Full Name" disabled={scanning} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                <input type="text" placeholder="Role / Department" disabled={scanning} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div className="flex gap-3">
                <button onClick={handleRegister} disabled={scanning} className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50">
                  {scanning ? 'Scanning...' : 'Capture Face'}
                </button>
                <button onClick={() => setShowRegisterModal(false)} disabled={scanning} className="flex-1 py-2 bg-muted text-foreground font-medium rounded-lg border border-border hover:bg-muted/80 transition-colors disabled:opacity-50">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Verify Modal */}
        {showVerifyModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-xl animate-fade-in">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Identity Verification</h3>
              <div className="aspect-square bg-black rounded-xl mb-6 relative overflow-hidden flex items-center justify-center border border-border">
                {scanning ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-48 h-48 border-2 border-cyan-500 rounded-full animate-pulse" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 animate-[scan_1.5s_ease-in-out_infinite]" />
                    <span className="mt-6 text-xs font-medium text-cyan-400">Verifying identity...</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <ScanFace className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Position face in frame to verify.</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={handleVerify} disabled={scanning} className="flex-1 py-2 bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50">
                  {scanning ? 'Scanning...' : 'Start Scan'}
                </button>
                <button onClick={() => setShowVerifyModal(false)} disabled={scanning} className="flex-1 py-2 bg-muted text-foreground font-medium rounded-lg border border-border hover:bg-muted/80 transition-colors disabled:opacity-50">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
