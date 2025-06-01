import { auth, db } from '../../../services/firebse-config';
import { setUser } from '../../../features/user/userSlice';
import { setDoc, doc } from 'firebase/firestore';
import type { FieldType } from '../types';
import type { FormProps } from 'antd';
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
} from 'firebase/auth';
import type { FormInstance } from 'antd';

type SignUpDependencies = {
  dispatch: any;
  form: FormInstance;
  setError: (msg: string) => void;
  navigate: (path: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const onFinish =
  ({
    setError,
    dispatch,
    navigate,
    form,
    setLoading,
  }: SignUpDependencies): FormProps<FieldType>['onFinish'] =>
  async (values) => {
    const { email, password, confirmPassword, remember, firstName, lastName } =
      values;
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords didn't match.");
      form.setFieldsValue({ password: '', confirmPassword: '' });
      setLoading(false);
      return;
    }

    try {
      const persistence = remember
        ? browserLocalPersistence
        : inMemoryPersistence;
      await setPersistence(auth, persistence);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      const userData = {
        email: user.email || '',
        token,
        id: user.uid,
        name: firstName,
        surname: lastName,
      };

      await setDoc(doc(db, 'users', user.uid), {
        email,
        firstName,
        lastName,
      });

      navigate('/');
      dispatch(setUser(userData));
      setLoading(false);
    } catch (error: any) {
      setError(error.message || 'Something went wrong.');
      console.log(form, 'form');
      form.setFieldsValue({ password: '', confirmPassword: '' });
      setLoading(false);
    }
  };
