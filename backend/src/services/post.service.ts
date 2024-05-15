
import { IPostService } from './interfaces/post.interface.service';
import { IPostRepository } from '../repositories/interfaces/post.interface.repository';
import { Post } from '../entities/post.entity';
import { PostQueryResult } from '../types/query.post.type';

export class PostService implements IPostService {
    private postRepository: IPostRepository;

    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    async getPosts(page: number, limit: number, keywords: string | null, tags: string[] | null, sortBy: string | null, sortOrder: "ASC" | "DESC"): Promise<PostQueryResult> {
        return await this.postRepository.getPosts(page, limit, keywords, tags, sortBy, sortOrder);
    }

    async getPostById(id: number): Promise<Post> {
        return await this.postRepository.getPostById(id);
    }

    // async createPost(title: string, content: string, username: string): Promise<void> {
    //     await this.postRepository.createPost({ title, content, createdBy: username } as Post);
    // }

    // async createPosts(posts: Post[], username: string): Promise<void> {
    //     posts.forEach(post => post.createdBy = username);
    //     await this.postRepository.createPosts(posts);
    // }

    // async updatePost(id: number, title: string, content: string, username: string): Promise<void> {
    //     await this.postRepository.updatePost(id, title, content, username);
    // }

    // async deletePost(id: number): Promise<void> {
    //     await this.postRepository.deletePost(id);
    // }


    async getTags(): Promise<string[]> {
        return await this.postRepository.getTags();
    }


}