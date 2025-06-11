import { setUser } from '../../../features/user/userSlice';
import { auth } from '../../../services/firebse-config';
import type { FormInstance, FormProps } from 'antd';
import type { FieldType } from '../types';
import {
  setPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';

type SignInDependencies = {
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
  }: SignInDependencies): FormProps<FieldType>['onFinish'] =>
  async (values) => {
    const { email, password, remember, firstName, lastName } = values;
    setLoading(true);

    try {
      const persistenceType = remember
        ? browserLocalPersistence
        : inMemoryPersistence;

      await setPersistence(auth, persistenceType);

      const userCredential = await signInWithEmailAndPassword(
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

      dispatch(setUser(userData));
      setLoading(false);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        form.setFieldsValue({ password: '' });
        setLoading(false);
      } else {
        setError('An unknown error occurred');
        form.setFieldsValue({ password: '' });
        setLoading(false);
      }
    }
  };
