import { Request, Response } from 'express';

import { IPostService } from "../services/interfaces/post.interface.service";
import { Exception } from "../types/exception.type";
import {
    // CreatePostDtoRequest, CreatePostDtoResponse, CreatePostsByJsonFileDtoRequest, CreatePostsByJsonFileDtoResponse, DeletePostDtoResponse, UpdatePostDtoRequest, UpdatePostDtoResponse,
    GetPostsDtoRequest, GetPostsDtoResponse, GetAllTagsDtoResponse,
} from "./dto/post.dto";
import { TypedBodyRequest } from '../types/request.type';
// import { validateDto } from '../utils/validate.util';
// import { decodeToken } from '../utils/jwt.util';
// import { Post } from '../entities/post.entity';


export class PostController {
    private postService: IPostService;
    constructor(postService: IPostService) {
        this.postService = postService;
    }

    async getPost(req: Request, res: Response) {
        try {
            const post = await this.postService.getPostById(parseInt(req.params.id));

            return res.json({ post });
        } catch (error: any) {
            if (error instanceof Exception) return res.status(error.status).json({ message: error.message, error: error.error } as Exception);
            else return res.status(500).json({ message: error.message } as Exception);
        }
    }

    async getTags(req: Request, res: Response<GetAllTagsDtoResponse | Exception>) {
        try {
            const tags = await this.postService.getTags();

            return res.json({ tags });
        } catch (error: any) {
            if (error instanceof Exception) return res.status(error.status).json({ message: error.message, error: error.error } as Exception);
            else return res.status(500).json({ message: error.message } as Exception);
        }
    }

    async getAllPosts(req: TypedBodyRequest<GetPostsDtoRequest>, res: Response<GetPostsDtoResponse | Exception>) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
            const keywords = req.query.keywords ? req.query.keywords.toString() : null;
            const tags = req.query.tags ? req.query.tags.toString().split(',') : null;
            const sortBy = req.query.sortBy ? req.query.sortBy.toString() : null;
            const sortOrder = req.query.sortOrder === 'DESC' || req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';
            const result = await this.postService.getPosts(page, limit, keywords, tags, sortBy, sortOrder);

            return res.json({ posts: result.posts, count: result.count } as GetPostsDtoResponse);
        } catch (error: any) {
            if (error instanceof Exception) return res.status(error.status).json({ message: error.message, error: error.error } as Exception);
            else return res.status(500).json({ message: error.message } as Exception);
        }
    }

    // async createPost(req: TypedBodyRequest<CreatePostDtoRequest>, res: Response<CreatePostDtoResponse | Exception>) {
    //     try {
    //         await validateDto(CreatePostDtoRequest, req, res);
    //         const authpayload = decodeToken(req.headers['authorization']?.toString() || '');
    //         const { title, content }: CreatePostDtoRequest = req.body;

    //         await this.postService.createPost(title, content, authpayload.username);

    //         return res.json({ message: 'Post created successfully' });
    //     } catch (error: any) {
    //         if (error instanceof Exception) return res.status(error.status).json({ message: error.message, error: error.error } as Exception);
    //         else return res.status(500).json({ message: error.message } as Exception);
    //     }
    // }

    // async createPostsByJsonFile(req: TypedBodyRequest<CreatePostsByJsonFileDtoRequest>, res: Response<CreatePostsByJsonFileDtoResponse | Exception>) {
    //     try {
    //         await validateDto(CreatePostDtoRequest, req, res);
    //         const authpayload = decodeToken(req.headers['authorization']?.toString() || '');

    //         const { base64String }: CreatePostsByJsonFileDtoRequest = req.body;
    //         let posts = JSON.parse(Buffer.from(base64String, 'base64').toString()) as Post[];

    //         await this.postService.createPosts(posts, authpayload.username);

    //         return res.json({ message: 'Post created successfully' });
    //     } catch (error: any) {
    //         if (error instanceof Exception) return res.status(error.status).json({ message: error.message, error: error.error } as Exception);
    //         else return res.status(500).json({ message: error.message } as Exception);
    //     }
    // }

    // async updatePost(req: TypedBodyRequest<UpdatePostDtoRequest>, res: Response<UpdatePostDtoResponse | Exception>) {
    //     try {
    //         await validateDto(UpdatePostDtoRequest, req, res);
    //         const authpayload = decodeToken(req.headers['authorization']?.toString() || '');
    //         const { title, content }: UpdatePostDtoRequest = req.body;

    //         await this.postService.updatePost(parseInt(req.params.id), title, content, authpayload.username);

    //         return res.json({ message: 'Post updated successfully' });
    //     } catch (error: any) {
    //         if (error instanceof Exception) return res.status(error.status).json({ message: error.message, error: error.error } as Exception);
    //         else return res.status(500).json({ message: error.message } as Exception);
    //     }
    // }

    // async deletePost(req: Request, res: Response<DeletePostDtoResponse | Exception>) {
    //     try {
    //         await this.postService.deletePost(parseInt(req.params.id));

    //         return res.json({ message: 'Post deleted successfully' });
    //     } catch (error: any) {
    //         if (error instanceof Exception) return res.status(error.status).json({ message: error.message, error: error.error } as Exception);
    //         else return res.status(500).json({ message: error.message } as Exception);
    //     }
    // }





}