import Transactional from "../transactions/transactional";
import UserModel, { UserDocument } from '../models/user-model';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import MailService from './mailService';
import AuthUserDto from '../dtos/authUserDto';
import RegisterError from '../errors/registerError';
import UserDto from '../dtos/userDto';
import ResponseError from '../errors/responseError';
import TokenService from './tokenService';
import { JwtPayload } from 'jsonwebtoken';

type RequestBody = {
  firstName: string,
  secondName: string,
  email: string,
  password: string,
}

type UpdatePasswordBody = {
  password: string,
  newPassword: string,
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

    await MailService.sendActivationMail(email, `${process.env.SERVER_URL}/auth/activate/${activationLink}`);
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

  async generateResetToken(email: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new ResponseError('User not found');
    }

    const resetToken = TokenService.generateResetToken(user._id);
    user.resetToken = resetToken;
    await user.save()

    return resetToken;
  }

  async resetPassword(userId: string, password: string) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ResponseError('User not found');
    }

    user.password = bcrypt.hashSync(password, 7);
    user.resetToken = undefined;

    await user.save();
  }

  async updateUser(userId: string, body: RequestBody) {
    await UserModel.updateOne({_id: userId}, body);

    return this.getUser(userId);
  }

  async updateUserEmail(userId: string, body: RequestBody) {
    const { email, password } = body;

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new ResponseError('User not found');
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw new ResponseError('Incorrect password');
    }

    await UserModel.updateOne({_id: userId}, {email});

    return this.getUser(userId);
  }

  async updateUserPassword(userId: string, body: UpdatePasswordBody) {
    const { password, newPassword } = body;

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new ResponseError('User not found');
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw new ResponseError('Incorrect password');
    }

    user.password = bcrypt.hashSync(newPassword, 7)
    await user.save();
  }
}

export default new UserService();
