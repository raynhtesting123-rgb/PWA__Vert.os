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
import { Task } from '@/types';

const COLLECTION_NAME = 'tasks';

export async function getTasks(projectId?: string) {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  
  if (projectId) {
    constraints.push(where('projectId', '==', projectId));
  }
  
  const q = query(collection(db, COLLECTION_NAME), ...constraints);
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Task[];
}

export async function addTask(task: Omit<Task, 'id'>) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), task);
  return docRef.id;
}

export async function updateTask(id: string, data: Partial<Task>) {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
}

export async function deleteTask(id: string) {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
