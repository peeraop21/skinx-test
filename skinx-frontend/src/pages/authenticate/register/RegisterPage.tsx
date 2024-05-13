import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerFailure, registerRequest, registerSuccess, selectIsLoading, selectUser } from '../authSlice';
import { RegisterData, register as authServiceRegister } from '@/services/authService';
import { Button, Card, Form, FormProps, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './RegisterPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '@/types/user';
type FieldType = {
  username?: string | null;
  password?: string | null;
};

const RegisterPage: React.FC = () => {
  const user: User | null = useSelector(selectUser);

  const [formState, setFormState] = useState<FieldType | null>({
    username: null,
    password: null,
  });

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const navigator = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const handleRegisterAsync = async () => {
    console.log('formState:', formState);
    try {
      dispatch(registerRequest());
      const user = await authServiceRegister({ username: formState?.username, password: formState?.password } as RegisterData);
      dispatch(registerSuccess(user!));
      navigator('/');
    } catch (error: any) {
      console.error('Register failed:', error);
      dispatch(registerFailure(error.message));
      messageApi.open({
        type: 'error',
        content: error.response.data.message,
      });
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);

    await handleRegisterAsync();
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
      <Card title="Register" bordered={false} style={{ width: 300, alignItems: 'center' }}>
        <Form name="normal_register" className="register-form" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              {
                min: 8,
                message: 'Password must be at least 8 characters',
              },
            ]}
          >
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
          <Form.Item
            name="passwordComfirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" className={styles.register_form_button}>
              register
            </Button>
            <Link to="/login">back to login</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
