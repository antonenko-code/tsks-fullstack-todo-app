import $api from '../http';
import { AxiosResponse } from 'axios';
import { IBaseResponse } from '../types/response/IBaseResponse';
import { IAuthData } from '../types/response/IAuthData';
import { IValidationError } from '../types/response/IValidationError';
import { RequestRegistrationData } from '../types/request/IRequestRegistrationData';

export class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<IBaseResponse<IAuthData, IValidationError[]>>> {
    return $api.post<IBaseResponse<IAuthData, IValidationError[]>>('/auth/login', {email, password})
  }

  static async registration(data: RequestRegistrationData): Promise<AxiosResponse<IBaseResponse<IAuthData, IValidationError[]>>> {
    return $api.post<IBaseResponse<IAuthData, IValidationError[]>>('/auth/registration', data)
  }
}
