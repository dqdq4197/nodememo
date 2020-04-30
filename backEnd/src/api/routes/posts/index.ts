import { Router, Request, Response } from 'express'
import PostService from '../../../services/PostService'

// 라우터
import test from './test'

const router = Router()

export default (app: Router) => {
  app.use('/posts', router)
  router.post('/add', async (req, res) => {
    if (await PostService.add(req.body)) res.status(200).json({ success: true, message: '추가 성공' })
    else res.status(400).json({ success: false, message: '실패' })
  })
  test(router)
}
