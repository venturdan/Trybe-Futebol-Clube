import IMatch from '../Interfaces/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../model/MatchesModel';
import TeamsModel from '../model/TeamsModel';

type match = { message: string };

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const matchesData = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: matchesData };
  }

  public async getMatchById(id: number): Promise<ServiceResponse<match | null>> {
    await this.matchesModel.findById(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async getUpdateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<match | null>> {
    await this.matchesModel.findUpdateGoals(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Update' } };
  }

  public async createMatch(match: IMatch): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = match;
    const homeTeam = await this.teamsModel.findById(homeTeamId);
    const awayTeam = await this.teamsModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const createdData = await this.matchesModel.createMatch(match);
    return { status: 'CREATED', data: createdData };
  }
}
