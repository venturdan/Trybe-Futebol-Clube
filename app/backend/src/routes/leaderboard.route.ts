import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

export default class RouterLeaderboard {
  private router: Router;
  private leaderboardController = new LeaderboardController();

  constructor() {
    this.router = Router();
  }

  withGetLeaderboardHome() {
    this.router.get('/home', (req, res) => this.leaderboardController.getLeaderboardHome(req, res));
    return this;
  }

  build() {
    return this.router;
  }
}
