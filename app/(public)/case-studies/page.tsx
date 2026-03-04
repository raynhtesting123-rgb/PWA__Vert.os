'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPublishedProjects } from '@/lib/db/projects';
import { Project } from '@/types';
import { Card } from '@/components/ui/Card';
import { ArrowRight, BarChart3, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CaseStudiesPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const published = await getPublishedProjects();
        setProjects(published);
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };
    loadProjects();
  }, []);

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">The Proof.</h1>
        <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
          Real results from mid-market brands that migrated from bloated Shopify themes to high-performance headless infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {/* Featured Case Study (Hardcoded for narrative, but could be dynamic) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 lg:p-12">
          <div>
            <div className="text-cyan-400 font-mono text-sm mb-4 uppercase tracking-widest">Featured Migration</div>
            <h2 className="text-3xl font-bold text-white mb-4">Love Stitches: From Bloated Shopify to 1s Headless Engine</h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              I replaced 12 sluggish apps with a custom Next.js frontend and a proprietary backend, eliminating platform bottlenecks while keeping the ease of Shopify’s checkout.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-sm text-zinc-500 mb-1 flex items-center gap-2"><Clock size={14} className="text-cyan-400"/> Speed</div>
                <div className="text-xl font-bold text-white">0.8s</div>
                <div className="text-xs text-zinc-500 mt-1">Down from 4.2s LCP</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-sm text-zinc-500 mb-1 flex items-center gap-2"><Zap size={14} className="text-emerald-400"/> Cost</div>
                <div className="text-xl font-bold text-white">R0.00</div>
                <div className="text-xs text-zinc-500 mt-1">Monthly App Fees</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-sm text-zinc-500 mb-1 flex items-center gap-2"><BarChart3 size={14} className="text-violet-400"/> Conversion</div>
                <div className="text-xl font-bold text-white">+24%</div>
                <div className="text-xs text-zinc-500 mt-1">Mobile Checkout Rate</div>
              </div>
            </div>

            <Link href="/contact">
              <Button className="h-12 px-6 text-sm rounded-none border border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 gap-2 font-mono uppercase tracking-widest transition-all">
                Get Similar Results <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/ecommerce/800/600')] bg-cover bg-center opacity-50 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 text-[10px] font-mono uppercase bg-black/50 border border-white/10 text-zinc-300 backdrop-blur-md">Next.js 15</span>
                <span className="px-2 py-1 text-[10px] font-mono uppercase bg-black/50 border border-white/10 text-zinc-300 backdrop-blur-md">Shopify Storefront API</span>
                <span className="px-2 py-1 text-[10px] font-mono uppercase bg-black/50 border border-white/10 text-zinc-300 backdrop-blur-md">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Projects from DB */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projects.map((project) => (
              <Card key={project.id} className="bg-zinc-900/50 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-colors flex flex-col">
                <div className="aspect-video bg-zinc-950 relative overflow-hidden border-b border-zinc-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-mono text-xs uppercase tracking-widest">
                    Project Data
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-zinc-400 text-sm mb-6 line-clamp-3 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.technologies || []).slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-[10px] font-mono uppercase bg-zinc-800/50 text-zinc-400 rounded">
                        {tech}
                      </span>
                    ))}
                    {(project.technologies || []).length > 3 && (
                      <span className="px-2 py-1 text-[10px] font-mono uppercase bg-zinc-800/50 text-zinc-500 rounded">
                        +{(project.technologies || []).length - 3}
                      </span>
                    )}
                  </div>
                  <Link href={`/projects/${project.slug}`} className="text-cyan-400 text-sm font-mono uppercase tracking-widest flex items-center gap-2 group-hover:text-cyan-300 transition-colors">
                    View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
