import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginRequest, loginSuccess, selectUser } from '../authSlice';
import { LoginData, login as authServiceLogin } from '@/services/authService';
import { Button, Card, Checkbox, Form, FormProps, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '@/types/user';
type FieldType = {
  username?: string | null;
  password?: string | null;
  remember?: string | null;
};

const LoginPage: React.FC = () => {
  const user: User | null = useSelector(selectUser);

  const [formState, setFormState] = useState<FieldType | null>({
    username: null,
    password: null,
    remember: null,
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const handleLoginAsync = async () => {
    try {
      dispatch(loginRequest());
      const user = await authServiceLogin({ username: formState?.username, password: formState?.password } as LoginData);
      dispatch(loginSuccess(user!));
      setLoading(false);
      navigator('/');
    } catch (error: any) {
      setLoading(false);
      console.error('Login failed:', error);
      dispatch(loginFailure(error.response.data.message));
      messageApi.open({
        type: 'error',
        content: error.response.data.message,
      });
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    setLoading(true);
    await handleLoginAsync();
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    console.log(user);
    if (user && user.isAuthenticated) navigator('/');
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen">
      {contextHolder}
      <Card title="Login" bordered={false} style={{ width: 300, alignItems: 'center' }}>
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) =>
                setFormState((prev) => {
                  return { ...prev, username: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormState((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className={styles.login_form_forgot} href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className={styles.login_form_button}>
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
