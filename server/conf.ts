import { ConnectionOptions } from 'pg-connection-string'

const pgConnStringConf: ConnectionOptions = {
  host: null,
  port: null,
  database: null,
  user: null,
  password: null,
  client_encoding: null,
  ssl: null,
  application_name: null,
  fallback_application_name: null,
}

export const env = {
  isProduction: process.env.NODE_ENV === 'production',
}

export const server = {
  callbackDomain: process.env.CALLBACK_DOMAIN || 'http://localhost:3001',
  port: parseInt(process.env.PORT || '3001', 10),
}

export const db = {
  host: pgConnStringConf.host || process.env.RDS_HOSTNAME || process.env.DB_HOST || '127.0.0.1',
  port: pgConnStringConf.port || parseInt(process.env.RDS_PORT || '0', 10) || parseInt(process.env.DB_PORT || '5432', 10),
  database: pgConnStringConf.database || process.env.RDS_DB_NAME || process.env.DB_NAME || 'chmeapp',
  user: pgConnStringConf.user || process.env.RDS_USERNAME || process.env.DB_USER || 'chmeapp_user',
  password: pgConnStringConf.password || process.env.RDS_PASSWORD || process.env.DB_PWD || 'chmeapp_password',
  ssl: env.isProduction && !!(process.env.RDS_USERNAME || process.env.DB_SSL), // Use SSL if RDS_USERNAME or DB_SSL is set
}

export const jwtSecret = process.env.JWT_SECRET || 'ASECRET'

export const vapid = {
  vapidPublicKey: process.env.VAPID_PUBLIC_KEY as string,
  vapidPrivateKey: process.env.VAPID_PRIVATE_KEY as string,
  vapidEmail: process.env.VAPID_EMAIL as string,
}

if (!vapid.vapidPublicKey) {
  throw Error('Must provide env variable VAPID_PUBLIC_KEY')
}
if (!vapid.vapidPrivateKey) {
  throw Error('Must provide env variable VAPID_PRIVATE_KEY')
}
if (!vapid.vapidEmail) {
  throw Error('Must provide env variable VAPID_EMAIL')
}

export const facebook = {
  appId: process.env.FACEBOOK_APP_ID!,
  appSecret: process.env.FACEBOOK_APP_SECRET!,
}
