import { User } from '@prisma/client';

declare global {
  var __db: any;

  namespace Express {
    export interface Request {
      user?: Partial<User & { isAdmin: boolean }>;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: string;
      PORT?: any;
      PROJECT?: string;
      DB_URI?: string;
      API_URL?: string;
      BASE_DOMAIN?: string;
      SESSION_SECRET?: string;
      AWS_ACCESS_KEY_ID?: string;
      AWS_SECRET_ACCESS_KEY?: string;
      S3_BUCKET?: string;
      REGION?: string;
      FILE_VIEW_EXPIRY_MINUTES?: string;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}
