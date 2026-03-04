'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    setIsSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">15-Minute System Audit.</h1>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8">
            Let&apos;s dissect your current Shopify infrastructure, identify the bottlenecks costing you sales, and map out a 14-day migration to a high-performance headless architecture.
          </p>
          
          <div className="space-y-4 md:space-y-6 mb-12">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <span className="text-cyan-400 font-mono text-xs md:text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="text-white font-bold mb-1 text-sm md:text-base">Fill out the brief</h3>
                <p className="text-xs md:text-sm text-zinc-400">Provide your URL and current revenue metrics so I can run a preliminary speed and tech stack analysis before our call.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <span className="text-cyan-400 font-mono text-xs md:text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="text-white font-bold mb-1 text-sm md:text-base">Pick a time</h3>
                <p className="text-xs md:text-sm text-zinc-400">Select a 15-minute slot on my calendar. I only take 2 migration projects per month, so availability is limited.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <span className="text-cyan-400 font-mono text-xs md:text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="text-white font-bold mb-1 text-sm md:text-base">The Strategy Call</h3>
                <p className="text-xs md:text-sm text-zinc-400">We&apos;ll review your current setup, discuss the potential ROI of a headless migration, and determine if we&apos;re a good fit.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-emerald-400 w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Brief Received.</h3>
              <p className="text-zinc-400 mb-8">
                Thank you for submitting your details. I&apos;m running an initial analysis on your store now. Please proceed to book your 15-minute slot.
              </p>
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                <Button className="w-full h-14 text-sm rounded-none border-2 border-cyan-500 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-100 gap-2 font-mono uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  Open Calendar <ArrowRight size={18} />
                </Button>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">First Name</label>
                  <Input required placeholder="John" className="bg-zinc-950 border-zinc-800 focus:border-cyan-500 h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Last Name</label>
                  <Input required placeholder="Doe" className="bg-zinc-950 border-zinc-800 focus:border-cyan-500 h-12" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Work Email</label>
                <Input required type="email" placeholder="john@yourbrand.com" className="bg-zinc-950 border-zinc-800 focus:border-cyan-500 h-12" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Store URL</label>
                <Input required type="url" placeholder="https://yourbrand.com" className="bg-zinc-950 border-zinc-800 focus:border-cyan-500 h-12" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Current Monthly Revenue (ZAR)</label>
                <select required className="w-full h-12 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                  <option value="" disabled selected>Select a range</option>
                  <option value="<100k">Less than R100,000</option>
                  <option value="100k-500k">R100,000 - R500,000</option>
                  <option value="500k-1m">R500,000 - R1,000,000</option>
                  <option value=">1m">More than R1,000,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Biggest Current Bottleneck</label>
                <Textarea required placeholder="e.g. Slow mobile load times, high app subscription costs, limited theme customization..." className="bg-zinc-950 border-zinc-800 focus:border-cyan-500 min-h-[100px]" />
              </div>

              <Button type="submit" className="w-full h-14 text-sm rounded-none border-2 border-cyan-500 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-100 gap-2 font-mono uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                Submit & Continue to Calendar <ArrowRight size={18} />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
