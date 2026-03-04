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
  const docId = data.email ? data.email.toLowerCase().trim() : collection(db, 'clientData').id; // fallback to auto id if no email
  const docRef = doc(db, 'clientData', docId);
  await setDoc(docRef, {
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return docId;
};

export const updateClient = async (id: string, data: Partial<ClientData>): Promise<void> => {
  const docRef = doc(db, 'clientData', id);
  const { id: _, ...updateData } = data as any;
  await updateDoc(docRef, {
    ...updateData,
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
  const cleanEmail = email.trim();
  const q = query(collection(db, 'clientData'), where('email', '==', cleanEmail));
  return onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      callback({ id: doc.id, ...doc.data() } as ClientData);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error("Error subscribing to client data by email:", error);
    callback(null);
  });
};
