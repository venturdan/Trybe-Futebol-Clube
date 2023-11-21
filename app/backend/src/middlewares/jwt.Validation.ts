import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default class JwtValidator {
  static tokenValidate(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1];

    try {
      res.locals.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
