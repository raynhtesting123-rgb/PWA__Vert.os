'use client';

import { Project } from '@/types';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Github, Globe, Terminal, Cpu, Database, Layout } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BentoGridProps {
  projects: Project[];
  totalProjects?: number;
}

export function BentoGrid({ projects, totalProjects = 0 }: BentoGridProps) {
  // Find "Love Stitches" or default to first project
  const featuredProject = projects.find(p => p.title.toLowerCase().includes('love stitches')) || projects[0];
  const otherProjects = projects.filter(p => p.id !== featuredProject?.id).slice(0, 2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)] sm:auto-rows-[minmax(180px,auto)]">
      {/* Primary Feature: Love Stitches (or featured project) */}
      {featuredProject && (
        <Card className="md:col-span-2 md:row-span-2 group relative min-h-[350px] sm:min-h-[400px] overflow-hidden">
          <Link href={`/projects/${featuredProject.id}`} className="absolute inset-0 z-30" />
          
          {/* Back Layer: Admin Dashboard Mockup */}
          <div className="absolute inset-0 bg-[#0a0a0a] p-4 sm:p-6 flex flex-col gap-4 z-0">
             <div className="flex justify-between items-center border-b border-zinc-800 pb-3 sm:pb-4">
               <div className="text-[10px] sm:text-sm font-mono text-violet-400 truncate pr-2">ADMIN_PANEL // {featuredProject.title.toUpperCase()}</div>
               <div className="flex gap-1.5 sm:gap-2 shrink-0">
                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-700" />
                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-700" />
                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-700" />
               </div>
             </div>
             <div className="grid grid-cols-3 gap-2 sm:gap-4">
               <div className="bg-zinc-900/50 rounded-lg p-2 sm:p-4 border border-zinc-800/50">
                 <div className="text-[8px] sm:text-[10px] text-zinc-500 mb-1 font-mono">PLATFORM_FEES</div>
                 <div className="text-sm sm:text-xl text-emerald-400 font-mono">R0.00</div>
               </div>
               <div className="bg-zinc-900/50 rounded-lg p-2 sm:p-4 border border-zinc-800/50">
                 <div className="text-[8px] sm:text-[10px] text-zinc-500 mb-1 font-mono">FULFILLMENT</div>
                 <div className="text-sm sm:text-xl text-white font-mono">2x FASTER</div>
               </div>
               <div className="bg-zinc-900/50 rounded-lg p-2 sm:p-4 border border-zinc-800/50">
                 <div className="text-[8px] sm:text-[10px] text-zinc-500 mb-1 font-mono">ROI_PAYBACK</div>
                 <div className="text-sm sm:text-xl text-white font-mono">10 MONTHS</div>
               </div>
             </div>
             <div className="flex-1 bg-zinc-900/50 rounded-lg border border-zinc-800/50 p-4">
               <div className="flex justify-between items-center mb-4">
                 <div className="h-2 w-1/4 bg-zinc-800 rounded" />
                 <div className="h-2 w-16 bg-emerald-500/20 rounded" />
               </div>
               <div className="space-y-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="flex justify-between items-center p-2 bg-zinc-800/30 rounded">
                     <div className="h-2 w-1/3 bg-zinc-700 rounded" />
                     <div className="h-2 w-8 bg-zinc-700 rounded" />
                   </div>
                 ))}
               </div>
             </div>
          </div>

          {/* Front Layer: Main Image (slides up on hover) */}
          <div className="absolute inset-0 z-10 transition-transform duration-700 ease-in-out group-hover:-translate-y-[100%]">
            {featuredProject.imageUrl ? (
              <Image 
                src={featuredProject.imageUrl} 
                alt={featuredProject.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <Layout size={48} className="text-pink-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-5 sm:p-6 md:p-8 w-full">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2 sm:px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-[8px] sm:text-[10px] font-mono uppercase tracking-wider border border-violet-500/20 backdrop-blur-md">
                  Infrastructure Architect & Deployment
                </span>
                <span className="px-2 sm:px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[8px] sm:text-[10px] font-mono uppercase tracking-wider border border-emerald-500/20 backdrop-blur-md hidden sm:inline-block">
                  REPLACED SHOPIFY // 0% MONTHLY PLATFORM FEES
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{featuredProject.title}</h3>
              <p className="text-sm sm:text-base text-zinc-300 line-clamp-2 mb-4 sm:mb-6 max-w-lg">
                {featuredProject.description}
              </p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white transition-colors">
                  View Case Study <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* System Stats Card */}
      <Card className="md:col-span-1 md:row-span-1 bg-[var(--card)] border-zinc-800 p-6 flex flex-col justify-between group hover:border-zinc-700 transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Database size={16} className="text-emerald-500" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">System Stats</span>
          </div>
          <div className="text-4xl font-bold text-white mb-1">100%</div>
          <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Infrastructure Deployed</p>
        </div>
        <div className="w-full bg-zinc-900 h-1 mt-4 rounded-full overflow-visible relative">
          <div className="absolute top-0 left-0 bg-violet-500 h-full w-full rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
        </div>
      </Card>

      {/* Lead Magnet Card */}
      <Card className="md:col-span-1 md:row-span-1 bg-[#0D0D0D] border border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.15)] p-6 flex flex-col justify-between group hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-300">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Terminal size={16} className="text-violet-500" />
            <span className="text-[10px] font-mono text-violet-400 uppercase tracking-wider">Consultation</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2 font-mono uppercase tracking-wide">INITIAL SYSTEMS DIAGNOSTIC</h3>
          <p className="text-zinc-400 text-xs leading-relaxed font-mono">
            Identifying manual bottlenecks and SaaS overhead in your current stack.
          </p>
        </div>
        <a 
          href="https://cal.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 relative inline-flex items-center justify-center w-full px-4 py-3 bg-violet-600/20 border border-violet-500 text-violet-300 text-xs font-mono uppercase tracking-widest hover:bg-violet-600/40 hover:text-white transition-all duration-300"
        >
          <span className="absolute inset-0 shadow-[0_0_20px_rgba(139,92,246,0.4)] animate-pulse pointer-events-none" />
          RUN DIAGNOSTIC
        </a>
      </Card>

      {/* Internal Tooling Teaser */}
      <Card className="md:col-span-2 md:row-span-1 bg-[var(--card)] border-zinc-800 p-6 flex flex-col justify-between group hover:border-violet-500/50 transition-colors">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={16} className="text-violet-500" />
              <span className="text-xs font-mono text-violet-400 uppercase tracking-wider">Internal Tooling</span>
            </div>
            <h3 className="text-xl font-bold text-white">Vekt OS</h3>
          </div>
          <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-violet-500/10 transition-colors">
            <Database size={20} className="text-[var(--muted-foreground)] group-hover:text-violet-400" />
          </div>
        </div>
        <p className="text-[var(--muted-foreground)] text-sm mt-2 mb-4">
          A custom-built dashboard for managing projects, finances, and knowledge base. 
          Built with Next.js 15, Firebase, and Tailwind.
        </p>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 flex-wrap">
          <span className="px-2 py-1 rounded bg-zinc-800">Auth</span>
          <span className="px-2 py-1 rounded bg-zinc-800">CMS</span>
          <span className="px-2 py-1 rounded bg-zinc-800">Analytics</span>
          <span className="px-2 py-1 rounded bg-violet-500/10 text-violet-400 flex items-center gap-2 border border-violet-500/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500"></span>
            </span>
            Real-Time
          </span>
        </div>
      </Card>

      {/* Secondary Projects */}
      {otherProjects.map((project) => (
        <Card key={project.id} className="md:col-span-1 md:row-span-1 group relative min-h-[180px] sm:min-h-[200px]">
          <Link href={`/projects/${project.id}`} className="absolute inset-0 z-10" />
          <div className="absolute inset-0">
            {project.imageUrl ? (
              <Image 
                src={project.imageUrl} 
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                <Cpu size={24} className="text-zinc-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
          </div>
          <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
            <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 pointer-events-auto relative z-20">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-violet-400">
                  <Globe size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-violet-400">
                  <Github size={14} />
                </a>
              )}
            </div>
          </div>
        </Card>
      ))}

      {/* Trust Widget */}
      <Card className="md:col-span-2 md:row-span-1 bg-[var(--card)] border-zinc-800 p-6 flex flex-col justify-between group hover:border-zinc-700 transition-colors relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-emerald-500" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Global Status</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono text-zinc-400">GMT+2 (SAST)</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1 font-mono uppercase">International Ready</h3>
            <p className="text-sm text-zinc-400 font-mono">4-Hour Overlap with EST/GMT</p>
          </div>
        </div>
      </Card>

      {/* Tech Stack / More Link */}
      <Card className="md:col-span-4 md:row-span-1 relative bg-gradient-to-br from-[var(--card)] to-[var(--background)] border-zinc-800 p-6 flex flex-col justify-center items-center text-center group hover:border-zinc-700 transition-colors">
        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <ArrowRight size={20} className="text-white" />
        </div>
        <h3 className="text-sm font-medium text-white mb-1">View All Work</h3>
        <p className="text-xs text-[var(--muted-foreground)]">Check out my GitHub</p>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
      </Card>
    </div>
  );
}
