import IMatch from '../Interfaces/IMatch';
import { IMatchModel } from '../Interfaces/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const result = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return result;
  }

  async findById(id: number): Promise<SequelizeMatch | null> {
    const result = await this.model.update(
      { inProgress: false },
      { where: { id }, returning: true },
    );

    return result[1][0];
  }

  async findUpdateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<SequelizeMatch | null> {
    const match = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id }, returning: true },
    );

    return match[1][0];
  }

  async createMatch(match: IMatch): Promise<IMatch> {
    const result = await this.model.create({
      homeTeamId: match.homeTeamId,
      awayTeamId: match.awayTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });

    return result;
  }

  async findFinishMatches(): Promise<IMatch[]> {
    const result = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return result;
  }
}
