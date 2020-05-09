import { Router } from 'express'
import usersRouter from './users'
import postsRouter from './posts'

export default () => {
  const app = Router()
  app.get('/', async (req, res) => {
    res.send('hi')
  })
  usersRouter(app)
  postsRouter(app)
  return app
}
