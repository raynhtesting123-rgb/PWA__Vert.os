'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getUserProfile, createUserProfile } from '@/lib/db/clients';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  ghostMode: string | null;
  enterGhostMode: (clientId: string) => void;
  exitGhostMode: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isAdmin: false,
  signInWithGoogle: async () => {},
  logout: async () => {},
  ghostMode: null,
  enterGhostMode: () => {},
  exitGhostMode: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [ghostMode, setGhostMode] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = user?.email === 'raynhardt34@gmail.com';

  useEffect(() => {
    // Load ghost mode from sessionStorage if available
    const savedGhostMode = sessionStorage.getItem('ghostMode');
    if (savedGhostMode) {
      setTimeout(() => setGhostMode(savedGhostMode), 0);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          let profile = await getUserProfile(user.uid);
          if (!profile) {
            const role = user.email === 'raynhardt34@gmail.com' ? 'admin' : 'client';
            await createUserProfile(user.uid, { email: user.email || '', role });
            profile = { uid: user.uid, email: user.email || '', role };
          }
          
          // Auto-create client data for clients if it doesn't exist
          if (profile.role === 'client' && user.email) {
            const { createClient, getClient } = require('@/lib/db/clients');
            const existingClient = await getClient(user.email.toLowerCase().trim());
            if (!existingClient) {
              await createClient({
                name: user.displayName || 'New Client',
                email: user.email.toLowerCase().trim(),
                infrastructure: { uptime: 100, responseTime: 50, lcp: 1.0, cls: 0.01 },
                migration: { currentDay: 1, phases: [] },
                assets: [],
                tickets: [],
              });
            }
          }
          
          setUserProfile(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const enterGhostMode = (clientId: string) => {
    if (isAdmin) {
      setGhostMode(clientId);
      sessionStorage.setItem('ghostMode', clientId);
      router.push('/portal');
    }
  };

  const exitGhostMode = () => {
    setGhostMode(null);
    sessionStorage.removeItem('ghostMode');
    router.push('/clients');
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Error signing in with Google', error);
      if (error.code === 'auth/unauthorized-domain') {
        alert('This domain is not authorized for OAuth operations. Please add it to your Firebase Console > Authentication > Settings > Authorized Domains.');
      } else {
        alert('Failed to sign in. Please try again.');
      }
    }
  };

  const logout = async () => {
    try {
      setGhostMode(null);
      sessionStorage.removeItem('ghostMode');
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  // If in ghost mode, override the userProfile's uid
  const effectiveProfile = ghostMode && isAdmin && userProfile 
    ? { ...userProfile, uid: ghostMode, role: 'client' as const } 
    : userProfile;

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile: effectiveProfile, 
      loading, 
      isAdmin, 
      signInWithGoogle, 
      logout,
      ghostMode,
      enterGhostMode,
      exitGhostMode
    }}>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
