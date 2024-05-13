import { configureStore } from '@reduxjs/toolkit';
import authReducer, { initialAuth } from '@/pages/authenticate/authSlice'; // Import the action creator

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
store.dispatch(initialAuth()); // Use the action creator
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
