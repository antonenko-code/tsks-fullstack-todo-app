import User from '../models/user-model';
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

    const user = new User({firstName, secondName, email, password: hashPassword, activationLink});
    await user.save();

    await MailService.sendActivationMail(email, `${process.env.APP_URL}/auth/activate/${activationLink}`);

    const userDto = new UserDto(user)

    return {user: userDto}
  }
}

export default new UserService();
