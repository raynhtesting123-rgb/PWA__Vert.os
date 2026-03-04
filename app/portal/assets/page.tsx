'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { FileText, Download, Loader2, Search, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { subscribeToClientData, subscribeToClientDataByEmail } from '@/lib/db/clients';
import { ClientData } from '@/types';

export default function PortalAssets() {
  const { user, userProfile, ghostMode } = useAuth();
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void;
    if (userProfile?.uid) {
      if (ghostMode) {
        unsubscribe = subscribeToClientData(userProfile.uid, (data) => {
          setClientData(data);
          setLoading(false);
        });
      } else if (userProfile.email) {
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
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">No Assets Found</h2>
        <p className="text-zinc-400">Your project assets will appear here once uploaded.</p>
      </div>
    );
  }

  const assets = clientData.assets || [];

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Asset Library</h1>
        <p className="text-zinc-400 mt-2">Secure access to your project documentation, brand assets, and technical specifications.</p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
          <Filter size={18} />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.length > 0 ? assets.map((asset, i) => (
          <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-zinc-950 rounded-xl text-violet-400 group-hover:text-violet-300 transition-colors">
                <FileText size={24} />
              </div>
              <a 
                href={asset.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-all"
              >
                <Download size={20} />
              </a>
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-1 truncate" title={asset.name}>{asset.name}</h3>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="uppercase tracking-wider">{asset.type}</span>
              <span>•</span>
              <span>{asset.size}</span>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-20 bg-zinc-900/30 border border-zinc-800 border-dashed rounded-2xl">
            <FileText className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
            <h3 className="text-lg font-medium text-zinc-300">No assets available</h3>
            <p className="text-zinc-500 mt-2">Your project files will be listed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
