import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import authService from '../service/authService';

class authController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw { errors: errors.array() }
      }

      await authService.createNewUser(req.body);

      return res.json({message: 'Registration was successful'});
    } catch (e: any) {
      res.status(400).json({
        message: 'Registration failed',
        errors: e.errors
      })
    }
  }

  async login(req: Request, res: Response) {
    try {

    } catch (e) {
      console.error(e);
      res.status(400).json({message: 'Login failed'})
    }
  }
}

export default new authController();
