import { Router } from 'express'
import { Container } from 'typedi'
import logger from '../../../utils/logger'
import UserService from '../../../services/UserService'

const router = Router()

export default (app: Router) => {
  app.use('/account', router)

  router.get('/', async (req, res) => {
    res.status(200).json({ success: true, message: '조회 성공', data: { account: req.user } })
  })

  router.put('/', async (req, res) => {
    const { id } = req.user!
    const { nickname, provider, snsid } = req.body
    const UserServiceInstance = Container.get(UserService)
    const { success, message, statusCode } = await UserServiceInstance.modifyAccount({ id, nickname, provider, snsid })
    if (!success) logger.error(message)

    res.status(statusCode).json({ success, message })
  })

  router.put('/email', async (req, res) => {
    const { id } = req.user!
    const { email } = req.body
    const UserServiceInstance = Container.get(UserService)
    const { success, message, statusCode } = await UserServiceInstance.modifyEmail({ id, email })
    if (!success) logger.error(message)

    res.status(statusCode).json({ success, message })
  })

  router.put('/password', async (req, res) => {
    const { id } = req.user!
    const { password } = req.body
    const UserServiceInstance = Container.get(UserService)
    const { success, message, statusCode } = await UserServiceInstance.modifyPassword({ id, password })
    if (!success) logger.error(message)

    res.status(statusCode).json({ success, message })
  })

  router.delete('/secession', async (req, res) => {
    const { id } = req.user!
    const { password } = req.body
    const UserServiceInstance = Container.get(UserService)
    const { success, message, statusCode } = await UserServiceInstance.secession({ id, rawPassword: password })
    if (!success) logger.error(message)

    res.status(statusCode).json({ success, message })
  })
}
