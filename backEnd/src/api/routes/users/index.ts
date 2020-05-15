import { Router } from 'express'
import middlewares from '../../middlewares'

import account from './account'

const router = Router()

export default (app: Router) => {
  app.use('/users', middlewares.authenticateJwt, router)
  account(router)
}
