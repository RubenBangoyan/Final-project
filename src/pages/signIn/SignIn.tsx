import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebse-config";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import type { FormProps } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../app/hook";
import { setUser } from "../../features/user/userSlice";
import "./SignIn.css";
import { ROUTES } from "../../routes/paths";
// import { StorageService } from "../../services/StorageService";
// import { AUTHENTIFICATION_STORAGE_KEY } from "../../constants/storageKeys";

type FieldType = {
  email: string;
  password: string;
  remember: boolean;
};

const SignIn = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { email, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      dispatch(
        setUser({
          email: user.email || "",
          token,
          id: user.uid,
        })
      );

      navigate(ROUTES.HOME_PATH);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        form.setFieldsValue({ password: "" });
      } else {
        setError("An unknown error occurred");
        form.setFieldsValue({ password: "" });
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <div className="sign-in-container">
        <Form
          className="form"
          form={form}
          name="sign-in"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            width: "100vw",
            maxWidth: 550,
            minWidth: 280,
            boxSizing: "border-box",
            height: 340,
          }}
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <div>
            <h3 className="error" style={{ color: "red" }}>
              {error}
            </h3>
          </div>

          <div className="signup-redirect">
            <span>Don't have an account?</span>
            <Button type="link" onClick={() => navigate(ROUTES.SIGN_UP_PATH)}>
              Sign Up
            </Button>
          </div>

          <div className="submit-remember-container">
            <Form.Item<FieldType> name="remember" valuePropName="checked">
              <Checkbox className="remember">Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
