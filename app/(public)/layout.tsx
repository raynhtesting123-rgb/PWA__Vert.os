import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Terminal } from 'lucide-react';
import { PublicNavbar } from '@/components/public/PublicNavbar';

export const metadata: Metadata = {
  title: 'VEKT.OS | E-Commerce Infrastructure Specialist',
  description: 'I build high-performance Headless Commerce Infrastructure that replaces bloated Shopify themes with 1-second load times.',
  keywords: ['Headless Commerce', 'Shopify', 'Next.js', 'E-commerce Infrastructure', 'Performance Optimization'],
  openGraph: {
    title: 'VEKT.OS | E-Commerce Infrastructure Specialist',
    description: 'I build high-performance Headless Commerce Infrastructure that replaces bloated Shopify themes with 1-second load times.',
    type: 'website',
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-violet-600/30 flex flex-col">
      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Navigation */}
      <PublicNavbar />

      <main className="flex-grow pt-16 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 text-[var(--muted-foreground)] text-sm relative z-10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 font-mono text-xs">
            <a href="#" className="hover:text-violet-400 transition-colors">&gt; TWITTER</a>
            <a href="#" className="hover:text-violet-400 transition-colors">&gt; GITHUB</a>
            <a href="#" className="hover:text-violet-400 transition-colors">&gt; LINKEDIN</a>
          </div>
          <div className="text-center md:text-left font-mono text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} VEKT .OS // BUILD_VER: 1.0.4_PROD
          </div>
          <div className="font-mono text-[10px] text-zinc-600">
            LOC: 29.8587° S, 31.0218° E
          </div>
        </div>
      </footer>

      {/* System Ticker */}
      <div className="border-t border-white/10 bg-black/50 backdrop-blur-md overflow-hidden py-2 flex whitespace-nowrap relative z-20 pb-2">
        <div className="animate-marquee flex gap-8 text-[10px] font-mono text-zinc-500 tracking-widest uppercase items-center" style={{ animationDuration: '40s' }}>
          <span>VEKT_OS_V1.02</span>
          <span>LATENCY: 24MS</span>
          <span>UPTIME: 99.99%</span>
          <span>SECURE_CONNECTION: TRUE</span>
          <span>VEKT_OS_V1.02</span>
          <span>LATENCY: 24MS</span>
          <span>UPTIME: 99.99%</span>
          <span>SECURE_CONNECTION: TRUE</span>
          <span>VEKT_OS_V1.02</span>
          <span>LATENCY: 24MS</span>
          <span>UPTIME: 99.99%</span>
          <span>SECURE_CONNECTION: TRUE</span>
          <span className="text-emerald-500 flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            STATUS: OPTIMIZED
          </span>
        </div>
      </div>
    </div>
  );
}
