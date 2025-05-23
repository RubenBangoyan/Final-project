import {
  setPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../services/firebse-config/index';
import { Button, Checkbox, Form, Input } from 'antd';
import { setUser } from '../../features/user/userSlice';
import { useAppDispatch } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';
import type { FormProps } from 'antd';
import { useState } from 'react';
import './SignUp.css';
import { db } from '../../services/firebse-config/index';
import { collection, setDoc, doc } from 'firebase/firestore';

type FieldType = {
  email: string;
  lastName: string;
  password: string;
  remember: boolean;
  firstName: string;
  confirmPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { password, confirmPassword, email, remember, firstName, lastName } =
      values;

    if (password !== confirmPassword) {
      setError("Passwords didn't match.");
      return;
    }

    try {
      const persistenceType = remember
        ? browserLocalPersistence
        : inMemoryPersistence;

      await setPersistence(auth, persistenceType);

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
      };

      await setDoc(doc(db, 'users', user.uid), {
        email,
        firstName,
        lastName,
      });

      dispatch(setUser(userData));
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        form.setFieldsValue({ password: '', confirmPassword: '' });
      }
      console.log(error);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="sign-up-container">
      <Form
        className="form"
        form={form}
        name="basic"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          width: '100vw',
          maxWidth: 670,
          minWidth: 300,
          boxSizing: 'border-box',
          height: 520,
        }}
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="confirmPassword"
          label="Confirm Password"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <div>
          <h3 className="error" style={{ color: 'red' }}>
            {error}
          </h3>
        </div>
        <div className="login-redirect">
          <span>Already have an account?</span>
          <Button type="link" onClick={() => navigate(ROUTES.SIGN_IN_PATH)}>
            Sign In
          </Button>
        </div>
        <div className="submit-remember-container">
          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox className="remember">Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
