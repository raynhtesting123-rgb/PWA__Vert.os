'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { Activity, CheckCircle2, Clock, Download, FileText, LifeBuoy, Server, Shield, Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { subscribeToClientData, subscribeToClientDataByEmail } from '@/lib/db/clients';
import { ClientData } from '@/types';

export default function PortalDashboard() {
  const { user, userProfile, ghostMode } = useAuth();
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void;
    if (userProfile?.uid) {
      if (ghostMode) {
        // In ghost mode, uid is the clientId
        unsubscribe = subscribeToClientData(userProfile.uid, (data) => {
          setClientData(data);
          setLoading(false);
        });
      } else if (userProfile.email) {
        // For real clients, look up by email
        unsubscribe = subscribeToClientDataByEmail(userProfile.email, (data) => {
          setClientData(data);
          setLoading(false);
        });
      } else {
        setTimeout(() => setLoading(false), 0);
      }
    } else {
      const timer = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(timer);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userProfile, ghostMode]);

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Welcome, {user?.displayName?.split(' ')[0] || 'Client'}</h2>
        <p className="text-zinc-400">Your portal is currently being provisioned. Please check back later.</p>
      </div>
    );
  }

  const currentDay = clientData.migration?.currentDay || 1;

  const defaultPhases = [
    { range: [1, 3], day: 'Day 1-3', title: 'Architecture & Provisioning', desc: 'Setup Vercel, Supabase, and core repositories.' },
    { range: [4, 7], day: 'Day 4-7', title: 'Data Migration & API Layer', desc: 'Migrating product catalog and setting up GraphQL endpoints.' },
    { range: [8, 11], day: 'Day 8-11', title: 'Frontend Implementation', desc: 'Building the headless storefront with Next.js.' },
    { range: [12, 14], day: 'Day 12-14', title: 'Testing & Cutover', desc: 'Load testing, QA, and DNS switch.' },
  ];

  const phases = defaultPhases.map(phase => {
    let status = 'pending';
    if (currentDay > phase.range[1]) {
      status = 'completed';
    } else if (currentDay >= phase.range[0] && currentDay <= phase.range[1]) {
      status = 'active';
    }
    return { ...phase, status };
  });

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Welcome back, {clientData.name || user?.displayName?.split(' ')[0] || 'Client'}</h1>
        <p className="text-zinc-400 mt-2">Here is the current status of your headless infrastructure and migration project.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Infrastructure Health */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                <Server className="text-violet-400" size={20} />
                Infrastructure Health
              </h2>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Uptime (30d)</p>
                <p className="text-2xl font-mono text-zinc-100">{clientData.infrastructure?.uptime || 0}%</p>
              </div>
              <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Avg Response</p>
                <p className="text-2xl font-mono text-zinc-100">{clientData.infrastructure?.responseTime || 0}<span className="text-sm text-zinc-500 ml-1">ms</span></p>
              </div>
              <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">LCP (Web Vitals)</p>
                <p className="text-2xl font-mono text-emerald-400">{clientData.infrastructure?.lcp || 0}<span className="text-sm text-emerald-500/50 ml-1">s</span></p>
              </div>
              <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">CLS (Web Vitals)</p>
                <p className="text-2xl font-mono text-emerald-400">{clientData.infrastructure?.cls || 0}</p>
              </div>
            </div>
          </section>

          {/* Project Roadmap */}
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                <Activity className="text-indigo-400" size={20} />
                14-Day Migration Protocol
              </h2>
              <span className="text-sm text-zinc-400">Day {clientData.migration?.currentDay || 1} of 14</span>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
              {phases.map((phase: any, i: number) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-zinc-900 text-zinc-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    {phase.status === 'completed' ? <CheckCircle2 className="text-emerald-400" size={16} /> : 
                     phase.status === 'active' ? <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" /> : 
                     <div className="w-2 h-2 rounded-full bg-zinc-700" />}
                  </div>
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border ${phase.status === 'active' ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-zinc-800 bg-zinc-950/50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium ${phase.status === 'active' ? 'text-indigo-400' : 'text-zinc-500'}`}>{phase.day}</span>
                    </div>
                    <h3 className="font-medium text-zinc-200 text-sm">{phase.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Modules */}
        <div className="space-y-6">
          {/* Asset Library */}
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2 mb-4">
              <Shield className="text-emerald-400" size={20} />
              Asset Library
            </h2>
            <div className="space-y-3">
              {clientData.assets?.length > 0 ? clientData.assets.map((asset, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50 hover:border-zinc-700 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-900 rounded-md text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{asset.name}</p>
                      <p className="text-xs text-zinc-500">{asset.type} • {asset.size}</p>
                    </div>
                  </div>
                  <a href={asset.url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-200 transition-colors">
                    <Download size={16} />
                  </a>
                </div>
              )) : (
                <p className="text-sm text-zinc-500">No assets available yet.</p>
              )}
            </div>
          </section>

          {/* Support / Ticketing */}
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2 mb-4">
              <LifeBuoy className="text-rose-400" size={20} />
              Direct Support
            </h2>
            <p className="text-sm text-zinc-400 mb-4">
              Bypass the email clutter. Open a direct ticket with the engineering team.
            </p>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const titleInput = form.elements.namedItem('title') as HTMLInputElement;
              const title = titleInput.value;
              if (!title || !clientData) return;
              
              const newTicket = {
                id: Math.random().toString(36).substring(7),
                title,
                status: 'open' as const,
                createdAt: Date.now()
              };
              
              try {
                const { updateClient } = await import('@/lib/db/clients');
                await updateClient(clientData.id, {
                  tickets: [newTicket, ...(clientData.tickets || [])]
                });
                form.reset();
              } catch (error) {
                console.error('Error creating ticket:', error);
              }
            }} className="space-y-3 mb-6">
              <input 
                type="text" 
                name="title" 
                placeholder="What do you need help with?" 
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500"
              />
              <Button type="submit" className="w-full bg-zinc-100 text-zinc-900 hover:bg-white">
                Open New Ticket
              </Button>
            </form>
            
            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Recent Tickets</h3>
              {clientData.tickets?.length > 0 ? clientData.tickets.map((ticket, i) => (
                <div key={i} className="p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium ${ticket.status === 'resolved' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {ticket.status === 'resolved' ? 'Resolved' : 'Open'}
                    </span>
                    <span className="text-xs text-zinc-500">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-zinc-200">{ticket.title}</p>
                </div>
              )) : (
                <p className="text-sm text-zinc-500">No recent tickets.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
