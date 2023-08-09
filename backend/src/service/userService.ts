import UserModel, { UserDocument } from '../models/user-model';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import MailService from './mailService';
import UserDto from '../dtos/userDto';

type RequestBody = {
  firstName: string,
  secondName: string,
  email: string,
  password: string,
}

class UserService {
  async createNewUser(request: RequestBody) {
    const { firstName, secondName, email, password} = request;
    const hashPassword = bcrypt.hashSync(password, 7);
    const activationLink = v4();

    const user = new UserModel({firstName, secondName, email, password: hashPassword, activationLink});
    await user.save();

    await MailService.sendActivationMail(email, `${process.env.APP_URL}/auth/activate/${activationLink}`);

    const userDto = new UserDto(user)

    return {user: userDto}
  }

  async activate(activationLink: string) {
    const user: UserDocument | null = await UserModel.findOne({activationLink});

    if (!user) {
      throw new Error('Invalid activation link')
    }

    user.isActivated = true;
    await user.save();
  }
}

export default new UserService();
