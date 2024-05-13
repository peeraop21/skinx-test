import { IsNotEmpty, IsString, IsEmail, Length, IsNumber } from 'class-validator'
import { User } from '../../entities/user.entity'

export class LoginDtoRequest {
    @IsNotEmpty()
    @IsString()
    username!: string

    @IsNotEmpty()
    @IsString()
    password!: string
}

export class LoginDtoResponse {
    @IsNotEmpty()
    @IsString()
    token!: string
    message!: string
}


export class RegisterDtoRequest {
    @IsNotEmpty()
    @IsString()
    username!: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 20, { message: 'Passowrd has to be at between 8 and 20 chars' })
    password!: string
}

export class RegisterDtoResponse {
    token!: string
    message!: string
}