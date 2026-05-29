import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Network, Database, Webhook, Box, ExternalLink, Settings, Plug } from 'lucide-react';
import { toast } from 'sonner';

const INTEGRATIONS = [
  { id: '1', name: 'Salesforce CRM', type: 'CRM', icon: Database, description: 'Sync detection data and customer identities with Salesforce.', status: 'connected' },
  { id: '2', name: 'SAP ERP', type: 'ERP', icon: Box, description: 'Integrate quality inspection data directly into SAP production logs.', status: 'disconnected' },
  { id: '3', name: 'Slack Alerts', type: 'Webhook', icon: Webhook, description: 'Send high-severity incident alerts to specific Slack channels.', status: 'connected' },
  { id: '4', name: 'Custom Webhook', type: 'API', icon: Network, description: 'Forward JSON payloads for every detection event in real-time.', status: 'disconnected' },
];

export default function Integrations() {
  useScrollTop();
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [showConfig, setShowConfig] = useState<string | null>(null);

  const toggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(int => {
      if (int.id === id) {
        const newStatus = int.status === 'connected' ? 'disconnected' : 'connected';
        if (newStatus === 'connected') {
          toast.success(`${int.name} connected successfully.`);
        } else {
          toast.info(`${int.name} disconnected.`);
        }
        return { ...int, status: newStatus };
      }
      return int;
    }));
    setShowConfig(null);
  };

  return (
    <DashboardLayout>
      <div className="page-transition max-w-7xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <Network className="w-6 h-6 text-blue-400" /> API & Integrations
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Connect VisionEx to your enterprise tools, ERPs, CRMs, and webhooks.</p>
          </div>
          <button className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl hover:shadow-glow-indigo transition-all flex items-center gap-2">
            <Plug className="w-4 h-4" /> Add Integration
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
          {integrations.map(integration => {
            const Icon = integration.icon;
            const isConnected = integration.status === 'connected';
            
            return (
              <div key={integration.id} className={`p-5 rounded-2xl border transition-all ${isConnected ? 'bg-blue-500/5 border-blue-500/30' : 'bg-card border-border hover:border-indigo-500/20'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isConnected ? 'bg-blue-500/20' : 'bg-muted'}`}>
                      <Icon className={`w-5 h-5 ${isConnected ? 'text-blue-400' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{integration.name}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{integration.type}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full border ${isConnected ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-muted text-muted-foreground border-border'}`}>
                    {integration.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-5">{integration.description}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => isConnected ? setShowConfig(integration.id) : toggleConnection(integration.id)}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${isConnected ? 'bg-background text-foreground border-border hover:bg-muted' : 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white border-transparent hover:shadow-lg'}`}
                  >
                    {isConnected ? 'Configure' : 'Connect'}
                  </button>
                  {isConnected && (
                    <button className="w-9 h-9 flex items-center justify-center bg-background border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Configuration Modal */}
        {showConfig && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-xl animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-semibold text-foreground flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" /> Configure Integration
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Update settings for this connection. Synchronization happens automatically every 5 minutes.</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">API Key / Token</label>
                  <input type="password" value="************************" readOnly className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm text-muted-foreground focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Endpoint URL</label>
                  <input type="text" defaultValue="https://api.example.com/v1/webhook" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => { toast.success('Configuration saved.'); setShowConfig(null); }} className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-medium rounded-lg hover:shadow-lg transition-all text-sm">
                  Save Changes
                </button>
                <button onClick={() => toggleConnection(showConfig)} className="flex-1 py-2.5 bg-red-500/10 text-red-500 font-medium rounded-lg border border-red-500/30 hover:bg-red-500/20 transition-colors text-sm">
                  Disconnect
                </button>
              </div>
              <button onClick={() => setShowConfig(null)} className="w-full mt-3 py-2 bg-muted text-foreground font-medium rounded-lg border border-border hover:bg-muted/80 transition-colors text-sm">
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
