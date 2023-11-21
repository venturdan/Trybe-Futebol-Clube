import MatchesModel from './MatchesModel';
import TeamsModel from './TeamsModel';
import { ILeaderboard } from '../Interfaces/ILeaderboard';

export default class LeaderboardModel {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) { }

  async getFinishedMatches() {
    return this.matchesModel.findFinishMatches();
  }

  async getAllTeams() {
    return this.teamsModel.findAll();
  }

  async getLeaderboardHome(): Promise<ILeaderboard[]> {
    const [matches, teams] = await Promise.all([this.getFinishedMatches(), this.getAllTeams()]);

    return Promise.all(teams.map(async (team) => {
      const teamMatches = matches.filter((match) => match.homeTeamId === team.id);

      const wins = teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
      const draws = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
      const losses = teamMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);

      return {
        name: team.teamName,
        totalPoints: wins.length * 3 + draws.length,
        totalGames: teamMatches.length,
        totalVictories: wins.length,
        totalDraws: draws.length,
        totalLosses: losses.length,
        goalsFavor: teamMatches.reduce((total, match) => total + match.homeTeamGoals, 0),
        goalsOwn: teamMatches.reduce((total, match) => total + match.awayTeamGoals, 0),
      };
    }));
  }
}
