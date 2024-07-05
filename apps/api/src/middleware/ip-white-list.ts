import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IPWhitelistMiddleware implements NestMiddleware {
  private readonly allowedIPs: string[] = process.env.ALLOWED_IPS.split(',');

  use(req: Request, res: Response, next: NextFunction): void {
    let ipAddress = req.headers['x-appengine-user-ip'] as string;

    if (!ipAddress) {
      ipAddress = req.headers['x-forwarded-for'] as string;
    }

    if (!ipAddress) {
      ipAddress = req.ip;
    }

    if (ipAddress?.startsWith('::ffff:')) {
      ipAddress = ipAddress.slice(7);
    }
    if (this.allowedIPs.includes(ipAddress)) {
      next();
    } else {
      res.status(HttpStatus.FORBIDDEN).send('Access Forbidden');
    }
  }
}
