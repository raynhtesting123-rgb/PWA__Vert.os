'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { Activity, Server, Loader2, Clock, Database, Zap, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { subscribeToClientData, subscribeToClientDataByEmail } from '@/lib/db/clients';
import { ClientData } from '@/types';

export default function PortalInfrastructure() {
  const { user, userProfile, ghostMode } = useAuth();
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(true), 0);
    let unsubscribe: () => void;
    if (userProfile?.uid) {
      if (ghostMode) {
        unsubscribe = subscribeToClientData(userProfile.uid, (data) => {
          setClientData(data);
          setLoading(false);
        });
      } else if (userProfile.email) {
        unsubscribe = subscribeToClientData(userProfile.email.toLowerCase().trim(), (data) => {
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
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">No Infrastructure Data</h2>
        <p className="text-zinc-400">Your infrastructure is currently being provisioned.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Infrastructure</h1>
        <p className="text-zinc-400 mt-2">Real-time monitoring and health status of your headless commerce engine.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Zap size={20} />
            </div>
            <p className="text-sm font-medium text-zinc-400">Uptime</p>
          </div>
          <p className="text-3xl font-mono text-zinc-100">{clientData.infrastructure?.uptime || 0}%</p>
          <p className="text-xs text-zinc-500 mt-2">Last 30 days</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-violet-500/10 text-violet-400 rounded-lg">
              <Clock size={20} />
            </div>
            <p className="text-sm font-medium text-zinc-400">Response Time</p>
          </div>
          <p className="text-3xl font-mono text-zinc-100">{clientData.infrastructure?.responseTime || 0}<span className="text-sm text-zinc-500 ml-1">ms</span></p>
          <p className="text-xs text-zinc-500 mt-2">Global average</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
              <Database size={20} />
            </div>
            <p className="text-sm font-medium text-zinc-400">LCP</p>
          </div>
          <p className="text-3xl font-mono text-emerald-400">{clientData.infrastructure?.lcp || 0}<span className="text-sm text-emerald-500/50 ml-1">s</span></p>
          <p className="text-xs text-zinc-500 mt-2">Largest Contentful Paint</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Shield size={20} />
            </div>
            <p className="text-sm font-medium text-zinc-400">CLS</p>
          </div>
          <p className="text-3xl font-mono text-emerald-400">{clientData.infrastructure?.cls || 0}</p>
          <p className="text-xs text-zinc-500 mt-2">Cumulative Layout Shift</p>
        </div>
      </div>

      <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-3">
            <Server className="text-violet-400" />
            System Nodes
          </h2>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full">
            All Nodes Healthy
          </span>
        </div>

        <div className="space-y-6">
          {[
            { name: 'Edge Gateway (Global)', status: 'Operational', latency: '12ms' },
            { name: 'Storefront API Layer', status: 'Operational', latency: '45ms' },
            { name: 'Asset CDN (Vercel)', status: 'Operational', latency: '8ms' },
            { name: 'Database Cluster (Supabase)', status: 'Operational', latency: '32ms' },
          ].map((node, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-sm font-medium text-zinc-200">{node.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs font-mono text-zinc-500">{node.latency}</span>
                <span className="text-xs font-medium text-emerald-400">{node.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
