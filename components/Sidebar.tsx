'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  DollarSign, 
  BookOpen, 
  CheckSquare, 
  Menu,
  X,
  LogOut,
  Globe,
  Users,
  LifeBuoy
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/auth/AuthProvider';
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Tickets', href: '/tickets', icon: LifeBuoy },
  { name: 'Portfolio CMS', href: '/portfolio', icon: Briefcase },
  { name: 'Finances', href: '/finances', icon: DollarSign },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
  { name: 'Projects', href: '/projects', icon: CheckSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900 text-white rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[var(--background)] border-r border-zinc-800 transform transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-zinc-800">
            <h1 className="text-xl font-bold text-white tracking-tight">Vekt OS</h1>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Internal Tools v1.0</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "text-[var(--muted-foreground)] hover:bg-zinc-900 hover:text-white"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-zinc-800">
              <Link
                href="/"
                className="flex items-center px-4 py-3 text-sm font-medium text-[var(--muted-foreground)] hover:bg-zinc-900 hover:text-white rounded-lg transition-colors"
              >
                <Globe className="mr-3 h-5 w-5" />
                Public Website
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-zinc-800">
            <div className="flex items-center px-4 py-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-xs overflow-hidden relative shrink-0">
                {user?.photoURL ? (
                  <Image src={user.photoURL} alt={user.displayName || 'User'} fill className="object-cover" referrerPolicy="no-referrer" />
                ) : (
                  user?.email?.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{user?.displayName || 'User'}</p>
                <p className="text-xs text-[var(--muted-foreground)] truncate">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full flex items-center px-4 py-2 text-xs font-medium text-[var(--muted-foreground)] hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
