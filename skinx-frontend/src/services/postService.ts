import { request } from '../utils/api';
import { Post } from '@/types/post';


export interface GetPostsRequest {
    page: number
    limit: number
    keywords: string | null
    tags: string[] | null
    sortBy: string | null
    sortOrder: "ASC" | "DESC"
}
export interface GetPostsResponse {
    posts: Post[]
    count: number
}


export class GetPostResponse {
    post!: Post
}

export const getPosts = async (payload: GetPostsRequest): Promise<GetPostsResponse> => {
    const response = await request('GET', `/api/posts?page=${payload.page ?? ''}&limit=${payload.limit ?? ''}&sortBy=${payload.sortBy ?? ''}&sortOrder=${payload.sortOrder ?? "ASC"}&keywords=${payload.keywords ?? ''}&tags=${payload.tags ? payload.tags.join(',') : ''}`, null, true);
    if (response && response.status === 200) {
        const result = response?.data as GetPostsResponse;
        return result;
    } else {
        throw new Error(response?.data?.message);
    }
};


export const getPost = async (id: number): Promise<Post | null> => {
    const response = await request('GET', '/api/posts/' + id, null, true);
    if (response && response.status === 200) {
        const result = response?.data as GetPostResponse;
        return result.post;
    } else {
        throw new Error(response?.data?.message);
    }
};

export const getTags = async (): Promise<string[]> => {
    const response = await request('GET', '/api/tags', null, true);
    if (response && response.status === 200) {
        const result = response?.data.tags as string[];
        return result;
    } else {
        throw new Error(response?.data?.message);
    }
}