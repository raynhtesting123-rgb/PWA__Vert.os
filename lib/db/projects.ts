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
  Timestamp,
  QueryConstraint,
  documentId
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Project } from '@/types';

const COLLECTION_NAME = 'projects';

export async function getPublicProject(id: string) {
  // Strategy: Fetch all published projects and find the one with the matching ID.
  // This avoids complex query permission/index issues with documentId() + where()
  // and ensures we strictly follow the "list published" rule which we know works.
  const projects = await getPublishedProjects();
  return projects.find(p => p.id === id) || null;
}

export async function getPublishedProjects() {
  // Fetch only published projects using a query constraint
  // We sort in memory to avoid needing a composite index (isPublished + createdAt)
  const q = query(
    collection(db, COLLECTION_NAME), 
    where('isPublished', '==', true)
  );
  
  const snapshot = await getDocs(q);
  
  const projects = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Project[];

  // Sort by createdAt descending (newest first)
  return projects.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getProjects(userId?: string) {
  // In a real app, we would filter by userId. 
  // For this internal tool, we might want to see all or just filter if userId is provided.
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  if (userId) {
    constraints.push(where('userId', '==', userId));
  }
  
  const q = query(collection(db, COLLECTION_NAME), ...constraints);
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Project[];
}

export async function getProject(id: string) {
  const docRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(docRef);
  
  if (!snapshot.exists()) return null;
  
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as Project;
}

export async function addProject(project: Omit<Project, 'id'>) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), project);
  return docRef.id;
}

export async function updateProject(id: string, data: Partial<Project>) {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
}

export async function deleteProject(id: string) {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
