import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { Post } from '@/types/post';


interface PostState {
    posts: Post[]
    count: number
    error: string | null;
    tags: string[]
}



const initialState: PostState = {
    posts: [] as Post[],
    count: 0,
    error: null,
    tags: [] as string[],
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[] | null>) => {
            state.posts = action.payload as Post[] || null;
            state.error = null;
        },
        clearPosts: (state) => {
            state.posts = [] as Post[];
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
        setTagOptions: (state, action: PayloadAction<string[]>) => {
            state.tags = action.payload as string[];
        },



    },
});

export const { setPosts, clearPosts, setError, setCount, setTagOptions, } = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.posts;
export const selectCount = (state: RootState) => state.post.count;
export const selectTagOptions = (state: RootState) => state.post.tags;
export const selectError = (state: RootState) => state.post.error;

export default postSlice.reducer;