import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebse-config';
import type { UserProfile } from '../pages/profile/Profile';

export const getUserProfileFromFirebase = async (
  uid: string
): Promise<UserProfile | null> => {
  try {
    const profileSnap = await getDoc(doc(db, 'profiles', uid));
    if (profileSnap.exists()) {
      return profileSnap.data() as UserProfile;
    }
  } catch (err) {
    console.error('Failed to fetch profile:', err);
  }

  return null;
};
