import dbConfig from './dbConfig'
import * as dotenv from 'dotenv'
const env = dotenv.config()

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (!env) throw new Error("⚠️ Couldn't find .env file ⚠️")

export default {
  port: process.env.PORT!,

  dbConfig,

  jwtSecret: process.env.JWT_SECRET!,

  sessionSecret: process.env.SESSION_SECRET!,

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
}
