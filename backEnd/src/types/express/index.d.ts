import * as express from 'express'
import {} from 'express-session'

declare module 'express-serve-static-core' {
  interface Request {}
  interface Response {}
}
