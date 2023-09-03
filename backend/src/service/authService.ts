import UserModel, { UserDocument } from '../models/user-model';
import AuthError from '../errors/authError';
import bcrypt from 'bcryptjs';
import AuthUserDto from '../dtos/authUserDto';
import TokenService from './tokenService';

class AuthService {
  async login(email: string, password: string) {
    const user: UserDocument | null = await UserModel.findOne({email})

    if (!user) {
      throw new AuthError('User does not exist');
    }

    if (!user.isActivated) {
      throw new AuthError('The user profile is not activated')
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
}

export default new AuthService();
