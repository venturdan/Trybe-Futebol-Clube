import IMatch from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findById(id: number): Promise<IMatch | null>;
  findUpdateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<IMatch | null>;
  createMatch(match: IMatch): Promise<IMatch>;
}
