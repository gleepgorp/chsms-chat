/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { isNonBrowserUserAgent } from '../utils';

@Injectable()
export class IPLimitMiddleware implements NestMiddleware {
  private readonly rateLimitCount = +process.env.REQUEST_RATE_LIMIT;
  private readonly rateLimitWindowMs = +process.env.REQUEST_RATE_TIME_LIMIT_WINDOW_MS;
  private ipRequests: Map<string, number> = new Map();
  private domainRequests: Map<string, number> = new Map();
  private timeoutIds: Map<string, NodeJS.Timeout> = new Map();

  use(req: Request, res: Response, next: NextFunction) {
    let ipAddress = req.headers['x-appengine-user-ip'] as string;
    const allowedDomains: string[] = process.env.ALLOWED_DOMAIN_NAMES.split(',');

    if (!ipAddress) {
      ipAddress = req.headers['x-forwarded-for'] as string;
    }

    if (!ipAddress) {
      ipAddress = req.ip;
    }

    const userAgent = req.headers['user-agent'];
    const domainName = req.hostname;
    const isAllowedDomain = allowedDomains.includes(domainName);
    const isNotBrowserAgent = isNonBrowserUserAgent(userAgent);

    if (isNotBrowserAgent) {
      return res.status(HttpStatus.FORBIDDEN).send('Access Forbidden');
    }

    if (isAllowedDomain) {
      next();

      return;
    }

    let ipRequests = this.ipRequests.get(ipAddress) || 0;
    ipRequests++;
    this.ipRequests.set(ipAddress, ipRequests);

    let domainRequests = this.domainRequests.get(domainName) || 0;
    domainRequests++;
    this.domainRequests.set(domainName, domainRequests);

    if (ipRequests > this.rateLimitCount || domainRequests > this.rateLimitCount) {
      const ipTimeoutId = this.timeoutIds.get(ipAddress);
      if (ipTimeoutId) {
        clearTimeout(ipTimeoutId);
      }
      const domainTimeoutId = this.timeoutIds.get(domainName);
      if (domainTimeoutId) {
        clearTimeout(domainTimeoutId);
      }
      const newTimeoutId = setTimeout(() => {
        this.ipRequests.delete(ipAddress);
        this.domainRequests.delete(domainName);
        this.timeoutIds.delete(ipAddress);
        this.timeoutIds.delete(domainName);
      }, this.rateLimitWindowMs);
      this.timeoutIds.set(ipAddress, newTimeoutId);
      this.timeoutIds.set(domainName, newTimeoutId);

      return res.status(HttpStatus.TOO_MANY_REQUESTS).send('Too Many Requests');
    }

    next();
  }
}
