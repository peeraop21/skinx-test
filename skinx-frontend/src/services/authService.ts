import { User } from '@/types/user';
import { request } from '../utils/api';
import { jwtDecode } from 'jwt-decode'
import { AuthPayload } from '@/types/authpayload.type';


export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}


export interface RegisterData {
  username: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: User | null;
}

export const login = async (loginData: LoginData): Promise<User | null> => {
  const response = await request('POST', '/api/login', loginData);
  if (response && response.status === 200) {
    const result = response?.data as LoginResponse;
    localStorage.setItem('tk', result?.token)
    return generateAuth();
  } else {
    throw new Error(response?.data?.message);
  }
};

export const register = async (registerData: RegisterData): Promise<User | null> => {
  const response = await request('POST', '/api/register', registerData);
  if (response && response.status === 200) {
    const result = response?.data as RegisterResponse;
    localStorage.setItem('tk', result?.token)
    return generateAuth();
  } else {
    throw new Error(response?.data?.message);
  }
}

export const logout = () => {
  localStorage.removeItem('tk')
  return;
}

export function generateAuth(): User | null {
  const token = localStorage.getItem('tk')
  if (token) {
    let decoded = jwtDecode<AuthPayload>(token)
    const data: User = {
      username: decoded.username,
      roles: decoded.roles,
      isAuthenticated: true,
    }
    return data
  } else {
    return null
  }
}

