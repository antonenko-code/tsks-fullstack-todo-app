import { IUser } from '../IUser';

export interface IAuthData {
  accessToken: string,
  refreshToken: string,
  user: IUser,
}
