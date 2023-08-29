import jwt from 'jsonwebtoken';
import Token from '../models/token-model';

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
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
      return userData;
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
}

export default new TokenService();
