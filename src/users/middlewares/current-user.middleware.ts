import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare global {
  namespace Express { // 1. go and find Express library
    interface Request { // 2. find specific interface 
      currentUser?: User; // 3. add property
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private userService: UsersService
  ) {};

  async use(req: Request, res: Response, next: NextFunction) { // next -> refers to the next middlware we might have in the chain
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      req.currentUser = user;
    }

    next();
  }
}