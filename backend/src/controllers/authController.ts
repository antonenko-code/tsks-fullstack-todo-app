import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserService from '../service/userService';

class authController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw { errors: errors.array() }
      }

      const userData = await UserService.createNewUser(req.body);

      return res.json({
        success: true,
        message: 'Registration was successful',
        data: userData,
      });
    } catch (e: any) {
      console.error(e)
      res.status(400).json({
        success: false,
        message: 'Registration failed',
        errors: e.errors,
      })
    }
  }

  async login(req: Request, res: Response) {
    try {

    } catch (e) {

    }
  }

  async logout(req: Request, res: Response) {
    try {

    } catch (e) {

    }
  }

  async activate(req: Request, res: Response) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL as string)
    } catch (e) {
      console.error(e)
    }
  }

  async refresh(req: Request, res: Response) {
    try {

    } catch (e) {

    }
  }
}

export default new authController();
