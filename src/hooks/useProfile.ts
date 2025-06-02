import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebse-config';
import { useState, useEffect } from 'react';
import { message } from 'antd';

export const useProfile = () => {
  const [profile, setProfile] = useState<{
    firstName?: string;
    lastName?: string;
    avatarSeed?: string;
    joinDate?: string;
    lastLogin?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            firstName: data.firstName,
            lastName: data.lastName,
            avatarSeed: data.avatarSeed,
            joinDate: data.joinDate || new Date().toISOString(),
            lastLogin: data.lastLogin || new Date().toISOString(),
          });
        } else {
          console.log('No user profile found!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        message.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleSave = async (values: any) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        firstName: values.firstName,
        lastName: values.lastName,
        avatarSeed: values.avatarSeed,
      });

      setProfile((prev) => ({
        ...prev,
        firstName: values.firstName,
        lastName: values.lastName,
        avatarSeed: values.avatarSeed,
      }));

      message.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile');
    }
  };

  return { profile, loading, handleSave };
};
