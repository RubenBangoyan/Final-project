// import { Button, Checkbox, Form, Input, Spin } from 'antd';
// import { useAppDispatch } from '../../app/hook';
// import { useNavigate } from 'react-router-dom';
// import { ROUTES } from '../../routes/paths';
// import { onFinish } from './signUpService';
// import type { FieldType } from './types';
// import { useState } from 'react';
// import './SignUp.css';

// const SignUp = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState<boolean>(false);

//   return (
//     <div className="sign-up-container">
//       <Form
//         form={form}
//         name="basic"
//         className="form"
//         autoComplete="off"
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         initialValues={{ remember: true }}
//         onFinish={onFinish({
//           setError,
//           dispatch,
//           navigate,
//           form,
//           loading,
//           setLoading,
//         })}
//         style={{
//           width: '100vw',
//           maxWidth: 670,
//           minWidth: 300,
//           boxSizing: 'border-box',
//           height: 520,
//         }}
//       >
//         <Form.Item<FieldType>
//           label="Email"
//           name="email"
//           rules={[
//             {
//               type: 'email',
//               required: true,
//               message: 'Please input your Email!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item<FieldType>
//           name="firstName"
//           label="First Name"
//           rules={[{ required: true, message: 'Please input your first name!' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item<FieldType>
//           name="lastName"
//           label="Last Name"
//           rules={[{ required: true, message: 'Please input your last name!' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item<FieldType>
//           name="password"
//           label="Password"
//           rules={[{ required: true, message: 'Please input your password!' }]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item<FieldType>
//           name="confirmPassword"
//           label="Confirm Password"
//           rules={[{ required: true, message: 'Please confirm your password!' }]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <div>
//           <h3 className="error" style={{ color: 'red' }}>
//             {error}
//           </h3>
//         </div>
//         <div className="login-redirect">
//           <span>Already have an account?</span>
//           <Button type="link" onClick={() => navigate(ROUTES.SIGN_IN_PATH)}>
//             Sign In
//           </Button>
//         </div>
//         <div className="submit-remember-container">
//           <Form.Item<FieldType> name="remember" valuePropName="checked">
//             <Checkbox className="remember">Remember me</Checkbox>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default SignUp;

import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useAppDispatch } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';
import { onFinish } from './signUpService';
import type { FieldType } from './types';
import { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="sign-up-container">
      <Spin spinning={loading}>
        <Form
          form={form}
          name="basic"
          className="form"
          autoComplete="off"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish({
            setError,
            dispatch,
            navigate,
            form,
            loading,
            setLoading,
          })}
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
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: 'Please input your last name!' },
            ]}
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
            rules={[
              { required: true, message: 'Please confirm your password!' },
            ]}
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
      </Spin>
    </div>
  );
};

export default SignUp;
