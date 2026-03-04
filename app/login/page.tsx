'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Chrome, LayoutDashboard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { signInWithGoogle, user, isAdmin } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-[var(--card)]/50 p-10 text-center shadow-xl backdrop-blur-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Vekt OS</h1>
          <p className="text-[var(--muted-foreground)]">
            {user ? `Welcome back, ${user.displayName}` : 'Sign in to access your account'}
          </p>
        </div>

        <div className="py-8">
          <div className="mx-auto h-24 w-24 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 p-0.5 shadow-lg shadow-violet-600/20">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[var(--background)]">
              <span className="text-4xl font-bold text-white">OS</span>
            </div>
          </div>
        </div>

        {user ? (
          <div className="space-y-4">
            {isAdmin ? (
              <Link href="/dashboard" className="block">
                <Button className="w-full h-12 text-base">
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Go to Admin Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/portal" className="block">
                <Button className="w-full h-12 text-base">
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Go to Client Portal
                </Button>
              </Link>
            )}
            <p className="text-xs text-zinc-500">
              You are currently signed in as {user.email}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Button 
              onClick={signInWithGoogle} 
              className="w-full h-12 text-base"
              variant="secondary"
            >
              <Chrome className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[var(--card)] px-2 text-[var(--muted-foreground)]">Or</span>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              New client? Sign in to create your account automatically.
            </p>
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-zinc-800">
          <Link href="/" className="text-sm text-[var(--muted-foreground)] hover:text-white flex items-center justify-center gap-1 transition-colors">
            Back to Home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
