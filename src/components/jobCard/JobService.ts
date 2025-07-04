import { db } from "../../services/firebse-config";
import type { Job } from "./types/types";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

interface Filters {
  employmentType?: string;
  technology?: string;
  salaryFrom?: number;
  salaryTo?: number;
}
export const getAllJobs = async (filters: Filters = {}): Promise<Job[]> => {
  try {
    const jobsCollection = collection(db, "jobs");

    let q = query(jobsCollection);

    if (filters.employmentType) {
      q = query(
        q,
        where("employmentType", "array-contains", filters.employmentType)
      );
    }

    if (filters.technology) {
      q = query(q, where("technologies", "array-contains", filters.technology));
    }

    if (filters.salaryFrom !== undefined) {
      q = query(q, where("salaryFrom", ">=", filters.salaryFrom));
    }

    if (filters.salaryTo !== undefined) {
      q = query(q, where("salaryTo", "<=", filters.salaryTo));
    }

    const snapshot = await getDocs(q);

    const results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Job[];
    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getJobById = async (id: string): Promise<Job | null> => {
  try {
    const jobDoc = doc(db, "jobs", id);
    const snapshot = await getDoc(jobDoc);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Job;
    }
    return null;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return null;
  }
};

export const addJob = async (job: Omit<Job, "id">): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, "jobs"), job);
    return docRef.id;
  } catch (error) {
    console.error("Error adding job:", error);
    return null;
  }
};

export const updateJob = async (
  id: string,
  updatedJob: Partial<Job>
): Promise<boolean> => {
  try {
    const jobDoc = doc(db, "jobs", id);
    await updateDoc(jobDoc, updatedJob);
    return true;
  } catch (error) {
    console.error("Error updating job:", error);
    return false;
  }
};

export const deleteJob = async (id: string): Promise<boolean> => {
  try {
    const jobDoc = doc(db, "jobs", id);
    await deleteDoc(jobDoc);
    return true;
  } catch (error) {
    console.error("Error deleting job:", error);
    return false;
  }
};
