'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const searchParams = useSearchParams();
  const shouldAutoPrompt = searchParams.get('install') === 'true';

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={handleInstallClick}
        className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg flex items-center gap-2"
      >
        <Download size={16} />
        Install Client App
      </Button>
    </div>
  );
}
