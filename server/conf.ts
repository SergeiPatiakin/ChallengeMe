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
  port: parseInt(process.env.PORT || '3001', 10),
}

export const db = {
  host: pgConnStringConf.host || process.env.DB_HOST || '127.0.0.1',
  port: pgConnStringConf.port || parseInt(process.env.DB_PORT || '5432', 10),
  database: pgConnStringConf.database || process.env.DB_NAME || 'chmeapp',
  user: pgConnStringConf.user || process.env.DB_USER || 'chmeapp_user',
  password: pgConnStringConf.password || process.env.DB_PWD || 'chmeapp_password',
  ssl: env.isProduction,
}
