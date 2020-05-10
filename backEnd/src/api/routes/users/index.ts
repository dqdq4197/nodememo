import { Router, Request, Response } from 'express'
import UserService from '../../../services/UserService'
import middlewares from '../../middlewares'

const router = Router()

export default (app: Router) => {
  app.use('/users', router)

  router.post('/register', async (req, res) => {
    // body: {nickname, email, password}
    const { success, message, statusCode } = await UserService.register(req.body)
    res.status(statusCode).json({ success, message })
  })

  router.post('/login', middlewares.loginProcess(), async (req, res) => {
    res.send('로그인성공 반갑습니다')
  })

  router.get('/logout', async (req, res) => {
    // 세션을 사용할 때
    req.logOut()
    // req.session?.destroy((err) => {
    //   res.status(200).json({ success: true, message: '로그아웃 성공' })
    // })
    req.session?.save(() => {
      res.status(200).json({ success: true, message: '로그아웃 성공' })
    })
  })

  router.get('/account', middlewares.isLoggedin, async (req, res) => {
    res.send(`${req.user.nickname} : 로그인 되어있음`)
    // await UserService.account()
    // res.status(200).json({ success: true, message: '내정보보기 성공' })
  })
  router.put('/account', async (req, res) => {
    await UserService.accountModify()
    res.status(200).json({ success: true, message: '내정보수정 성공' })
  })
  router.delete('/secession', async (req, res) => {
    await UserService.secession()
    res.status(200).json({ success: true, message: '탈퇴 성공' })
  })
}
