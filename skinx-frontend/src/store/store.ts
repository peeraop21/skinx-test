import { configureStore } from '@reduxjs/toolkit';
import authReducer, { initialAuth } from '@/pages/authenticate/authSlice';
import postReducer from '@/pages/post/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});
store.dispatch(initialAuth()); // Use the action creator
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
