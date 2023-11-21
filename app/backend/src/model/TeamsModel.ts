import { ITeam } from '../Interfaces/ITeam';
import { ITeamModel } from '../Interfaces/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamsModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result;
  }

  async findById(id: number): Promise<ITeam | null> {
    const result = await this.model.findOne({ where: { id } });
    return result;
  }
}
