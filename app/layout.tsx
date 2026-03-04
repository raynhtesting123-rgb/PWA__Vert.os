'use client';

import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { PWARegister } from '@/components/PWARegister';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7C3AED" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] min-h-screen font-sans antialiased">
        <PWARegister />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
