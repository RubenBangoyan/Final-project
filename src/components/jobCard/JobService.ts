import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebse-config';
import type { Job } from './types/types';

export const getAllJobs = async (): Promise<Job[]> => {
  try {
    const jobsCollection = collection(db, 'jobs');
    const snapshot = await getDocs(jobsCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Job[];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};
