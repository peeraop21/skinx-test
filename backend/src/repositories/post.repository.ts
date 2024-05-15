import { EntityManager, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { IPostRepository } from './interfaces/post.interface.repository';
import { Exception } from '../types/exception.type';
import { PostQueryResult } from '../types/query.post.type';

export class PostRepository extends Repository<Post> implements IPostRepository {
    constructor(manager: EntityManager) {
        super(Post, manager);
    }
    async getPosts(page: number, limit: number, keywords: string | null, tags: string[] | null, sortBy: string | null = 'createdAt', sortOrder: "ASC" | "DESC"): Promise<PostQueryResult> {
        const skip = (page - 1) * limit;
        const take = limit;

        const queryBuilder = this.createQueryBuilder('post');

        if (keywords) {
            queryBuilder.where('post.title LIKE :keywords', { keywords: `%${keywords}%` });
        }

        if (tags) {
            queryBuilder.andWhere('post.tags @> :tags', { tags });            
        }
        const count = await queryBuilder.getCount();

        if (sortBy) {
            queryBuilder.orderBy(`post.${sortBy}`, sortOrder);
        }
        const rows = await queryBuilder.offset(skip).limit(take).getMany();

        return { posts: rows.length > 0 ? rows : null, count };
    }

    async getPostById(id: number): Promise<Post> {
        const post = await this.findOneBy({ id });
        if (!post) throw new Exception('Post not found', 403);
        return post;
    }

    // async createPost(post: Post): Promise<void> {
    //     await this.save(post);
    // }

    // async createPosts(posts: Post[]): Promise<void> {
    //     await this.save(posts);
    // }

    // async updatePost(id: number, title: string, content: string, username: string): Promise<void> {
    //     const post = await this.getPostById(id);
    //     post.title = title;
    //     post.content = content;
    //     post.updatedBy = username;
    //     await this.save(post);
    // }

    // async deletePost(id: number): Promise<void> {
    //     const post = await this.getPostById(id);
    //     await this.remove(post);
    // }

    async getTags(): Promise<string[]> {
        const posts = await this.find({ select: ['tags'] });
        const result = [...new Set(posts.filter(post => post.tags).map(post => post.tags.map(tag => tag.trim())).flat())];    
        return result;
    }

}