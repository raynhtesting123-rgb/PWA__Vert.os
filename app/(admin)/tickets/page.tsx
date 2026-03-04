'use client';

import { useState, useEffect } from 'react';
import { getClients, updateClient } from '@/lib/db/clients';
import { ClientData } from '@/types';
import { Button } from '@/components/ui/Button';
import { LifeBuoy, CheckCircle2, Clock } from 'lucide-react';

export default function GlobalTicketsPage() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleResolveTicket = async (clientId: string, ticketId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (!client || !client.tickets) return;

    const updatedTickets = client.tickets.map(t => 
      t.id === ticketId ? { ...t, status: 'resolved' as const } : t
    );

    try {
      await updateClient(clientId, { tickets: updatedTickets });
      fetchClients();
    } catch (error) {
      console.error('Error resolving ticket:', error);
    }
  };

  if (loading) {
    return <div className="text-zinc-400">Loading tickets...</div>;
  }

  // Flatten and sort tickets
  const allTickets = clients.flatMap(client => 
    (client.tickets || []).map(ticket => ({
      ...ticket,
      clientName: client.name,
      clientId: client.id
    }))
  ).sort((a, b) => {
    // Sort by status (open first) then by date (newest first)
    if (a.status !== b.status) {
      return a.status === 'open' ? -1 : 1;
    }
    return b.createdAt - a.createdAt;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
          <LifeBuoy className="text-rose-500" />
          Global Tickets
        </h1>
      </div>

      <div className="grid gap-4">
        {allTickets.length > 0 ? allTickets.map((ticket) => (
          <div key={`${ticket.clientId}-${ticket.id}`} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full mt-1 ${ticket.status === 'open' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                {ticket.status === 'open' ? <Clock size={20} /> : <CheckCircle2 size={20} />}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-medium text-zinc-100">{ticket.title}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    ticket.status === 'open' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {ticket.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <span>Client: <span className="text-zinc-300">{ticket.clientName}</span></span>
                  <span>•</span>
                  <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {ticket.status === 'open' && (
              <Button 
                onClick={() => handleResolveTicket(ticket.clientId, ticket.id)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Mark Resolved
              </Button>
            )}
          </div>
        )) : (
          <div className="text-center py-12 bg-zinc-900/30 border border-zinc-800/50 rounded-xl border-dashed">
            <CheckCircle2 className="mx-auto h-12 w-12 text-zinc-600 mb-3" />
            <h3 className="text-lg font-medium text-zinc-300">No active tickets</h3>
            <p className="text-zinc-500 text-sm mt-1">Your clients are happy and everything is running smoothly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
