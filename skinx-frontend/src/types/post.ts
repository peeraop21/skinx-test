export interface Post {
    id: number;
    title: string | null;
    content: string;
    createdAt: string | null;
    createdBy: string | null;
    tags: string[] | null;
}
