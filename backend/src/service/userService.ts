import Transactional from "../transactions/transactional";
import UserModel, { UserDocument } from '../models/user-model';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import MailService from './mailService';
import AuthUserDto from '../dtos/authUserDto';
import RegisterError from '../errors/registerError';
import UserDto from '../dtos/userDto';
import ValidationError from '../errors/validationError';

type RequestBody = {
  firstName: string,
  secondName: string,
  email: string,
  password: string,
}

class UserService {
  async findUserByEmail(email: string) {
    return UserModel.findOne({email});
  }

  @Transactional()
  async createNewUser(request: RequestBody) {
    const { firstName, secondName, email, password} = request;

    const user: UserDocument | null = await this.findUserByEmail(email)

    if (user) {
      throw new RegisterError('User with this email already exists')
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const activationLink = v4();

    const newUser = new UserModel({firstName, secondName, email, password: hashPassword, activationLink});
    await newUser.save();

    await MailService.sendActivationMail(email, `${process.env.APP_URL}/auth/activate/${activationLink}`);
    const userDto = new AuthUserDto(newUser)

    return {user: userDto}
  }

  async activate(activationLink: string) {
    const user: UserDocument | null = await UserModel.findOne({activationLink});

    if (!user) {
      throw new RegisterError('Invalid activation link')
    }

    user.isActivated = true;
    await user.save();
  }

  async getUser(userId: string) {
    const user = await UserModel.findOne({_id: userId});

    return new UserDto(user);
  }
}

export default new UserService();
