import $api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../types/IUser';
import { IBaseResponse } from '../types/response/IBaseResponse';
import { IValidationError } from '../types/response/IValidationError';
import { IRequestUserData } from '../types/request/IRequestUserData';

export class UserService {
  static async getUser(): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/user`)
  }

  static async updateName(userData: Partial<IRequestUserData>): Promise<AxiosResponse<IUser>> {
    return $api.patch<IUser>('/user', userData )
  }

  static async updateEmail(userData: Partial<IRequestUserData>): Promise<AxiosResponse<IUser>> {
    return $api.patch<IUser>('/user/email', userData)
  }
  static async updatePassword(userData: Partial<IRequestUserData>): Promise<AxiosResponse<IUser>> {
    return $api.patch<IUser>('/user/password', userData )
  }

  static async forgotPassword(email: string): Promise<AxiosResponse<IBaseResponse<IValidationError>>> {
    return $api.post<IBaseResponse<IValidationError>>(`/user/forgot-password`, {email})
  }

  static async resetPassword(password: string, token: string): Promise<AxiosResponse<IBaseResponse<IValidationError>>> {
    return $api.post<IBaseResponse<IValidationError>>(`/user/reset-password/${token}`, {password})
  }
}
