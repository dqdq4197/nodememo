import { Router } from 'express'
import { Container } from 'typedi'
import middlewares from '../../middlewares'
import UserService from '../../../services/UserService'

const router = Router()

export default (app: Router) => {
  app.use('/auth', router)

  router.post('/login', middlewares.loginProcess)
  router.post('/register', async (req, res) => {
    // body: {nickname, email, password}
    const UserServiceInstance = Container.get(UserService)
    const { success, message, statusCode } = await UserServiceInstance.register(req.body)
    res.status(statusCode).json({ success, message })
  })
}
