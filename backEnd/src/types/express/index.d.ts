import * as express from 'express'
import {} from 'express-session'
import User from '../../models/user'

declare module 'express-serve-static-core' {
  interface Request {
    user?: User
  }
  interface Response {}
}
