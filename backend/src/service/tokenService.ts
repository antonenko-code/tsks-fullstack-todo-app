import jwt from 'jsonwebtoken';
import Token from '../models/token-model';
import tokenModel from '../models/token-model';

class TokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: '30m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '30d'});

    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({user: userId})

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    const token = new Token({user: userId, refreshToken});
    await token.save();

    return token;
  }

  async findToken(token: string) {
    return tokenModel.findOne({refreshToken: token});
  }

  async removeToken(refreshToken: string) {
    return tokenModel.deleteOne({refreshToken});
  }

  generateResetToken(userId: string) {
    return jwt.sign({userId}, process.env.JWT_RESET_SECRET as string, {expiresIn: '30m'});
  }

  verifyResetToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_RESET_SECRET as string);
    } catch (e) {
      return  null;
    }
  }
}

export default new TokenService();
