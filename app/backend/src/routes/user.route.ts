import { Router } from 'express';
import UsersController from '../controllers/Users.controller';
import LoginValidator from '../middlewares/login.Validation';
import TokenValidator from '../middlewares/jwt.Validation';

export default class RouterUser {
  private router: Router;
  private usersController = new UsersController();

  constructor() {
    this.router = Router();
  }

  withLogin() {
    this.router.post('/', LoginValidator
      .validateLogin, (req, res) => this.usersController.login(req, res));
    return this;
  }

  withGetRoleById() {
    this.router.get(
      '/role',
      TokenValidator.tokenValidate,
      (req, res) => this.usersController.getRoleById(req, res, res.locals.user.id),
    );
    return this;
  }

  build() {
    return this.router;
  }
}
