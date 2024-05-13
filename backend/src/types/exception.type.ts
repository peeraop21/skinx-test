export class Exception extends Error {
    status: number;
    error: any;

    constructor(message: string, status: number, error: any = null) {
        super(message);
        this.status = status!;
        this.error = error;
    };
}