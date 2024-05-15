import { Response } from 'express';
import { IAuthService } from '../services/interfaces/auth.interface.service';
import { LoginDtoRequest, LoginDtoResponse, RegisterDtoRequest, RegisterDtoResponse } from './dto/auth.dto';
import { validateDto } from '../utils/validate.util';
import { TypedBodyRequest } from '../types/request.type';
import { Exception } from '../types/exception.type';

export class AuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }


  async register(req: TypedBodyRequest<RegisterDtoRequest>, res: Response<RegisterDtoResponse | Exception>) {
    try {
      await validateDto(RegisterDtoRequest, req, res);
      const { username, password }: RegisterDtoRequest = req.body;
      const token = await this.authService.register(username, password);
      return res.json({ message: "Register Successfully.", token: token } as RegisterDtoResponse);
    } catch (error: any) {
      if (error instanceof Exception) return res.status(error.status).json({ message: error.message, error: error.error } as Exception);
      else return res.status(500).json({ message: error.message } as Exception);
    }
  }

  async login(req: TypedBodyRequest<LoginDtoRequest>, res: Response<LoginDtoResponse | Exception>) {
    try {
      await validateDto(LoginDtoRequest, req, res);
      const { username, password }: LoginDtoRequest = req.body;
      const token = await this.authService.login(username, password);
      return res.json({ token } as LoginDtoResponse);
    } catch (error: any) {
      if (error instanceof Exception) return res.status(error.status).json({ message: error.message, error: error.error } as Exception);
      else return res.status(500).json({ message: error.message } as Exception);
    }
  }
}