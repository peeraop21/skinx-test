import React from 'react';

import { Button, Layout } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { logout } from '@/services/authService';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '@/pages/authenticate/authSlice';

const { Header, Content, Footer } = Layout;
interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
    navigator('/login');
  };

  const isAuthenticatePage = location.pathname === '/login' || location.pathname === '/register';
  return !isAuthenticatePage ? (
    <Layout>
      <Header
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <Button className="float-right" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Content>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  ) : (
    <div>{children}</div>
  );
};

export default AppLayout;
