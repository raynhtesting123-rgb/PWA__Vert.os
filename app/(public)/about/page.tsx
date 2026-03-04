import { ArrowRight, Cpu, Database, Globe, Shield, Terminal, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="mb-12 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">The Vision.</h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed">
          Why I believe the current Shopify ecosystem is broken, and why owning your infrastructure is the only path to sustainable scale.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">The App Store Trap</h2>
          <p className="text-zinc-400 leading-relaxed mb-4 md:mb-6 text-base md:text-lg">
            Shopify is incredible for starting a business. But as you scale past $1M in revenue, the very ecosystem that helped you launch becomes your biggest bottleneck.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
            You install apps for reviews, upsells, filtering, and loyalty. Each app injects its own JavaScript into your theme. Suddenly, your site takes 5 seconds to load on mobile, and you&apos;re paying thousands of dollars a month in subscription fees just to keep the lights on.
          </p>
          <div className="p-4 md:p-6 rounded-xl bg-red-500/5 border border-red-500/20">
            <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-red-400 font-mono">!</span> The Result
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm">
              Bloated codebases, conflicting scripts, plummeting conversion rates, and a complete lack of control over your own customer experience.
            </p>
          </div>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center p-8 md:p-12">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/code/800/800')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
          <div className="relative z-10 text-center">
            <div className="text-4xl md:text-6xl font-bold text-red-500/50 mb-2 md:mb-4 font-mono">5.2s</div>
            <div className="text-[10px] md:text-sm text-zinc-500 uppercase tracking-widest font-mono">Average Shopify Mobile Load Time</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
        <div className="order-2 lg:order-1 relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 opacity-50" />
          <div className="relative z-10 text-center">
            <div className="text-4xl md:text-6xl font-bold text-cyan-400 mb-2 md:mb-4 font-mono">0.8s</div>
            <div className="text-[10px] md:text-sm text-zinc-500 uppercase tracking-widest font-mono">VEKT.OS Headless Load Time</div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">The VEKT.OS Philosophy</h2>
          <p className="text-zinc-400 leading-relaxed mb-4 md:mb-6 text-base md:text-lg">
            I build bespoke, high-performance headless commerce infrastructure. I strip away the bloated themes and third-party apps, replacing them with a custom Next.js frontend that connects directly to Shopify&apos;s Storefront API.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
            You keep the security and reliability of Shopify&apos;s backend, but you gain complete ownership of your frontend experience.
          </p>
          <ul className="space-y-4 text-zinc-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-cyan-400 mt-1 shrink-0" size={18} />
              <span className="text-sm md:text-base"><strong>Total Control:</strong> No more theme limitations. If you can design it, we can build it.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-emerald-400 mt-1 shrink-0" size={18} />
              <span className="text-sm md:text-base"><strong>Instant Loads:</strong> Sub-second page transitions that feel like a native mobile app.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-violet-400 mt-1 shrink-0" size={18} />
              <span className="text-sm md:text-base"><strong>Zero-Fee Logic:</strong> Custom serverless functions replace expensive monthly app subscriptions.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Stop renting your infrastructure.</h2>
        <p className="text-zinc-400 mb-8 max-w-2xl mx-auto text-sm md:text-base">
          It&apos;s time to own your tech stack and reclaim the revenue you&apos;re losing to slow page speeds.
        </p>
        <Link href="/contact">
          <Button className="w-full sm:w-auto h-14 px-8 text-xs md:text-sm rounded-none border-2 border-cyan-500 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-100 gap-2 font-mono uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            Book Your Strategy Call
          </Button>
        </Link>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
