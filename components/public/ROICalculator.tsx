'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Calculator, ArrowRight } from 'lucide-react';

export function ROICalculator() {
  const [revenue, setRevenue] = useState<number | ''>('');
  const [apps, setApps] = useState<number | ''>('');
  const [speed, setSpeed] = useState<number | ''>('');

  const calculateSavings = () => {
    const numApps = Number(apps) || 0;
    // Assuming average app cost is R2000/mo, annual is R24000
    return numApps * 24000;
  };

  const calculateLift = () => {
    const currentSpeed = Number(speed) || 0;
    if (currentSpeed <= 1) return 0;
    // Rough estimate: 1s improvement = 7% conversion lift
    const improvement = currentSpeed - 1;
    return Math.min(Math.round(improvement * 7), 50); // Cap at 50%
  };

  const savings = calculateSavings();
  const lift = calculateLift();

  return (
    <div className="bg-[var(--card)]/50 border border-zinc-800 rounded-xl p-4 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 sm:p-3 rounded-lg bg-cyan-500/10">
          <Calculator className="text-cyan-400" size={20} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">Calculate Your Infrastructure ROI</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-zinc-400 mb-2">Current Monthly Revenue (ZAR)</label>
          <Input 
            type="number" 
            placeholder="e.g. 500000" 
            value={revenue}
            onChange={(e) => setRevenue(e.target.value ? Number(e.target.value) : '')}
            className="bg-zinc-900/50 border-zinc-700 focus:border-cyan-500 text-base h-12"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-zinc-400 mb-2">Number of Shopify Apps</label>
          <Input 
            type="number" 
            placeholder="e.g. 12" 
            value={apps}
            onChange={(e) => setApps(e.target.value ? Number(e.target.value) : '')}
            className="bg-zinc-900/50 border-zinc-700 focus:border-cyan-500 text-base h-12"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-zinc-400 mb-2">Current Mobile Speed (Seconds)</label>
          <Input 
            type="number" 
            placeholder="e.g. 4.2" 
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(e.target.value ? Number(e.target.value) : '')}
            className="bg-zinc-900/50 border-zinc-700 focus:border-cyan-500 text-base h-12"
          />
        </div>
      </div>

      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center sm:text-left">
          <div>
            <div className="text-xs sm:text-sm text-zinc-400 mb-1">Estimated Annual Savings</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
              R{savings.toLocaleString()} <span className="text-xs sm:text-sm font-normal text-zinc-500">in App Fees</span>
            </div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-zinc-400 mb-1">Potential Revenue Lift</div>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400">
              +{lift}% <span className="text-xs sm:text-sm font-normal text-zinc-500">with 1s Load Time</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link href="/contact" className="w-full md:w-auto">
          <Button className="w-full md:w-auto h-14 px-8 text-sm rounded-none border-2 border-cyan-500 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-100 gap-2 font-mono uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
            Book Your ROI Strategy Call <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
