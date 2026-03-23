import { cleanEnv, email, port, str, url, num } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    PROJECT: str(),
    DB_URI: url(),
    API_URL: url(),
    BASE_DOMAIN: str(),
    SESSION_SECRET: str(),
    AWS_ACCESS_KEY_ID: str(),
    AWS_SECRET_ACCESS_KEY: str(),
    S3_BUCKET: str(),
    REGION: str(),
    FILE_VIEW_EXPIRY_MINUTES: num(),
    EMAIL_PROVIDER: str(),
    POSTMARK_API_KEY: str(),
    MAIL_FROM: email(),
    REDIS_PORT: port(),
    REDIS_HOST: str(),

    SUPABASE_URL: str(),
    SUPABASE_KEY: str(),
    SUPABASE_SERVICE_KEY: str(),
  });
};

export default validateEnv;
