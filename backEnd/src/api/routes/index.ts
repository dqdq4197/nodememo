import { Router } from 'express'
import usersRouter from './users'
import postsRouter from './posts'
import authRouter from './auth'

export default () => {
  const app = Router()
  authRouter(app)
  usersRouter(app)
  postsRouter(app)
  return app
}
