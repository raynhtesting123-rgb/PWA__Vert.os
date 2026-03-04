'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { LifeBuoy, Loader2, Clock, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { subscribeToClientData, subscribeToClientDataByEmail, updateClient } from '@/lib/db/clients';
import { ClientData } from '@/types';
import { Button } from '@/components/ui/Button';

export default function PortalSupport() {
  const { user, userProfile, ghostMode } = useAuth();
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticketTitle, setTicketTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleOpenTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle || !clientData) return;
    
    setIsSubmitting(true);
    const newTicket = {
      id: Math.random().toString(36).substring(7),
      title: ticketTitle,
      status: 'open' as const,
      createdAt: Date.now()
    };
    
    try {
      await updateClient(clientData.id, {
        tickets: [newTicket, ...(clientData.tickets || [])]
      });
      setTicketTitle('');
    } catch (error) {
      console.error('Error creating ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Support Not Available</h2>
        <p className="text-zinc-400">Please contact your account manager directly.</p>
      </div>
    );
  }

  const tickets = clientData.tickets || [];

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Support</h1>
        <p className="text-zinc-400 mt-2">Direct line to our engineering team. Open a ticket for any technical issues or requests.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
              <MessageSquare className="text-violet-400" size={20} />
              Active Tickets
            </h2>
            
            <div className="space-y-4">
              {tickets.length > 0 ? tickets.map((ticket, i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/50 flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full mt-1 ${ticket.status === 'open' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                      {ticket.status === 'open' ? <Clock size={18} /> : <CheckCircle2 size={18} />}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-100 mb-1">{ticket.title}</h3>
                      <p className="text-xs text-zinc-500">Opened on {new Date(ticket.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                    ticket.status === 'open' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              )) : (
                <div className="text-center py-12 bg-zinc-950/30 border border-zinc-800 border-dashed rounded-xl">
                  <p className="text-sm text-zinc-500">No support tickets found.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
              <LifeBuoy className="text-rose-400" size={20} />
              Open New Ticket
            </h2>
            <p className="text-xs text-zinc-500 mb-6">Describe your issue or request and our team will get back to you within 24 hours.</p>
            
            <form onSubmit={handleOpenTicket} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Issue Title</label>
                <input 
                  type="text" 
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  placeholder="e.g. DNS configuration issue" 
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-zinc-100 text-zinc-900 hover:bg-white flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                Submit Ticket
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-zinc-800">
              <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-4">Emergency Contact</h3>
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20">
                <p className="text-xs text-zinc-400 mb-2">For critical infrastructure failure only:</p>
                <p className="text-sm font-mono text-rose-400">ops@vekt.os</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
