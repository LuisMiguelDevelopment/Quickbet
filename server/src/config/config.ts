import * as dotenv from 'dotenv';

dotenv.config();

export const OKTA_CLIENTID = process.env.OKTA_CLIENTID;
export const OKTA_ISSUER = process.env.OKTA_ISSUER;
export const OKTA_AUDIENCE = process.env.OKTA_AUDIENCE;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
