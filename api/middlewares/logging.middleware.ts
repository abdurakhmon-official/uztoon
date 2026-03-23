import { Request, Response } from 'express';
import { blue, green, red, yellow } from 'colorette';

export const logging = () => {
  return (req: Request, res: Response, next: (err: any) => any) => {
    res.once('finish', () => {
      if (req.method !== 'OPTIONS') {
        const user = `[${blue(req.user ? `${req.user.firstName} ${req.user.lastName}` : 'Anonymous')}]`.padEnd(12);
        const method = yellow(req.method.padEnd(1));
        const url = req.url;
        const status = res.statusCode >= 200 && res.statusCode <= 299 ? green(`${res.statusCode}`) : red(`${res.statusCode}`);
        console.log(user, status, method, url);
      }
    });
    next(null);
  };
};
