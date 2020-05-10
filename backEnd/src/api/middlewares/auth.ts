import { Request, Response, NextFunction } from 'express'
import passportFunc from './passport'
const passport = passportFunc()

const loginProcess = (strategy: string = 'local') => passport.authenticate(strategy)

const isLoggedin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) next()
  else res.status(403).json({ success: false, message: '로그인 필요' })
}

export { isLoggedin, loginProcess }
