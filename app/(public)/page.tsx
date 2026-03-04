'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedProjects } from '@/lib/db/projects';
import { Project } from '@/types';
import { Github, Terminal, Cpu, Globe, ArrowRight, Mail, Database, Shield, Zap, CheckCircle2, ShoppingCart, BarChart3, Clock, Download } from 'lucide-react';
import { BentoGrid } from '@/components/public/BentoGrid';
import { ROICalculator } from '@/components/public/ROICalculator';
import { RotatingText } from '@/components/public/RotatingText';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function PublicLandingPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const published = await getPublishedProjects();
        setProjects(published);
        // We only show the count of published projects to the public
        setTotalProjects(published.length);
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };
    loadProjects();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden cursor-crosshair min-h-[calc(100dvh-4rem)] flex flex-col justify-center pb-20">
        {/* Subtle High-Frequency Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '100% 4px' }} />
        
        {/* Atmospheric Glow - Centered behind text */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/15 blur-[150px] rounded-full pointer-events-none" />
        
        {/* Floating Metadata */}
        <div className="absolute top-24 right-6 text-[10px] font-mono text-zinc-600 pointer-events-none hidden md:block z-10">
          LOC: 29.8587° S, 31.0218° E
        </div>
        <div className="absolute bottom-6 left-6 text-[10px] font-mono text-zinc-600 pointer-events-none hidden md:block z-10">
          STACK: NEXT.JS // TS // FIREBASE // TAILWIND
        </div>
        <div className="absolute bottom-6 right-6 text-[10px] font-mono text-zinc-600 pointer-events-none hidden md:block z-10">
          EST: 2026 // BUILD_VER: 1.0.4_PROD
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="max-w-3xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:py-1 rounded-full bg-cyan-500/10 border border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.3)] text-[10px] sm:text-xs font-medium text-cyan-300 mb-4">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
              </span>
              <span className="leading-tight">Accepting 2 Migration Projects This Month</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 sm:mb-4 leading-[1.15] sm:leading-[1.1] text-white">
              Stop Losing 20% of Your Sales to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Slow Page Speeds.</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-zinc-400 leading-[1.8] max-w-2xl mb-10 sm:mb-12">
              I build high-performance <strong className="text-zinc-200 font-semibold">Headless Commerce Infrastructure</strong> that replaces bloated Shopify themes with <strong className="text-zinc-200 font-semibold">1-second load times</strong>. Reclaim your mobile revenue in <strong className="text-zinc-200 font-semibold">14 days</strong>.
            </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto relative overflow-hidden h-14 px-4 sm:px-8 text-[11px] sm:text-sm rounded-none border-none bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] text-white gap-2 font-mono transition-all duration-300 uppercase tracking-widest">
                  <Terminal size={16} className="shrink-0" />
                  <span className="font-bold">BOOK MY REVENUE STRATEGY CALL</span>
                </Button>
              </Link>
              <Link href="/case-studies" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 px-4 sm:px-8 text-[13px] sm:text-sm rounded-none border border-zinc-700 bg-transparent hover:bg-zinc-800/50 hover:border-zinc-500 text-zinc-400 hover:text-white gap-2 transition-colors duration-300">
                  <ArrowRight size={16} className="shrink-0" />
                  <span>View 14-Day Case Study</span>
                </Button>
              </Link>
              <Link href="/dashboard?install=true" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 px-4 sm:px-8 text-[13px] sm:text-sm rounded-none border border-zinc-700 bg-transparent hover:bg-zinc-800/50 hover:border-zinc-500 text-zinc-400 hover:text-white gap-2 transition-colors duration-300">
                  <Download size={16} className="shrink-0" />
                  <span>Install App</span>
                </Button>
              </Link>
            </div>
            
            {/* Trust Signals */}
            <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-4 sm:gap-6 text-zinc-500 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
              <span className="leading-none translate-y-[1px]">Powered By</span>
              <div className="flex items-center gap-4 sm:gap-5 opacity-40 hover:opacity-100 transition-opacity duration-500">
                {/* Next.js */}
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <svg viewBox="0 0 128 128" className="w-4 h-4 sm:w-5 sm:h-5 fill-current"><path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.6 41.8l-5.3 8 26.3 39.9 5.3-8-26.3-39.9z"/></svg>
                  <span className="font-bold tracking-tight leading-none translate-y-[1px]">Next.js</span>
                </div>
                {/* Shopify */}
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                  <span className="font-bold tracking-tight leading-none translate-y-[1px]">Shopify</span>
                </div>
                {/* Tailwind */}
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <svg viewBox="0 0 100 50" className="w-5 h-2.5 sm:w-6 sm:h-3 fill-current translate-y-[2px]"><path d="M25 0c-8.3 0-12.5 4.2-12.5 12.5 0 8.3 4.2 12.5 12.5 12.5s12.5-4.2 12.5-12.5S33.3 0 25 0zm50 25c-8.3 0-12.5 4.2-12.5 12.5 0 8.3 4.2 12.5 12.5 12.5s12.5-4.2 12.5-12.5S83.3 25 75 25z"/></svg>
                  <span className="font-bold tracking-tight leading-none translate-y-[1px]">Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Portfolio */}
      <section id="work" className="py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Selected Work</h2>
              <p className="text-[var(--muted-foreground)]">A collection of deployed systems and applications.</p>
            </div>
          </div>

          <BentoGrid projects={projects} totalProjects={totalProjects} />
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto">
          <ROICalculator />
        </div>
      </section>

      {/* Case Study Section */}
      <section id="case-study" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-4 sm:mb-6">
                <CheckCircle2 size={14} />
                Featured Case Study
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Love Stitches: From Bloated Shopify to 1s Headless Engine.
              </h2>
              <p className="text-zinc-400 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                I replaced 12 sluggish apps with a custom Next.js frontend and a proprietary backend, eliminating platform bottlenecks while keeping the ease of Shopify&apos;s checkout.
              </p>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
                <div className="p-3 sm:p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <div className="text-xs sm:text-sm text-zinc-500 mb-1 flex items-center gap-1 sm:gap-2"><Clock size={14} className="text-cyan-400"/> <span className="hidden sm:inline">Speed</span></div>
                  <div className="text-base sm:text-xl font-bold text-white">4.2s &rarr; 0.8s</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">LCP Improvement</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <div className="text-xs sm:text-sm text-zinc-500 mb-1 flex items-center gap-1 sm:gap-2"><Database size={14} className="text-emerald-400"/> <span className="hidden sm:inline">Cost</span></div>
                  <div className="text-base sm:text-xl font-bold text-white">R0.00</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">Monthly App Fees</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <div className="text-xs sm:text-sm text-zinc-500 mb-1 flex items-center gap-1 sm:gap-2"><BarChart3 size={14} className="text-violet-400"/> <span className="hidden sm:inline">Conversion</span></div>
                  <div className="text-base sm:text-xl font-bold text-white">+24%</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">Mobile Checkout Rate</div>
                </div>
              </div>

              {/* Social Proof Quote */}
              <div className="mt-8 p-6 rounded-xl bg-cyan-500/5 border border-cyan-500/20 relative">
                <div className="absolute -top-4 -left-2 text-6xl text-cyan-500/20 font-serif leading-none">&quot;</div>
                <p className="text-zinc-300 italic relative z-10 text-sm md:text-base leading-relaxed">
                  The migration paid for itself in 3 months just from the app fees we saved. Our mobile conversion rate jumped immediately, and we finally own our infrastructure.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0 relative">
                    <Image src="https://picsum.photos/seed/sarah/100/100" alt="Sarah Jenkins" fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Sarah Jenkins</div>
                    <div className="text-xs text-cyan-400">Founder, Love Stitches</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 relative">
                <Image src="https://picsum.photos/seed/ecommerce/800/600" alt="Love Stitches Case Study" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-medium text-white">Next.js 15</div>
                    <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-medium text-white">Shopify Storefront API</div>
                    <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-medium text-white">Tailwind CSS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vekt OS Section */}
      <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">A Proprietary Backend for Your Entire Operation.</h2>
              <p className="text-zinc-400 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                Don&apos;t just run a store; run a system. Vekt OS provides a single source of truth for your inventory, finances, and customer data, integrated directly into your headless storefront.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10 h-fit">
                    <Database className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Centralized Inventory</h3>
                    <p className="text-zinc-400 text-sm">Real-time sync across web, social, and POS.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10 h-fit">
                    <Zap className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Zero-Fee Logic</h3>
                    <p className="text-zinc-400 text-sm">Custom scripts replace R2,000/mo subscription apps.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 rounded-lg bg-violet-500/10 h-fit">
                    <Shield className="text-violet-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Role-Based Dashboards</h3>
                    <p className="text-zinc-400 text-sm">Secure access for your warehouse, marketing, and finance teams.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-cyan-500/20 blur-3xl rounded-full" />
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                <Card className="p-3 sm:p-4 bg-[var(--card)]/80 border-violet-500/20 backdrop-blur-sm flex flex-col justify-between h-28 sm:h-32 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-center">
                      <div className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase">Total Revenue</div>
                      <div className="flex items-center gap-1 text-[6px] sm:text-[8px] text-emerald-500 font-mono uppercase">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        <span className="hidden sm:inline">SYNCED 2M AGO</span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="text-lg sm:text-2xl font-bold text-white">$124,500</div>
                      <div className="text-[10px] sm:text-xs text-emerald-400 mt-1">+14.2%</div>
                    </div>
                  </div>
                  {/* Glowing Chart Line (Jagged/Step) */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 pointer-events-none">
                    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                      <defs>
                        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgb(139 92 246)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="rgb(139 92 246)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,40 L0,30 L20,30 L20,35 L40,35 L40,15 L60,15 L60,25 L80,25 L80,5 L100,5 L100,40 Z" fill="url(#glow)" />
                      <path d="M0,30 L20,30 L20,35 L40,35 L40,15 L60,15 L60,25 L80,25 L80,5 L100,5" fill="none" stroke="rgb(139 92 246)" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                    </svg>
                  </div>
                </Card>
                <Card className="p-3 sm:p-4 bg-[var(--card)]/80 border-violet-500/20 backdrop-blur-sm flex flex-col justify-between h-28 sm:h-32 sm:mt-8">
                  <div className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase mb-2">Inventory Status</div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex justify-between items-center text-[10px] sm:text-xs">
                      <span className="text-zinc-300">SKU-992</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">In Stock</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] sm:text-xs">
                      <span className="text-zinc-300">SKU-401</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Low Stock</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] sm:text-xs">
                      <span className="text-zinc-500">SKU-102</span>
                      <span className="px-1 sm:px-1.5 py-0.5 rounded bg-red-500/10 text-red-500/70 border border-red-500/20">OUT</span>
                    </div>
                  </div>
                </Card>
                <Card className="p-3 sm:p-4 bg-[var(--card)]/80 border-violet-500/20 backdrop-blur-sm flex flex-col justify-between h-28 sm:h-32">
                  <div className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase">Active Users</div>
                  <div className="flex items-end justify-between">
                    <div className="text-lg sm:text-2xl font-bold text-white">1,204</div>
                    <div className="flex gap-1">
                      {[40, 70, 45, 90, 65].map((h, i) => (
                        <div key={i} className="w-1 sm:w-1.5 bg-violet-500/50 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </Card>
                <Card className="p-3 sm:p-4 bg-[var(--card)]/80 border-violet-500/20 backdrop-blur-sm flex flex-col justify-between h-28 sm:h-32 sm:mt-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase">System Load</div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <div className="flex justify-between text-[8px] sm:text-[10px] mb-1"><span className="text-zinc-400">CPU</span><span className="text-cyan-400">42%</span></div>
                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden relative">
                          <div className="h-full bg-cyan-400 w-[42%]" />
                          <div className="absolute top-0 left-0 h-full w-[42%] bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[8px] sm:text-[10px] mb-1"><span className="text-zinc-400">RAM</span><span className="text-violet-400">2.1GB</span></div>
                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden relative">
                          <div className="h-full bg-violet-400 w-[60%]" />
                          <div className="absolute top-0 left-0 h-full w-[60%] bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite_0.5s]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills / About Section */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Business Guarantees</h2>
            <p className="text-zinc-400 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
              I don&apos;t just write code; I build infrastructure designed to scale your revenue and protect your operations.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Cpu, label: 'Instant Mobile Experiences', impact: "Built with Next.js 15 for 'App-like' speeds." },
                { icon: Shield, label: 'SOC-2 Ready Infrastructure', impact: 'Enterprise-grade security with PCI-compliant payment gateways.' },
                { icon: Globe, label: 'Serverless Scalability', impact: 'Handles 10,000+ simultaneous checkouts without breaking.' },
                { icon: Terminal, label: 'Custom Integrations', impact: 'Connect your ERP, CRM, and fulfillment centers seamlessly.' }
              ].map((skill, i) => (
                <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col gap-3 hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <skill.icon className="text-cyan-400" size={24} strokeWidth={1.5} />
                    <span className="font-bold text-white">{skill.label}</span>
                  </div>
                  <div className="text-sm text-zinc-400 leading-relaxed">
                    {skill.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-full bg-gradient-to-tr from-violet-600/10 to-cyan-500/10 blur-3xl absolute inset-0" />
            <div className="relative rounded-xl overflow-hidden border border-violet-500/30 bg-[#0d1117] shadow-[0_0_30px_rgba(139,92,246,0.15)]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <div className="ml-2 text-xs text-zinc-500 font-mono">architect.ts</div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                  <span className="text-violet-400">const</span> <span className="text-cyan-400">architect</span> <span className="text-violet-400">=</span> <span className="text-zinc-300">{`{`}</span>{'\n'}
                  {'  '}<span className="text-cyan-400">name</span>: <span className="text-violet-400">&quot;Vekt OS&quot;</span>,<span className="text-zinc-500">{' // Lead Engineer'}</span>{'\n'}
                  {'  '}<span className="text-cyan-400">location</span>: <span className="text-violet-400">&quot;Remote&quot;</span>,{'\n'}
                  {'  '}<span className="text-cyan-400">stack</span>: <span className="text-zinc-300">[</span>{'\n'}
                  {'    '}<span className="text-violet-400">&quot;Next.js 15&quot;</span>,{'\n'}
                  {'    '}<span className="text-violet-400">&quot;TypeScript&quot;</span>,{'\n'}
                  {'    '}<span className="text-violet-400">&quot;Tailwind CSS&quot;</span>,{'\n'}
                  {'    '}<span className="text-violet-400">&quot;Firebase&quot;</span>{'\n'}
                  {'  '}<span className="text-zinc-300">]</span>,{'\n'}
                  {'  '}<span className="text-cyan-400">mission</span>: <span className="text-violet-400">&quot;Build the future.&quot;</span>{'\n'}
                  <span className="text-zinc-300">{`}`}</span>;
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Timeline Section */}
      <section id="timeline" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">The 14-Day Migration Protocol</h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              A structured, zero-downtime transition from bloated themes to a high-performance headless architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-12 left-6 right-6 h-0.5 bg-zinc-800 z-0" />
            {/* Connecting Line for Mobile */}
            <div className="md:hidden absolute top-6 bottom-6 left-6 w-0.5 bg-zinc-800 z-0" />

            {[
              { day: 'Day 1-3', title: 'Full Infrastructure & Data Audit', desc: 'Deep dive into your current Shopify setup, app dependencies, and performance bottlenecks.' },
              { day: 'Day 4-10', title: 'Headless Next.js Development & PWA Setup', desc: 'Building the custom frontend, integrating the Storefront API, and optimizing for mobile.' },
              { day: 'Day 11-12', title: 'Metaobject & App Logic Migration', desc: 'Replicating essential app functionality with custom scripts and native Shopify features.' },
              { day: 'Day 13-14', title: 'Optimization, Testing, and Live Deployment', desc: 'Final QA, speed testing, and seamless DNS switch with zero downtime.' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center group gap-4 md:gap-0">
                <div className="w-12 h-12 rounded-full bg-zinc-950 border-2 border-cyan-500/30 flex items-center justify-center md:mb-6 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300 shrink-0">
                  <span className="text-cyan-400 font-bold font-mono text-sm">{i + 1}</span>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 p-5 sm:p-6 rounded-xl w-full h-full hover:border-zinc-700 transition-colors">
                  <div className="text-[10px] sm:text-xs font-mono text-cyan-400 mb-2 sm:mb-3 uppercase tracking-widest">{step.day}</div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 border-t border-zinc-800/50 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">How Headless Commerce Works</h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              We separate your storefront from your backend. Shopify handles the secure checkout and inventory, while a custom Next.js application delivers a lightning-fast shopping experience.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
            {/* Frontend */}
            <div className="flex flex-col items-center text-center max-w-[250px]">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Globe className="text-cyan-400 w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Custom Frontend</h3>
              <p className="text-xs sm:text-sm text-zinc-400">Built with Next.js & Tailwind. Loads instantly, completely customizable, and optimized for mobile conversion.</p>
            </div>

            {/* Connection */}
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="hidden md:flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-2 h-0.5 bg-zinc-700" />
                ))}
              </div>
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] sm:text-xs font-mono text-zinc-400 flex items-center gap-2">
                <Zap size={12} className="text-emerald-400" />
                Storefront API
              </div>
              <div className="hidden md:flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-2 h-0.5 bg-zinc-700" />
                ))}
              </div>
              {/* Mobile connection lines */}
              <div className="flex md:hidden flex-col gap-1 my-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-0.5 h-2 bg-zinc-700" />
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="flex flex-col items-center text-center max-w-[250px]">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Database className="text-emerald-400 w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Shopify Backend</h3>
              <p className="text-xs sm:text-sm text-zinc-400">You keep your existing Shopify admin, products, orders, and secure checkout process exactly as it is.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Does this break my existing Shopify admin?",
                a: "No. Your Shopify admin remains exactly the same. You will still manage products, view orders, and handle fulfillment in Shopify. The only difference is that your customers will interact with a much faster, custom-built storefront."
              },
              {
                q: "Can I still use my favorite apps?",
                a: "Most frontend apps (like reviews or popups) will be replaced with custom, zero-fee integrations built directly into your new site. This is how we achieve the 1-second load times. Backend apps (like fulfillment or accounting) will continue to work perfectly."
              },
              {
                q: "What happens if I want to change something later?",
                a: "You will have a custom CMS (Content Management System) connected to your new storefront. You can easily update banners, text, products, and collections without needing to write any code."
              }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                  <span className="text-cyan-400 font-mono mt-1">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-zinc-400 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-zinc-800/50 relative z-10 bg-black">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Ready to Own Your Infrastructure?</h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            I only take on two migration projects per month to ensure 14-day delivery. Book your diagnostic today to see if your brand is a fit for a headless engine.
          </p>
          <div className="mt-8 sm:mt-10">
            <Link href="/contact" className="w-full sm:w-auto inline-block">
              <Button className="w-full sm:w-auto h-14 px-6 sm:px-10 text-xs sm:text-sm rounded-none border-2 border-cyan-500 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-100 gap-2 font-mono uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                Schedule My 15-Min System Audit <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
