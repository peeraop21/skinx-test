import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { User } from '@/types/user';
import { generateAuth } from '@/services/authService';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}



const initialState: AuthState = {
  user: {
    username: null,
    roles: null,
    isAuthenticated: false,
  },
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload as User;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.user = null;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
    },
    registerRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload as User;
      state.isLoading = false;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.user = null;
      state.isLoading = false;
    },
    initialAuth: (state) => {
      state.user = generateAuth();
      state.error = null;
    }



  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, registerRequest, registerSuccess, registerFailure, initialAuth } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;