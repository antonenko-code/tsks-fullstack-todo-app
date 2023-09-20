import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserService from '../service/userService';
import ValidationError from '../errors/validationError';
import AuthService from '../service/authService';
import ExceptionHandler from '../decorators/exceptionHandler';
import authService from '../service/authService';

class authController {

  @ExceptionHandler()
  async registration(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }
    const userData = await UserService.createNewUser(req.body);

    return res.json({
      success: true,
      message: 'Registration was successful',
      ...userData,
    });
  }

  @ExceptionHandler()
  async login(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const {email, password} = req.body;
    const userData = await AuthService.login(email, password);


    return res.json({
      success: true,
      message: 'Login was successful',
      ...userData,
    });
  }

  @ExceptionHandler()
  async logout(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const token = await authService.logout(refreshToken);

    return res.json({
      success: true,
      message: 'Logout was successful',
      token,
    });
  }

  @ExceptionHandler()
  async activate(req: Request, res: Response) {
    const activationLink = req.params.link;
    await UserService.activate(activationLink);

    return res.redirect(process.env.CLIENT_URL as string)
  }

  @ExceptionHandler()
  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const userData = await AuthService.refresh(refreshToken);

    return res.json({
      success: true,
      message: 'Token updated successfully',
      ...userData,
    });
  }
}

export default new authController();
