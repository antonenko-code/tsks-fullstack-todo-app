import UserModel, { UserDocument } from '../models/user-model';
import AuthError from '../errors/authError';
import bcrypt from 'bcryptjs';
import AuthUserDto from '../dtos/authUserDto';
import TokenService from './tokenService';
import tokenService from './tokenService';
import userModel from '../models/user-model';

interface JwtPayload {
  email: string;
  id: string;
}

class AuthService {
  async login(email: string, password: string) {
    const user: UserDocument | null = await UserModel.findOne({email})

    if (!user) {
      throw new AuthError('User does not exist');
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      throw new AuthError('Invalid password')
    }

    const userDto = new AuthUserDto(user)
    const tokens = TokenService.generateTokens({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto}
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new AuthError('User is not authorized')
    }

    const userData = tokenService.validateRefreshToken(refreshToken) as JwtPayload;
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new AuthError('User is not authorized')
    }

    const user = await userModel.findById(userData.id)
    const userDto = new AuthUserDto(user)
    const tokens = TokenService.generateTokens({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto}
  }

  async logout(refreshToken: string) {
    return tokenService.removeToken(refreshToken);
  }
}

export default new AuthService();
