import { ITeam } from '../Interfaces/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../model/TeamsModel';

export default class TeamService {
  constructor(private teamsModel = new TeamsModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teamsData = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: teamsData };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamsModel.findById(id);
    return { status: 'SUCCESSFUL', data: team };
  }
}
