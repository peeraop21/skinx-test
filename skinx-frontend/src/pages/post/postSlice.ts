import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { Post } from '@/types/post';


interface PostState {
    posts: Post[] | null;
    error: string | null;
}



const initialState: PostState = {
    posts: null,
    error: null
};

const authSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload as Post[];
            state.error = null;
        },

        clearPosts: (state) => {
            state.posts = null;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

    },
});

export const { setPosts, clearPosts, setError } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;