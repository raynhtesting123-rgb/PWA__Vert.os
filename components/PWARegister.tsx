'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PWARegister() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      pathname?.startsWith('/portal')
    ) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/portal' })
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, [pathname]);

  return null;
}
