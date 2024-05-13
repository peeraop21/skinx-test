export interface User {
    username: string | null;
    roles: string[] | null;
    isAuthenticated: boolean;
}