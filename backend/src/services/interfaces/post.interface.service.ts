import { Post } from "../../entities/post.entity";
import { PostQueryResult } from "../../types/query.post.type";

export interface IPostService {
    getPosts(page: number, limit: number, keywords: string | null, tags: string[] | null, sortBy: string | null, sortOrder: "ASC" | "DESC"): Promise<PostQueryResult>;
    getPostById(id: number): Promise<Post>;
    // createPost(title: string, content: string, username: string): Promise<void>;
    // createPosts(posts: Post[], username: string): Promise<void>
    // updatePost(id: number, title: string, content: string, username: string): Promise<void>;
    // deletePost(id: number): Promise<void>;
    getTags(): Promise<string[]>;
}