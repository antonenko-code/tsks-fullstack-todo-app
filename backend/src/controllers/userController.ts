import { NextFunction, Request, Response } from 'express';
import userService from '../service/userService';

class userController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const users = await userService.getUser(userId);

    return res.json(users);
  }
}

export default new userController();
