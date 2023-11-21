import { Router } from 'express';
import TeamsController from '../controllers/team.controller';

export default class RouterTeam {
  private router: Router;
  private teamsController: TeamsController = new TeamsController();

  constructor() {
    this.router = Router();
  }

  withGetAllTeams() {
    this.router.get(
      '/',
      (req, res) => this.teamsController.getAllTeams(req, res),
    );
    return this;
  }

  withGetTeamById() {
    this.router.get('/:id', (req, res) => this.teamsController.getTeamById(req, res));
    return this;
  }

  build(): Router {
    return this.router;
  }
}
