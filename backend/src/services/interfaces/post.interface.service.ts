import { Post } from "../../entities/post.entity";

export interface IPostService {
    getAllPosts(): Promise<Post[]>;
    getPostById(id: number): Promise<Post>;
    createPost(title: string, content: string, username: string): Promise<void>;
    createPosts(posts: Post[], username: string): Promise<void>
    updatePost(id: number, title: string, content: string, username: string): Promise<void>;
    deletePost(id: number): Promise<void>;
}