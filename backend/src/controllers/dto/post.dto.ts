import { IsNotEmpty, IsString, IsEmail, Length, IsNumber, IsArray } from 'class-validator'
import { Post } from '../../entities/post.entity'

/// Get Post
export class GetPostDtoResponse {
    post!: Post
}



/// Get All Tags
export class GetAllTagsDtoResponse {
    tags!: string[]
}



/// Get All Posts
export class GetPostsDtoRequest {

    @IsNumber()
    @IsNotEmpty()
    page!: number

    @IsNumber()
    @IsNotEmpty()
    limit!: number

    keywords!: string | null

    tags!: string[] | null

    sortBy!: string | null

    sortOrder!: "ASC" | "DESC"
}

export class GetPostsDtoResponse {
    posts!: Post[]
    count!: number
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



