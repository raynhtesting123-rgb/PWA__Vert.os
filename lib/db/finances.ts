import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Transaction } from '@/types';

const COLLECTION_NAME = 'transactions';

export async function getTransactions(userId?: string) {
  const constraints: QueryConstraint[] = [orderBy('date', 'desc')];
  if (userId) {
    constraints.push(where('userId', '==', userId));
  }
  
  const q = query(collection(db, COLLECTION_NAME), ...constraints);
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Transaction[];
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), transaction);
  return docRef.id;
}

export async function deleteTransaction(id: string) {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
