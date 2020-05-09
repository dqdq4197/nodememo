import { Request, Response, NextFunction } from 'express'
import * as passport from 'passport'

export const isLoggedin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) next()
  else res.status(401).json({ success: false, message: '로그인 필요' })
}

export const isNotLoggedin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) next()
  else res.status(401).json({ success: false, message: '로그인한 사용자는 접근할 수 없음' })
}
