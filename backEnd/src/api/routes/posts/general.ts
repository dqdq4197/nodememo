import { Router } from 'express'
import PostService from '../../../services/PostService'

const router = Router()

export default (app: Router) => {
  app.use('/general', router)

  //   router.get('/list/:id', async (req, res) => {})

  //   router.post('/', async (req, res) => {
  //     const { title, userId } = req.body
  //     const { success, message, statusCode, data } = await PostService.add({ title, userId })
  //     res.status(statusCode).json({ success, message, data })
  //   })

  //   router.delete('/:id', async (req, res) => {
  //     const { id } = req.params
  //     const { success, message, statusCode, data } = await PostService.delete({ id: Number(id) })
  //     res.status(statusCode).json({ success, message, data })
  //   })

  //   router.put('/:id', async (req, res) => {
  //     const { id } = req.params
  //     const { title } = req.body
  //     const { success, message, statusCode, data } = await PostService.modify({ id: Number(id), title })
  //     res.status(statusCode).json({ success, message, data })
  //   })
}
