import { IsNotEmpty, IsString, IsEmail, Length, IsNumber } from 'class-validator'
import { Post } from '../../entities/post.entity'

/// Get Post
export class GetPostDtoResponse {
    post!: Post
}

/// Get All Posts
export class GetAllPostsDtoResponse {
    posts!: Post[]
}

/// Create Post
export class CreatePostDtoRequest {
    @IsNotEmpty()
    @IsString()
    title!: string

    @IsNotEmpty()
    @IsString()
    content!: string
}
export class CreatePostDtoResponse {
    message!: string
}

/// Create Posts By Json File
export class CreatePostsByJsonFileDtoRequest {
    @IsNotEmpty()
    @IsString()
    base64String!: string
}
export class CreatePostsByJsonFileDtoResponse {
    message!: string
}

/// Update Post
export class UpdatePostDtoRequest {
    @IsNotEmpty()
    @IsNumber()
    id!: number

    @IsNotEmpty()
    @IsString()
    title!: string

    @IsNotEmpty()
    @IsString()
    content!: string
}
export class UpdatePostDtoResponse {
    message!: string
}

/// Delete Post
export class DeletePostDtoResponse {
    message!: string
}



