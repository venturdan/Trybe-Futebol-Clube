import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import IToken from '../Interfaces/IToken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UsersModel from '../model/UserModel';

export default class UsersService {
  constructor(private usersModel = new UsersModel()) { }

  public async login(email: string, password: string):
  Promise<ServiceResponse<IToken>> {
    if (!email || !password) {
      return { status: 'BAD_REQUEST', data: { message: 'All fields must be filled' } };
    }

    const user = await this.usersModel.findByEmail(email);

    if (!user || !await bcrypt.compare(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = jwt.sign({
      id: user.id,
    }, process.env.JWT_SECRET || 'secret');

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRoleById(id: number): Promise<ServiceResponse<{ role: string }>> {
    const role = await this.usersModel.getRoleById(id);

    return { status: 'SUCCESSFUL', data: { role } };
  }
}
