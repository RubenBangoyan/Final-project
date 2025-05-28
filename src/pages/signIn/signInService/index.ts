import type { FieldType } from '../types';
import type { FormProps } from 'antd';
import {
  inMemoryPersistence,
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../../services/firebse-config';
import { setUser,updateProfile } from '../../../features/user/userSlice';
import { getUserProfileFromFirebase } from '../../../services/fetchUserProfile';


type SignInDependencies = {
  setError: (msg: string) => void;
  dispatch: any;
  navigate: (path: string) => void;
  form: any;
};

export const onFinish =
  ({ setError, dispatch, navigate, form }: SignInDependencies): FormProps<FieldType>['onFinish'] =>
  async (values) => {
    const { email, password, remember } = values;

    try {
      const persistenceType = remember
        ? browserLocalPersistence
        : inMemoryPersistence;

      await setPersistence(auth, persistenceType);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      const userData = {
        email: user.email || '',
        token,
        id: user.uid,
      };

      dispatch(setUser(userData));
      const profile = await getUserProfileFromFirebase(user.uid);
      if (profile) {
        dispatch(updateProfile(profile));
      }
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        form.setFieldsValue({ password: '' });
      } else {
        setError('An unknown error occurred');
        form.setFieldsValue({ password: '' });
      }
    }
  };
