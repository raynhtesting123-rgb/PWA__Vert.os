'use client';

import { DollarSign } from 'lucide-react';

export default function FinancesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Finances</h2>
        <p className="text-zinc-400 mt-2">Manage your invoices, expenses, and financial overview.</p>
      </div>

      <div className="text-center py-20 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed">
        <DollarSign className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
        <h3 className="text-lg font-medium text-zinc-300">Coming Soon</h3>
        <p className="text-zinc-500 mt-2">
          The finances module is currently under development.
        </p>
      </div>
    </div>
  );
}
