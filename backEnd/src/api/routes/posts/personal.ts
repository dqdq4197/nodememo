import { Router } from 'express'
import { Container } from 'typedi'
import middlewares from '../../middlewares'
import PostService from '../../../services/PostService'

const router = Router()

export default (app: Router) => {
  app.use('/personal', middlewares.authenticateJwt, router)

  router.get('/:postId', async (req, res) => {
    const { id } = req.user!
    const { postId } = req.params
    if (!postId) {
      // 리스트로 보여주기
    } else {
      // 상세 정보
    }
  })

  router.post('/', async (req, res) => {
    const { id } = req.user!
    const { title } = req.body
    const PostServiceInstance = Container.get(PostService)
    const { success, message, statusCode, data } = await PostServiceInstance.add({ title, userId: id })
    res.status(statusCode).json({ success, message, data })
  })

  router.put('/:postId', async (req, res) => {
    const { postId } = req.params
    const { title } = req.body
    const PostServiceInstance = Container.get(PostService)
    const { success, message, statusCode, data } = await PostServiceInstance.modify({ id: Number(postId), title })
    res.status(statusCode).json({ success, message, data })
  })

  router.delete('/:postId', async (req, res) => {
    const { postId } = req.params
    const PostServiceInstance = Container.get(PostService)
    const { success, message, statusCode, data } = await PostServiceInstance.delete({ id: Number(postId) })
    res.status(statusCode).json({ success, message, data })
  })
}
