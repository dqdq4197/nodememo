import { Router } from 'express'

const router = Router()

export default (app: Router) => {
  app.use('/contents', router)
  router.get('/', async (req, res) => {
    res.send('test')
  })
}
