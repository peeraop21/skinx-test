
import express, { Router } from 'express';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './services/auth.service';
import { createConnection } from 'typeorm';
import { dataSourceOptions } from './config/db.config';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { authenticateToken } from './middlewares/auth.middleware';
import cors from "cors";
import { Post } from './entities/post.entity';
// import postsData from '../posts.json';


createConnection(dataSourceOptions).then(async (data) => {
    console.log('Connected to the database');
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json());
    app.use(cors());
    // Dependency Injection Auth
    const userRepository = new UserRepository(data.createEntityManager());
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    // Dependency Injection Post
    const postRepository = new PostRepository(data.createEntityManager());
    const postService = new PostService(postRepository);
    const postController = new PostController(postService);

    const router = express.Router();

    // Routes Auth
    router.post('/register', authController.register.bind(authController));
    router.post('/login', authController.login.bind(authController));


    // Routes Post
    router.get('/posts', authenticateToken, postController.getAllPosts.bind(postController));
    router.get('/posts/:id', authenticateToken, postController.getPost.bind(postController));
    // router.post('/post', authenticateToken, postController.createPost.bind(postController));
    // router.post('/posts/json', authenticateToken, postController.createPostsByJsonFile.bind(postController));
    // router.put('/posts/:id', authenticateToken, postController.updatePost.bind(postController));
    // router.delete('/posts/:id', authenticateToken, postController.deletePost.bind(postController));

    // Routes Tags
    router.get('/tags', authenticateToken, postController.getTags.bind(postController));


    app.use('/api', router);
    // app.get('/seed',async (req, res) => {

       
    //     // let data: Post[] = [];
    
    //     // if (Array.isArray(postsData)) {
    //     //     await Promise.all(
    //     //         postsData.map(async (postDataItem: any) => {
    //     //             const post = new Post();
    //     //             post.title = postDataItem.title;
    //     //             post.content = postDataItem.content;
    //     //             post.createdAt = postDataItem.postedAt;
    //     //             post.createdBy = postDataItem.postedBy
    //     //             post.tags = postDataItem.tags;
    //     //             data.push(post);
    //     //         }));
    //     //     await postRepository.save(data);
    
    //     // } else {
    //     //     console.error('Invalid JSON data format: expected an array.');
    //     // }
    
    //     // console.log('Data seeded successfully');
    //     res.send('Data seeded successfully');
    // })

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => console.log("TypeORM connection error: ", error));
