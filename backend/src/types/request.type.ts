import { Request } from "express";

export interface TypedBodyRequest<U> extends Request {
    body: U;
}