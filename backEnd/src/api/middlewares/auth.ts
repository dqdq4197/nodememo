import { Request, Response, NextFunction } from 'express'
import User from '../../models/user'
import { verify } from 'argon2'

// import * as passport from 'passport'

// export const isLoggedin = async (req: Request, res: Response, next: NextFunction) => {
//   if (req.isAuthenticated()) next()
//   else res.status(401).json({ success: false, message: '로그인 필요' })
// }

// export const isNotLoggedin = async (req: Request, res: Response, next: NextFunction) => {
//   if (!req.isAuthenticated()) next()
//   else res.status(401).json({ success: false, message: '로그인한 사용자는 접근할 수 없음' })
// }
const loginProcess = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ attributes: ['password', 'nickname'], where: { email } })
    if (user && (await verify(user.password, password))) {
      // 로그인 시켜줘도 됨
      req.session!['is_loggedIn'] = true
      req.session!['nickname'] = user.nickname
      req.session!.save(() => {
        next()
      })
    } else {
      // 아이디와 비밀번호를 확인해라
      res.status(401).json({ success: false, message: '이메일과 비밀번호 확인바람' })
    }
  } catch (authError) {
    res.status(400).json({ success: false, message: authError.message })
  }
}

const isLoggedin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session!['is_loggedIn']) {
    next()
  } else {
    res.status(403).json({ success: false, message: '로그인 필요' })
  }
}

export { loginProcess, isLoggedin }
