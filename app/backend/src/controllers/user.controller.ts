import { Request, Response } from 'express';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';
import UsersService from '../services/UserServices';

export default class UsersController {
  constructor(
    private usersService = new UsersService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.usersService.login(email, password);
    const newStatus = mapStatusHTTP(status);
    return res.status(newStatus).json(data);
  }

  public async getRoleById(req: Request, res: Response, id: number) {
    const { status, data } = await this.usersService.getRoleById(id);
    const newStatus = mapStatusHTTP(status);
    return res.status(newStatus).json(data);
  }
}
