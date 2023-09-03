import { NextFunction, Request, Response } from 'express';
import userService from '../service/userService';
import { UserDocument } from '../models/user-model';

declare module 'express' {
  interface Request {
    user: UserDocument;
  }
}

class userController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;
    const user = await userService.getUser(userId);

    return res.json(user);
  }
}

export default new userController();
