import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';
import IMatch from '../Interfaces/IMatch';

export default class MatchController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { status, data } = await this.matchesService.getAllMatches();
    const newStatus = mapStatusHTTP(status);

    if (inProgress) {
      const matchesInProgress = JSON.parse(JSON.stringify(data))
        .filter((match: IMatch) => match.inProgress === (inProgress === 'true'));
      return res.status(newStatus).json(matchesInProgress);
    }

    return res.status(newStatus).json(data);
  }

  public async getMatchById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.getMatchById(Number(id));
    const newStatus = mapStatusHTTP(status);
    return res.status(newStatus).json(data);
  }

  public async getUpdateGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchesService
      .getUpdateGoals(Number(id), homeTeamGoals, awayTeamGoals);
    const newStatus = mapStatusHTTP(status);
    return res.status(newStatus).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const match: IMatch = req.body;
    const { status, data } = await this.matchesService.createMatch(match);
    const newStatus = mapStatusHTTP(status);
    return res.status(newStatus).json(data);
  }
}
