import React, { createContext, useContext, useEffect, useState } from "react";
import { COLLECTION_NAMES } from "../constants/collectionNames";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebse-config";
import type { ReactNode } from "react";

type JobOffer = {
  id: string;
  [key: string]: any;
};

type JobSeeker = {
  id: string;
  [key: string]: any;
};

type FirebaseDataContextType = {
  jobOffers: JobOffer[];
  jobSeekers: JobSeeker[];
  loading: boolean;
  error: Error | null;
};

const FirebaseDataContext = createContext<FirebaseDataContextType | undefined>(
  undefined
);

export const FirebaseDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offersSnap, seekersSnap] = await Promise.all([
          getDocs(collection(db, COLLECTION_NAMES.offer)),
          getDocs(collection(db, COLLECTION_NAMES.look)),
        ]);

        const offers: JobOffer[] = offersSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const seekers: JobSeeker[] = seekersSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJobOffers(offers);
        setJobSeekers(seekers);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <FirebaseDataContext.Provider
      value={{ jobOffers, jobSeekers, loading, error }}
    >
      {children}
    </FirebaseDataContext.Provider>
  );
};

export const useFirebaseData = () => {
  const context = useContext(FirebaseDataContext);
  if (!context) {
    throw new Error(
      "useFirebaseData must be used within a FirebaseDataProvider"
    );
  }
  return context;
};
