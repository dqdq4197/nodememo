import { Router } from 'express'
import { Container } from 'typedi'
import middlewares from '../../middlewares'
import PostService from '../../../services/PostService'

import logger from '../../../utils/logger'

const router = Router()

export default (app: Router) => {
  app.use('/personal', middlewares.authenticateJwt, router)

  router.get('/:postId', async (req, res) => {
    try {
      const { id } = req.user!
      const { postId } = req.params
      const PostServiceInstance = Container.get(PostService)
      const { success, message, statusCode, data } = await PostServiceInstance.getPost({ postId: Number(postId), userId: id })
      res.status(statusCode).json({ success, message, data })
    } catch (err) {
      res.status(500).end(() => logger.error(err.message))
    }
  })

  router.get('/list/:page', async (req, res) => {
    try {
      const { id } = req.user!
      let page = Number(req.params.page)
      if (!page) page = 0
      const PostServiceInstance = Container.get(PostService)
      const { success, message, statusCode, data } = await PostServiceInstance.getList({ userId: id, page })
      res.status(statusCode).json({ success, message, data })
    } catch (err) {
      res.status(500).end(() => logger.error(err.message))
    }
  })

  router.post('/', async (req, res) => {
    try {
      const { id } = req.user!
      const { title } = req.body
      const PostServiceInstance = Container.get(PostService)
      const { success, message, statusCode, data } = await PostServiceInstance.add({ title, userId: id })
      res.status(statusCode).json({ success, message, data })
    } catch (err) {
      res.status(500).end(() => logger.error(err.message))
    }
  })

  router.put('/:postId', async (req, res) => {
    try {
      const { id } = req.user!
      const { postId } = req.params
      const { title } = req.body
      const PostServiceInstance = Container.get(PostService)
      const { success, message, statusCode, data } = await PostServiceInstance.modify({ id: Number(postId), userId: id, title })
      res.status(statusCode).json({ success, message, data })
    } catch (err) {
      res.status(500).end(() => logger.error(err.message))
    }
  })

  router.delete('/:postId', async (req, res) => {
    try {
      const { id } = req.user!
      const { postId } = req.params
      const PostServiceInstance = Container.get(PostService)
      const { success, message, statusCode, data } = await PostServiceInstance.delete({ id: Number(postId), userId: id })
      res.status(statusCode).json({ success, message, data })
    } catch (err) {
      res.status(500).end(() => logger.error(err.message))
    }
  })
}
