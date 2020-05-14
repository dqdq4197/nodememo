import { Router, Request, Response } from 'express'
import UserService from '../../../services/UserService'
import middlewares from '../../middlewares'

const router = Router()

export default (app: Router) => {
  app.use('/users', router)

  // router.get('/account', middlewares.isLoggedin, async (req, res) => {
  //   res.send(`${req.user.nickname} : 로그인 되어있음`)
  //   // await UserService.account()
  //   // res.status(200).json({ success: true, message: '내정보보기 성공' })
  // })
  // router.put('/account', async (req, res) => {
  //   await UserService.accountModify()
  //   res.status(200).json({ success: true, message: '내정보수정 성공' })
  // })
  // router.delete('/secession', async (req, res) => {
  //   await UserService.secession()
  //   res.status(200).json({ success: true, message: '탈퇴 성공' })
  // })
}
