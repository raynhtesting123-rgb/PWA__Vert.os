import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query, 
  orderBy, 
  where,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Snippet } from '@/types';

const COLLECTION_NAME = 'snippets';

export async function getSnippets(userId?: string) {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  if (userId) {
    constraints.push(where('userId', '==', userId));
  }
  
  const q = query(collection(db, COLLECTION_NAME), ...constraints);
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Snippet[];
}

export async function getSnippet(id: string) {
  const docRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(docRef);
  
  if (!snapshot.exists()) return null;
  
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as Snippet;
}

export async function addSnippet(snippet: Omit<Snippet, 'id'>) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), snippet);
  return docRef.id;
}

export async function updateSnippet(id: string, data: Partial<Snippet>) {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
}

export async function deleteSnippet(id: string) {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
