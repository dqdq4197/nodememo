import { Router } from 'express'
import { Container } from 'typedi'
import middlewares from '../../middlewares'
import UserService from '../../../services/UserService'

import logger from '../../../utils/logger'

const router = Router()

export default (app: Router) => {
  app.use('/auth', router)

  router.post('/login', middlewares.loginProcess)
  router.post('/register', async (req, res) => {
    try {
      console.log(1)

      // body: {nickname, email, password}
      const UserServiceInstance = Container.get(UserService)
      const { success, message, statusCode } = await UserServiceInstance.register(req.body)
      res.status(statusCode).json({ success, message })
    } catch (err) {
      res.status(500).end(() => logger.error(err.message))
    }
  })
}
