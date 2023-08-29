import { NextFunction, Request, Response } from 'express';
import userService from '../service/userService';

class userController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    const users = await userService.getUsers();

    return res.json(users);
  }
}

export default new userController();
