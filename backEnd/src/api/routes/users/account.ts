import { Router } from 'express'
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
    const { success, message, statusCode } = await UserService.modifyAccount({ id, nickname, provider, snsid })
    if (!success) logger.error(message)

    res.status(statusCode).json({ success, message })
  })

  router.put('/email', async (req, res) => {
    const { id } = req.user!
    const { email } = req.body
    const { success, message, statusCode } = await UserService.modifyEmail({ id, email })
    if (!success) logger.error(message)

    res.status(statusCode).json({ success, message })
  })

  router.put('/password', async (req, res) => {
    const { id } = req.user!
    const { password } = req.body
    const { success, message, statusCode } = await UserService.modifyPassword({ id, password })
    if (!success) logger.error(message)

    res.status(statusCode).json({ success, message })
  })

  router.delete('/secession', async (req, res) => {
    const { id } = req.user!
    const { password } = req.body
    const { success, message, statusCode } = await UserService.secession({ id, rawPassword: password })
    if (!success) logger.error(message)

    res.status(statusCode).json({ success, message })
  })
}
