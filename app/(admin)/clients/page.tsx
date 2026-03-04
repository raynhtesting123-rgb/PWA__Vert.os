'use client';

import { useState, useEffect } from 'react';
import { getClients, createClient, updateClient, deleteClient } from '@/lib/db/clients';
import { ClientData } from '@/types';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, Users, Server, Activity, Eye } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ClientData>>({});
  const { enterGhostMode } = useAuth();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    const newClient: Omit<ClientData, 'id' | 'createdAt' | 'updatedAt'> = {
      name: 'New Client',
      email: '',
      infrastructure: { uptime: 100, responseTime: 50, lcp: 1.0, cls: 0.01 },
      migration: { currentDay: 1, phases: [] },
      assets: [],
      tickets: [],
    };
    try {
      await createClient(newClient);
      fetchClients();
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateClient(id, formData);
      setIsEditing(null);
      fetchClients();
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteClient(id);
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-zinc-400">Loading clients...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
          <Users className="text-violet-500" />
          Client Management
        </h1>
        <Button onClick={handleCreate} className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus size={16} className="mr-2" />
          New Client
        </Button>
      </div>

      <div className="grid gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            {isEditing === client.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Company Name</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Contact Email</label>
                    <input
                      type="email"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
                    <Server size={14} className="text-violet-400" /> Infrastructure
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Uptime (%)</label>
                      <input
                        type="number"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100"
                        value={formData.infrastructure?.uptime || 0}
                        onChange={(e) => setFormData({
                          ...formData,
                          infrastructure: { ...(formData.infrastructure || { uptime: 0, responseTime: 0, lcp: 0, cls: 0 }), uptime: parseFloat(e.target.value) }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Response (ms)</label>
                      <input
                        type="number"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100"
                        value={formData.infrastructure?.responseTime || 0}
                        onChange={(e) => setFormData({
                          ...formData,
                          infrastructure: { ...(formData.infrastructure || { uptime: 0, responseTime: 0, lcp: 0, cls: 0 }), responseTime: parseInt(e.target.value) }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">LCP (s)</label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100"
                        value={formData.infrastructure?.lcp || 0}
                        onChange={(e) => setFormData({
                          ...formData,
                          infrastructure: { ...(formData.infrastructure || { uptime: 0, responseTime: 0, lcp: 0, cls: 0 }), lcp: parseFloat(e.target.value) }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">CLS</label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100"
                        value={formData.infrastructure?.cls || 0}
                        onChange={(e) => setFormData({
                          ...formData,
                          infrastructure: { ...(formData.infrastructure || { uptime: 0, responseTime: 0, lcp: 0, cls: 0 }), cls: parseFloat(e.target.value) }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
                    <Activity size={14} className="text-indigo-400" /> Migration Protocol
                  </h3>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs text-zinc-500">Current Day (1-14)</label>
                      <span className="text-indigo-400 font-mono text-sm bg-indigo-500/10 px-2 py-0.5 rounded">Day {formData.migration?.currentDay || 1}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="14"
                      className="w-full accent-indigo-500"
                      value={formData.migration?.currentDay || 1}
                      onChange={(e) => setFormData({
                        ...formData,
                        migration: { ...(formData.migration || { currentDay: 1, phases: [] }), currentDay: parseInt(e.target.value) }
                      })}
                    />
                    <div className="flex justify-between text-[10px] text-zinc-600 mt-1 px-1">
                      <span>1</span>
                      <span>7</span>
                      <span>14</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="ghost" onClick={() => setIsEditing(null)}>Cancel</Button>
                  <Button onClick={() => handleUpdate(client.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white">Save Changes</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100">{client.name}</h2>
                  <p className="text-sm text-zinc-400">{client.email}</p>
                  
                  <div className="mt-4 flex gap-4 text-sm">
                    <div className="bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800">
                      <span className="text-zinc-500 mr-2">Uptime:</span>
                      <span className="text-emerald-400 font-mono">{client.infrastructure?.uptime}%</span>
                    </div>
                    <div className="bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800">
                      <span className="text-zinc-500 mr-2">Protocol Day:</span>
                      <span className="text-indigo-400 font-mono">{client.migration?.currentDay}/14</span>
                    </div>
                    <div className="bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800">
                      <span className="text-zinc-500 mr-2">Client ID:</span>
                      <span className="text-zinc-300 font-mono text-xs">{client.id}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => enterGhostMode(client.id)}
                    className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-400/10"
                    title="View as Client"
                  >
                    <Eye size={16} className="mr-2" />
                    View Portal
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setFormData(client);
                      setIsEditing(client.id);
                    }}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(client.id)} className="text-rose-400 hover:text-rose-300 hover:bg-rose-400/10">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
        {clients.length === 0 && (
          <div className="text-center py-12 bg-zinc-900/30 border border-zinc-800/50 rounded-xl border-dashed">
            <Users className="mx-auto h-12 w-12 text-zinc-600 mb-3" />
            <h3 className="text-lg font-medium text-zinc-300">No clients yet</h3>
            <p className="text-zinc-500 text-sm mt-1">Create your first client to start managing their portal.</p>
          </div>
        )}
      </div>
    </div>
  );
}
