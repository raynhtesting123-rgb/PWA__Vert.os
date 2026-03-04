import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, onSnapshot, query, addDoc, deleteDoc, where } from 'firebase/firestore';
import { ClientData, UserProfile } from '@/types';

export const getClients = async (): Promise<ClientData[]> => {
  const q = query(collection(db, 'clientData'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClientData));
};

export const getClient = async (id: string): Promise<ClientData | null> => {
  const docRef = doc(db, 'clientData', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as ClientData;
  }
  return null;
};

export const createClient = async (data: Omit<ClientData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'clientData'), {
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return docRef.id;
};

export const updateClient = async (id: string, data: Partial<ClientData>): Promise<void> => {
  const docRef = doc(db, 'clientData', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Date.now(),
  });
};

export const deleteClient = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'clientData', id));
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { uid: docSnap.id, ...docSnap.data() } as UserProfile;
  }
  return null;
};

export const createUserProfile = async (uid: string, data: Omit<UserProfile, 'uid'>): Promise<void> => {
  await setDoc(doc(db, 'users', uid), data);
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  await updateDoc(doc(db, 'users', uid), data);
};

export const subscribeToClientData = (clientId: string, callback: (data: ClientData | null) => void) => {
  const docRef = doc(db, 'clientData', clientId);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() } as ClientData);
    } else {
      callback(null);
    }
  });
};

export const subscribeToClientDataByEmail = (email: string, callback: (data: ClientData | null) => void) => {
  const q = query(collection(db, 'clientData'), where('email', '==', email));
  return onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      callback({ id: doc.id, ...doc.data() } as ClientData);
    } else {
      callback(null);
    }
  });
};
