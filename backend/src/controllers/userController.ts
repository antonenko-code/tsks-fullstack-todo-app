import { Request, Response, NextFunction } from 'express';
import userService from '../service/userService';
import { UserDocument } from '../models/user-model';
import ExceptionHandler from '../decorators/exceptionHandler';
import MailService from '../service/mailService';
import TokenService from '../service/tokenService';
import ResponseError from '../errors/responseError';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express' {
  export interface Request {
    user?: UserDocument;
  }
}

class userController {

  @ExceptionHandler()
  async getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id;
    const user = await userService.getUser(userId);

    return res.json(user);
  }

  @ExceptionHandler()
  async requestPasswordReset(req: Request, res: Response) {
    const { email } = req.body;
    const resetToken = await userService.generateResetToken(email);
    const resetLink = `${process.env.SERVER_URL}/user/reset-password/${resetToken}`;
    await MailService.sendResetMail(email, resetLink);

    res.json({
      success: true,
      message: 'Password reset link sent to your email account'
    })
  }

  @ExceptionHandler()
  async verifyResetPasswordLink(req: Request, res: Response) {
    const { token } = req.params;
    const userData = TokenService.verifyResetToken(token)

    if (!userData) {
      return res.redirect(`${process.env.CLIENT_URL}/invalid-link/${token}`)
    }

    res.redirect(`${process.env.CLIENT_URL}/user/reset-password/${token}`)
  }

  @ExceptionHandler()
  async resetPassword(req: Request, res: Response) {
    const { token } = req.params;
    const { password } = req.body;

    const userData = TokenService.verifyResetToken(token) as JwtPayload

    if (!userData) {
      throw new ResponseError('Action is not available');
    }

    await userService.resetPassword(userData.userId, password)
    res.json({
      success: true,
      message: 'Password reset successful',
    })
  }
}

export default new userController();
