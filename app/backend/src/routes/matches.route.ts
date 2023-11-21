import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import TokenValidator from '../middlewares/jwt.Validation';
import MatchValidator from '../middlewares/match.Validation';

export default class RouterMatch {
  private router: Router;
  private matchesController = new MatchesController();

  constructor() {
    this.router = Router();
  }

  withGetAllMatches() {
    this.router.get('/', (req, res) => this.matchesController.getAllMatches(req, res));
    return this;
  }

  withGetMatchById() {
    this.router.patch(
      '/:id/finish',
      TokenValidator.tokenValidate,
      (req, res) => this.matchesController.getMatchById(req, res),
    );
    return this;
  }

  withGetUpdateGoals() {
    this.router.patch(
      '/:id',
      TokenValidator.tokenValidate,
      (req, res) => this.matchesController.getUpdateGoals(req, res),
    );
    return this;
  }

  withCreateMatch() {
    this.router.post(
      '/',
      TokenValidator.tokenValidate,
      MatchValidator.matchValidate,
      (req, res) => this.matchesController.createMatch(req, res),
    );
    return this;
  }

  build() {
    return this.router;
  }
}
