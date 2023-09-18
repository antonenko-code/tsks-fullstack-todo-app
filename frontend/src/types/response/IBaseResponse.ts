import { IUser } from '../IUser';

export interface IBaseResponse<T> {
  success: boolean,
  message: string,
  errors?: T,
}

