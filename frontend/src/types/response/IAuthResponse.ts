import { IBaseResponse } from './IBaseResponse';
import { IValidationError } from './IValidationError';
import { IUser } from '../IUser';

export interface IAuthResponse extends IBaseResponse<IValidationError[]> {
  accessToken: string,
  refreshToken: string,
  user: IUser,
}
