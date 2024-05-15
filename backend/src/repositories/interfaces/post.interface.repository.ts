import { Repository } from "typeorm";
import { Post } from "../../entities/post.entity";
import { PostQueryResult } from "../../types/query.post.type";

export interface IPostRepository extends Repository<Post> {
    getPosts(page: number, limit: number, keywords: string | null, tags: string[] | null, sortBy: string | null, sortOrder: "ASC" | "DESC"): Promise<PostQueryResult>
    getPostById(id: number): Promise<Post>
    // createPost(post: Post): Promise<void>
    // createPosts(posts: Post[]): Promise<void>
    // updatePost(id: number, title: string, content: string, username: string): Promise<void>
    // deletePost(id: number): Promise<void>
    getTags(): Promise<string[]>
}