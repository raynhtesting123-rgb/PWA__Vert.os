'use client';

import { useEffect, useState } from 'react';
import { Lead, LeadStatus } from '@/types';
import { getLeads, updateLeadStatus, deleteLead } from '@/lib/db/leads';
import { format } from 'date-fns';
import { useAuth } from '@/components/auth/AuthProvider';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Trash2, Mail, MessageSquare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  contacted: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  qualified: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  lost: 'bg-red-500/10 text-red-400 border-red-500/20',
  won: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      loadLeads();
    }
  }, [user, authLoading]);

  const loadLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      // Optimistic update
      setLeads(leads.map(lead => 
        lead.id === id ? { ...lead, status: newStatus } : lead
      ));
      await updateLeadStatus(id, newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
      loadLeads(); // Revert on error
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteLead(id);
        setLeads(leads.filter(lead => lead.id !== id));
      } catch (error) {
        console.error('Failed to delete lead:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Leads</h2>
        <p className="text-zinc-400 mt-1 md:mt-2 text-sm md:text-base">Manage incoming inquiries and track potential clients.</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-zinc-900/50 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed">
          <Mail className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-zinc-300">No leads yet</h3>
          <p className="text-zinc-500 mt-2">
            When someone contacts you via the public site, they will appear here.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-x-auto">
          <div className="min-w-[800px]">
            <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                <TableHead className="text-zinc-400">Name</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400">Date</TableHead>
                <TableHead className="text-zinc-400">Message</TableHead>
                <TableHead className="text-right text-zinc-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="border-zinc-800 hover:bg-zinc-900/50">
                  <TableCell className="font-medium text-white">
                    <div>{lead.name}</div>
                    <div className="text-xs text-zinc-500">{lead.email}</div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.status}
                      onValueChange={(value) => handleStatusChange(lead.id, value as LeadStatus)}
                    >
                      <SelectTrigger className={`h-8 w-[130px] border-0 ${STATUS_COLORS[lead.status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="won">Won</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-zinc-400">
                    {format(lead.createdAt, 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate text-zinc-400" title={lead.message}>
                      {lead.message}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <a 
                        href={`mailto:${lead.email}`}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                        title="Send Email"
                      >
                        <Mail size={16} />
                      </a>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>
      )}
    </div>
  );
}
