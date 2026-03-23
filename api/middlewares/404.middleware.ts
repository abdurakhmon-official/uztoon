import { Request, Response } from 'express';

export const get404 = () => {
  return (req: Request, res: Response, next: (err: any) => any) => {
    if (!res.headersSent) {
      res.status(404).json({ error: 404, success: false, message: 'Not Found' });
    }
  };
};
