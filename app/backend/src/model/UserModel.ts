import IUser from '../Interfaces/IUser';
import IUserModel from '../Interfaces/IUserM';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UsersModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const result = await this.model.findOne({ where: { email } });
    return result;
  }

  async getRoleById(id: number): Promise<string> {
    const result = await this.model.findByPk(id);

    if (!result) {
      throw new Error('Not found');
    }

    return result.role;
  }
}
