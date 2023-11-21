import { Request, Response } from 'express';
import TeamsService from '../services/TeamsServices';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAllTeams();
    const newStatus = mapStatusHTTP(status);
    return res.status(newStatus).json(data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.getTeamById(Number(id));
    const newStatus = mapStatusHTTP(status);
    return res.status(newStatus).json(data);
  }
}
