import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { User } from '@/types/user';

interface AuthRouteProps {
  allowedRoles: string[];
}

export const ROLES = {
  User: 'User',
  Admin: 'Admin',
};

export const AuthRoute: React.FC<AuthRouteProps> = ({ allowedRoles }) => {
  let user: User | null = useSelector((state: RootState) => state.auth.user);

  const location = useLocation();
  return user && user.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user && user?.isAuthenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
