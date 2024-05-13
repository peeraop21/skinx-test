import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Exception } from '../types/exception.type';

export const validateDto = async (dto: any, req: Request, res: Response) => {
    const resultDto = plainToClass(dto, req.body);

    const errors = await validate(resultDto);
    if (errors.length > 0) {
        const errorsResponse = errors.map((error) => { return { property: error.property, detail: error.constraints } });
        throw new Exception('Bad request', 400, errorsResponse);
    }
}

