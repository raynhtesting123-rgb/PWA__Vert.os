'use client';

import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { InstallPrompt } from '@/components/InstallPrompt';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (!isAdmin) {
        router.push('/portal');
      }
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--background)]">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4 pt-16 md:p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto pb-20 md:pb-0">
          {children}
        </div>
      </main>
      <Suspense fallback={null}>
        <InstallPrompt />
      </Suspense>
    </div>
  );
}
