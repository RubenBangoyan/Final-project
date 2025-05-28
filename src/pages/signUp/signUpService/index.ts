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

type SignUpDependencies = {
  setError: (msg: string) => void;
  dispatch: any;
  navigate: (path: string) => void;
  form: any;
};

export const onFinish =
  ({
    setError,
    dispatch,
    navigate,
    form,
  }: SignUpDependencies): FormProps<FieldType>['onFinish'] =>
  async (values) => {
    const { email, password, confirmPassword, remember, firstName, lastName } =
      values;

    console.log(firstName, lastName);

    if (password !== confirmPassword) {
      setError("Passwords didn't match.");
      form.setFieldsValue({ password: '', confirmPassword: '' });
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

      dispatch(setUser(userData));
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Something went wrong.');
      console.log(form, 'form');
      form.setFieldsValue({ password: '', confirmPassword: '' });
    }
  };
