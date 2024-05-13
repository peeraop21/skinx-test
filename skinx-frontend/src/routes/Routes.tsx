// App.tsx
import React, { lazy } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { AuthRoute, ROLES } from '@/routes/AuthRoute';
import { Button, Result } from 'antd';

const LoginPage = lazy(() => import('@/pages/authenticate/login/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/authenticate/register/RegisterPage'));

const PostPage = lazy(() => import('@/pages/post/PostPage'));

const AppRoutes: React.FC = () => {
  const navigator = useNavigate();
  const backToHomePage = () => {
    navigator('/');
  };
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<AuthRoute allowedRoles={[ROLES.User]} />}>
        <Route path="/" element={<PostPage />} />
      </Route>
      <Route
        path="/unauthorized"
        element={
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Button type="primary" onClick={backToHomePage}>
                Back Home
              </Button>
            }
          />
        }
      />
      <Route
        path="*"
        element={
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button type="primary" onClick={backToHomePage}>
                Back Home
              </Button>
            }
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
