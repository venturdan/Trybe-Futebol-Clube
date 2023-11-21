import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardServices';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboardHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getLeaderboardHome();
    const newStatus = mapStatusHTTP(status);
    return res.status(newStatus).json(data);
  }
}
