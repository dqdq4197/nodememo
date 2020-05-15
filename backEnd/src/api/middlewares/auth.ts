import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../configs'
import passport from 'passport'

/**
 * * 로그인 처리 미들웨어
 * TODO: 로그인을 시도할 때 passport를 통해 유효할 시 토큰 발급
 * @param req 요청
 * @param res 응답
 * @param next 다음 미들웨어 호출
 */
const loginProcess = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('local', { session: false }, (err, user, info) => {
    // 이메일 또는 비밀번호가 틀렸을 때
    if (err || !user) return res.status(400).json({ success: false, message: info.message })

    // 정상적으로 유저를 찾았을 때
    req.login(user, { session: false }, (err) => {
      if (err) res.status(400).json({ success: false, message: err.message })
      const payload = {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        provider: user.provider,
        snsid: user.snsid,
        createAt: user.createAt,
        updateAt: user.updateAt,
      }

      const accessToken = jwt.sign(JSON.parse(JSON.stringify(payload)), config.jwtSecret, {}) // 옵션 추가하기
      res.status(200).json({ success: true, message: '토큰 발급', token: accessToken })
    })
  })(req, res)

/**
 * * Bearer Token 유효성 검사 미들웨어
 * @param req 요청
 * @param res 응답
 * @param next 다음 미들웨어 호출
 */
const authenticateJwt = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err)
    if (user) {
      req.user = user
      next()
    } else res.status(403).json({ success: false, message: '토큰이 유효하지 않음' })
  })(req, res, next)

export { loginProcess, authenticateJwt }
