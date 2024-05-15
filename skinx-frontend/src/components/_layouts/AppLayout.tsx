import React from 'react';

import { Avatar, Button, Layout, Tooltip } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { logout } from '@/services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction, selectUser } from '@/pages/authenticate/authSlice';
import { getColorCodeFromText } from '@/utils/style';

const { Header, Content, Footer } = Layout;
interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const user = useSelector(selectUser);
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
          backgroundColor: 'rgb(192 205 180)',
          borderRadius: '0px 0px 10px 10px',
          boxShadow: '0px 5px 16px -10px'
        }}
      >
        <div className="float-left" style={{ left: '5%', position: 'absolute' }}>
          <strong className='text-xl'>SKINX_TEST</strong>
        </div>
        {user ? (
          <>
            <div style={{ margin: '0px 10px' }}>
              <Tooltip title={user.username} placement="top">
                <Avatar size={'large'} style={{ backgroundColor: getColorCodeFromText(user.username!), margin: '0px 10px' }}>
                  {user.username![0].toLocaleUpperCase()}
                </Avatar>
                <strong>{user.username}</strong>(<label className="text-xs">{user.roles}</label>)
              </Tooltip>
            </div>

            <Button className="float-right" icon={<LogoutOutlined />} onClick={handleLogout}></Button>
          </>
        ) : null}
      </Header>
      <Content className="app-centent">{children}</Content>
      <Footer style={{ textAlign: 'center' }}>SKINX_TEST ©{new Date().getFullYear()}</Footer>
    </Layout>
  ) : (
    <div>{children}</div>
  );
};

export default AppLayout;
