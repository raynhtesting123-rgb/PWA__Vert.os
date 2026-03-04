'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

export function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[var(--background)]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* Custom Vekt Logomark */}
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:w-9 sm:h-9">
            <defs>
              <linearGradient id="vGradient" x1="10" y1="5" x2="30" y2="35" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6" />
                <stop offset="0.5" stopColor="#6d28d9" />
                <stop offset="1" stopColor="#4c1d95" />
              </linearGradient>
              <linearGradient id="vGradientRight" x1="30" y1="5" x2="20" y2="35" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2dd4bf" />
                <stop offset="1" stopColor="#0d9488" />
              </linearGradient>
              <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur1" />
                <feGaussianBlur stdDeviation="6" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outer Hexagon/Shield Container */}
            <path d="M20 2L36 10.5V29.5L20 38L4 29.5V10.5L20 2Z" 
                  stroke="rgba(139, 92, 246, 0.2)" 
                  strokeWidth="1" 
                  fill="rgba(13, 13, 13, 0.8)" />
            
            {/* Inner Hexagon Glow */}
            <path d="M20 4L34 11.5V28.5L20 36L6 28.5V11.5L20 4Z" 
                  stroke="rgba(45, 212, 191, 0.1)" 
                  strokeWidth="0.5" />

            {/* Background Grid/Matrix effect for depth */}
            <path d="M10 10H30M10 20H30M10 30H30M15 10V30M25 10V30" 
                  stroke="rgba(255,255,255,0.03)" 
                  strokeWidth="0.5" />

            {/* The "V" - Left Arm (Thick, structural, violet) */}
            <path d="M11 12L18 28H22L15 12H11Z" 
                  fill="url(#vGradient)" 
                  filter="url(#subtleGlow)" />
            
            {/* The "V" - Right Arm (Thin, sharp, cyan) */}
            <path d="M29 12L20 28" 
                  stroke="url(#vGradientRight)" 
                  strokeWidth="2" 
                  strokeLinecap="square" 
                  filter="url(#neonGlow)" />

            {/* The "Spark" at the vertex */}
            <circle cx="20" cy="28" r="2.5" fill="#fff" filter="url(#neonGlow)" />
            <circle cx="20" cy="28" r="1" fill="#2dd4bf" />

            {/* Tech Accents */}
            <rect x="10" y="11" width="2" height="2" fill="#8b5cf6" />
            <rect x="28" y="11" width="2" height="2" fill="#2dd4bf" />
            
            {/* Data stream line crossing the V */}
            <path d="M14 20L26 20" 
                  stroke="#a78bfa" 
                  strokeWidth="0.5" 
                  strokeDasharray="1 2" 
                  opacity="0.8" />
            
            {/* Corner Brackets */}
            <path d="M8 8L10 8M8 8L8 10" stroke="#52525b" strokeWidth="1" />
            <path d="M32 8L30 8M32 8L32 10" stroke="#52525b" strokeWidth="1" />
            <path d="M8 32L10 32M8 32L8 30" stroke="#52525b" strokeWidth="1" />
            <path d="M32 32L30 32M32 32L32 30" stroke="#52525b" strokeWidth="1" />
          </svg>
          <div className="font-mono font-bold text-lg sm:text-xl tracking-[0.2em]">
            VEKT<span className="text-violet-500">.OS</span>
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-6 text-xs font-mono text-[var(--muted-foreground)] uppercase">
          {/* System Status Ticker */}
          <div className="hidden lg:flex overflow-hidden w-64 border-r border-white/10 pr-6 mr-2">
            <div className="animate-marquee whitespace-nowrap text-[10px] text-violet-400">
              VEKT_NODE_01 // LATENCY: 14MS // STATUS: OPTIMIZED //&nbsp;
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
            <Link href="/infrastructure" className="hover:text-white transition-colors">Infrastructure</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <Link href="/login" className="hidden sm:block">
            <Button variant="secondary" className="h-8 text-xs font-mono uppercase">
              Login
            </Button>
          </Link>
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-zinc-950 border-b border-white/10 p-4 flex flex-col gap-4 font-mono text-sm uppercase">
          <Link href="/case-studies" className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded" onClick={() => setIsMobileMenuOpen(false)}>Case Studies</Link>
          <Link href="/infrastructure" className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded" onClick={() => setIsMobileMenuOpen(false)}>Infrastructure</Link>
          <Link href="/about" className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link href="/contact" className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link href="/login" className="p-2 text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 rounded mt-2 border border-violet-500/20" onClick={() => setIsMobileMenuOpen(false)}>Login to Dashboard</Link>
        </div>
      )}
    </nav>
  );
}