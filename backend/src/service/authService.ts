import User from '../models/User';
import bcrypt from 'bcryptjs';

type RequestBody = {
  firstName: string,
  secondName: string,
  email: string,
  password: string,
}

class authService {
  async createNewUser(request: RequestBody) {
    const { firstName, secondName, email, password} = request;
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({firstName, secondName, email, password: hashPassword});
    await user.save();
  }
}

export default new authService();
