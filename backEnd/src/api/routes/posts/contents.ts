import { Router } from 'express'
import { Container } from 'typedi'
import logger from '../../../utils/logger'
import Content from '../../../models/content'

const router = Router()

export default (app: Router) => {
  app.use('/contents', router)

  router.post('/', async (req, res) => {
    try {
      const ContentsInstance = Container.get(Content)
    } catch (err) {
      res.status(500).end(() => logger.error(err.message))
    }
  })
}
