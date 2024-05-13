import { request } from '../utils/api';
import { Post } from '@/types/post';


export class GetAllPostsResponse {
    posts!: Post[]
}
export class GetPostResponse {
    post!: Post
}
export const getPosts = async (): Promise<Post[] | null> => {
    const response = await request('GET', '/api/posts', null);
    if (response && response.status === 200) {
        const result = response?.data as GetAllPostsResponse;
        return result.posts;
    } else {
        throw new Error(response?.data?.message);
    }
};


export const getPost = async (id: number): Promise<Post | null> => {
    const response = await request('GET', '/api/posts/' + id, null);
    if (response && response.status === 200) {
        const result = response?.data as GetPostResponse;
        return result.post;
    } else {
        throw new Error(response?.data?.message);
    }
};