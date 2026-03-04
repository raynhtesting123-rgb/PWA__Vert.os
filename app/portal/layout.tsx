'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { Loader2, LogOut, LayoutDashboard, FileText, LifeBuoy, Activity, EyeOff } from 'lucide-react';
import { InstallPrompt } from '@/components/InstallPrompt';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout, ghostMode, exitGhostMode } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  const navItems = [
    { name: 'Overview', href: '/portal', icon: LayoutDashboard },
    { name: 'Infrastructure', href: '/portal/infrastructure', icon: Activity },
    { name: 'Assets', href: '/portal/assets', icon: FileText },
    { name: 'Support', href: '/portal/support', icon: LifeBuoy },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
      {/* Ghost Mode Banner */}
      {ghostMode && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-indigo-600 text-white px-4 py-2 flex items-center justify-between text-sm shadow-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="font-medium">Admin Ghost Mode Active</span>
            <span className="hidden md:inline text-indigo-200 ml-2">Viewing portal as client ID: {ghostMode}</span>
          </div>
          <button 
            onClick={exitGhostMode}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-colors font-medium"
          >
            <EyeOff size={16} />
            Exit Mode
          </button>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 border-r border-zinc-800 bg-zinc-900/50 hidden md:flex flex-col ${ghostMode ? 'mt-10' : ''}`}>
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Vekt Portal
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Client Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive 
                    ? 'bg-violet-500/10 text-violet-400' 
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col h-screen overflow-hidden ${ghostMode ? 'mt-10' : ''}`}>
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50">
          <h1 className="text-lg font-bold text-zinc-100">Vekt Portal</h1>
          <button onClick={logout} className="p-2 text-zinc-400 hover:text-zinc-100">
            <LogOut size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        <InstallPrompt />
      </Suspense>
    </div>
  );
}
