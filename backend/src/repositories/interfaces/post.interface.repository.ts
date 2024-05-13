import { Repository } from "typeorm";
import { Post } from "../../entities/post.entity";

export interface IPostRepository extends Repository<Post> {
    getAllPosts(): Promise<Post[]>
    getPostById(id: number): Promise<Post>
    createPost(post: Post): Promise<void>
    createPosts(posts: Post[]): Promise<void>
    updatePost(id: number, title: string, content: string, username: string): Promise<void>
    deletePost(id: number): Promise<void>
}