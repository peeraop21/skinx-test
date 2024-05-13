
import { IPostService } from './interfaces/post.interface.service';
import { IPostRepository } from '../repositories/interfaces/post.interface.repository';
import { Post } from '../entities/post.entity';

export class PostService implements IPostService {
    private postRepository: IPostRepository;

    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    async getAllPosts(): Promise<Post[]> {
        return await this.postRepository.getAllPosts();
    }

    async getPostById(id: number): Promise<Post> {
        return await this.postRepository.getPostById(id);
    }

    async createPost(title: string, content: string, username: string): Promise<void> {
        await this.postRepository.createPost({ title, content, createdBy: username } as Post);
    }

    async createPosts(posts : Post[], username: string): Promise<void> {
        posts.forEach(post => post.createdBy = username);
        await this.postRepository.createPosts(posts);
    }

    async updatePost(id: number, title: string, content: string, username: string): Promise<void> {
        await this.postRepository.updatePost(id, title, content, username);
    }

    async deletePost(id: number): Promise<void> {
        await this.postRepository.deletePost(id);
    }


}