import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db } from "./firebse-config";

export const addToFavorites = async (userId: string, jobId: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    favorites: arrayUnion(jobId),
  });
};

export const removeFromFavorites = async (userId: string, jobId: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    favorites: arrayRemove(jobId),
  });
};

export const getFavoriteJobIds = async (userId: string): Promise<string[]> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data().favorites || [] : [];
};
