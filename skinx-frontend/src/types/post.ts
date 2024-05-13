export interface Post {
    title: string | null;
    content: boolean;
    postedAt: string | null;
    postedBy: string | null;
    tags: string[] | null;
}
