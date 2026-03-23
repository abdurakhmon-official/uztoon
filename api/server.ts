import { config as configDotEnv } from 'dotenv';
configDotEnv();

import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import '@tsed/ajv';
import * as controllers from './controllers';
import { Application, json, urlencoded, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import config from '@/config';
import bearerToken from 'express-bearer-token';
import { BadRequest, Unauthorized } from '@tsed/exceptions';
import { ZodError } from 'zod';
import _ from 'lodash';

const API_ROOT = '/api';

@Configuration({
  acceptMimes: ['application/json'],
  httpPort: config.port,
  httpsPort: false,
  componentsScan: false,
  mount: {
    [API_ROOT]: [...Object.values(controllers)],
  },
  middlewares: [],
  exclude: ['**/*.spec.ts'],
  logger: {
    disableRoutesSummary: config.env !== 'development',
  },
})
export class Server {
  constructor() {}

  @Inject()
  protected app: PlatformApplication<Application>;

  @Configuration()
  protected settings: Configuration;

  $beforeRoutesInit() {
    this.app.rawApp.set('trust proxy', 1);

    this.app.use(hpp());
    this.app.use(
      helmet({
        contentSecurityPolicy: false, // not needed in api context
        crossOriginResourcePolicy: false,
      }),
    );
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      }),
    );
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(bearerToken());

    this.app.use((err: any, req: Request, res: Response, next: Function) => {
      next(err);
    });
  }

  $afterRoutesInit() {
    console.info(`======= ENV: ${config.env} =======`);
    console.info(`======= STAGE: ${config.stage} =======`);
    console.info(`App listening on port ${config.port}`);

    this.app.use((err: any, req: Request, res: Response, next: Function) => {
      if (err && !res.headersSent) {
        if ((err as any) instanceof ZodError) {
          res.status(400).send({
            success: false,
            _message: err.errors.length ? err.errors.map((e: any) => `${e.path.join()} - ${e.message}`).join('/n') : err.mesage,
          });
        } else if ((err as any) instanceof BadRequest && err.errors) {
          res.status(400).send({
            success: false,
            _message: err.errors.length
              ? _.flatten(Object.values(err.errors.map((e: any) => e.constraints).map((e: any) => Object.values(e)))).join(',')
              : err.mesage,
          });
        } else if (err instanceof BadRequest) {
          res.status(400).send({
            success: false,
            _message: err.message,
          });
        } else if (err instanceof Unauthorized) {
          res.status(401).send({
            success: false,
            _message: err.message,
          });
        } else {
          console.log(err.message);
          console.log(err.stack);
          res.status(err.httpCode || 500).send({
            success: false,
            _message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : null,
          });
        }
      }
      next();
    });
  }
}
