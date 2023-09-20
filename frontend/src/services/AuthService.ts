import $api from '../http';
import { AxiosResponse } from 'axios';
import { IBaseResponse } from '../types/response/IBaseResponse';
import { IValidationError } from '../types/response/IValidationError';
import { RequestRegistrationData } from '../types/request/IRequestRegistrationData';
import { IRequestLoginData } from '../types/request/IRequestLoginData';
import { IAuthResponse } from '../types/response/IAuthResponse';

export class AuthService {
  static async login(credentials: IRequestLoginData): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/auth/login', credentials)
  }

  static async registration(credentials: RequestRegistrationData): Promise<AxiosResponse<IBaseResponse<IValidationError[]>>> {
    return $api.post<IBaseResponse<IValidationError[]>>('/auth/registration', credentials)
  }

  static async logout(refreshToken: string): Promise<AxiosResponse<IBaseResponse<any>>> {
    return $api.post<IBaseResponse<any>>('/auth/logout', {refreshToken});
  }
}
