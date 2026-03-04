import { Cpu, Database, Globe, Shield, Terminal, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function InfrastructurePage() {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="mb-12 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">The Infrastructure.</h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed">
          A deep dive into the technology stack that powers our high-performance headless commerce solutions. Built for scale, security, and speed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start mb-16 md:mb-24">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Zero-Fee Logic</h2>
          <p className="text-zinc-400 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
            Stop paying monthly subscriptions for basic functionality. We replace bloated Shopify apps with custom, serverless functions that run at the edge, reducing your overhead and dramatically improving page load times.
          </p>
          <ul className="space-y-4 text-zinc-300">
            <li className="flex items-start gap-3">
              <Zap className="text-cyan-400 mt-1 shrink-0" size={18} />
              <span className="text-sm md:text-base"><strong>Edge Computing:</strong> Logic runs closer to your users, ensuring instant responses for dynamic pricing, inventory checks, and personalized recommendations.</span>
            </li>
            <li className="flex items-start gap-3">
              <Database className="text-emerald-400 mt-1 shrink-0" size={18} />
              <span className="text-sm md:text-base"><strong>Custom Metaobjects:</strong> We leverage Shopify&apos;s native metaobjects to store complex data structures without relying on third-party databases.</span>
            </li>
            <li className="flex items-start gap-3">
              <Terminal className="text-violet-400 mt-1 shrink-0" size={18} />
              <span className="text-sm md:text-base"><strong>API-First Approach:</strong> Seamlessly integrate with your existing ERP, CRM, or fulfillment software using robust, custom-built APIs.</span>
            </li>
          </ul>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 md:p-8 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto relative">
          <div className="absolute top-0 right-0 p-4 opacity-20 hidden sm:block">
            <Cpu size={120} />
          </div>
          <pre className="relative z-10 whitespace-pre">
            <span className="text-violet-400">export async function</span> <span className="text-cyan-400">calculateDynamicPricing</span>(req: Request) {'{\n'}
            {'  '}<span className="text-zinc-500">{`// Edge function replacing a $99/mo pricing app`}{'\n'}</span>
            {'  '}<span className="text-violet-400">const</span> {'{'} customerId, cartItems {'}'} = <span className="text-violet-400">await</span> req.json();{'\n\n'}
            {'  '}<span className="text-violet-400">const</span> tier = <span className="text-violet-400">await</span> <span className="text-cyan-400">getCustomerTier</span>(customerId);{'\n'}
            {'  '}<span className="text-violet-400">const</span> discount = <span className="text-cyan-400">applyTierDiscount</span>(tier, cartItems);{'\n\n'}
            {'  '}<span className="text-violet-400">return</span> Response.json({'{'} discount {'}'});{'\n'}
            {'}'}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start mb-16 md:mb-24">
        <div className="order-2 lg:order-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 opacity-50" />
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-black/50 border border-white/10 p-4 rounded-xl text-center">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">99.99%</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Uptime SLA</div>
            </div>
            <div className="bg-black/50 border border-white/10 p-4 rounded-xl text-center">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">&lt; 50ms</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Global Latency</div>
            </div>
            <div className="bg-black/50 border border-white/10 p-4 rounded-xl text-center sm:col-span-2">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">10,000+</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Simultaneous Checkouts</div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Serverless Scalability</h2>
          <p className="text-zinc-400 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
            Built on Next.js and deployed on Vercel&apos;s global edge network. Your storefront scales automatically to handle Black Friday traffic spikes without a single dropped connection.
          </p>
          <ul className="space-y-4 text-zinc-300">
            <li className="flex items-start gap-3">
              <Globe className="text-cyan-400 mt-1 shrink-0" size={18} />
              <span className="text-sm md:text-base"><strong>Global CDN:</strong> Static assets and cached responses are served from the node closest to your customer, guaranteeing sub-second load times worldwide.</span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="text-emerald-400 mt-1 shrink-0" size={18} />
              <span className="text-sm md:text-base"><strong>SOC-2 Ready:</strong> Enterprise-grade security protocols protect your customer data, while Shopify continues to handle all PCI-compliant payment processing.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Ready to upgrade your stack?</h2>
        <p className="text-zinc-400 mb-8 max-w-2xl mx-auto text-sm md:text-base">
          Stop letting outdated infrastructure throttle your growth. Let&apos;s discuss how a custom headless setup can transform your e-commerce operations.
        </p>
        <Link href="/contact">
          <Button className="w-full sm:w-auto h-14 px-8 text-xs md:text-sm rounded-none border-2 border-cyan-500 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-100 gap-2 font-mono uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            Schedule a Technical Deep Dive
          </Button>
        </Link>
      </div>
    </div>
  );
}
