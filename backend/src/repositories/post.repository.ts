import { EntityManager, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { IPostRepository } from './interfaces/post.interface.repository';
import { Exception } from '../types/exception.type';

export class PostRepository extends Repository<Post> implements IPostRepository {
    constructor(manager: EntityManager) {
        super(Post, manager);
    }
    async getAllPosts(): Promise<Post[]> {
        return await this.find();
    }

    async getPostById(id: number): Promise<Post> {
        const post = await this.findOneBy({ id });
        if (!post) throw new Exception('Post not found', 403);
        return post;
    }

    async createPost(post: Post): Promise<void> {
        await this.save(post);
    }

    async createPosts(posts: Post[]): Promise<void> {
        await this.save(posts);
    }
    
    async updatePost(id: number, title: string, content: string, username: string): Promise<void> {
        const post = await this.getPostById(id);
        post.title = title;
        post.content = content;
        post.updatedBy = username;
        await this.save(post);
    }

    async deletePost(id: number): Promise<void> {
        const post = await this.getPostById(id);
        await this.remove(post);
    }

}