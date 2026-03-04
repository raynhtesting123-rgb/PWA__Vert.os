import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Lead } from '@/types';

const COLLECTION_NAME = 'leads';

export async function addLead(data: Omit<Lead, 'id' | 'status' | 'createdAt'>) {
  const lead = {
    ...data,
    status: 'new',
    createdAt: Timestamp.now().toMillis(),
  };
  const docRef = await addDoc(collection(db, COLLECTION_NAME), lead);
  return docRef.id;
}

export async function getLeads() {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Lead[];
}

export async function updateLeadStatus(id: string, status: Lead['status']) {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { status });
}

export async function deleteLead(id: string) {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
