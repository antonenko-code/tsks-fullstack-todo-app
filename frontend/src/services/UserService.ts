import $api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../types/IUser';
import { IBaseResponse } from '../types/response/IBaseResponse';
import { IValidationError } from '../types/response/IValidationError';

export class UserService {
  static async getUser(): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/user`)
  }

  static async forgotPassword(email: string): Promise<AxiosResponse<IBaseResponse<IValidationError>>> {
    return $api.post<IBaseResponse<IValidationError>>(`/user/forgot-password`, {email})
  }

  static async resetPassword(password: string, token: string): Promise<AxiosResponse<IBaseResponse<IValidationError>>> {
    return $api.post<IBaseResponse<IValidationError>>(`/user/reset-password/${token}`, {password})
  }
}
