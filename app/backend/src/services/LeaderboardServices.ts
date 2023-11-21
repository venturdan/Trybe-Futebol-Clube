import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../model/LeaderboardModel';

export default class LeaderboardService {
  constructor(private leaderboardModel = new LeaderboardModel()) { }

  async getLeaderboardHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboardData = await this.leaderboardModel.getLeaderboardHome();

    const leaderboard = leaderboardData
      .filter(({ totalGames }) => totalGames > 0).map((item) => (
        { ...item,
          goalsBalance: item.goalsFavor - item.goalsOwn,
          efficiency: ((item.totalPoints / (item.totalGames * 3)) * 100).toFixed(2) }));

    const sortLeaderboard = leaderboard.sort((a, b) => {
      switch (true) {
        case a.totalPoints !== b.totalPoints: return b.totalPoints - a.totalPoints;
        case a.totalVictories !== b.totalVictories: return b.totalVictories - a.totalVictories;
        case a.goalsBalance !== b.goalsBalance: return b.goalsBalance - a.goalsBalance;
        case a.goalsFavor !== b.goalsFavor: return b.goalsFavor - a.goalsFavor;
        default:
          return 0;
      }
    });
    return { status: 'SUCCESSFUL', data: sortLeaderboard };
  }
}
