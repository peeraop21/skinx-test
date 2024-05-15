import { Post } from "../entities/post.entity"

export interface PostQueryResult{
    posts: Post[] | null,
    count: number
}