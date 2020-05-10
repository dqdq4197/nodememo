import { Request, Response, NextFunction } from 'express'
import User from '../../models/user'
import { verify } from 'argon2'

import * as passport from 'passport'
import * as passportLocal from 'passport-local'
import {} from 'passport-jwt'
const LocalStrategy = passportLocal.Strategy

passport.serializeUser<User, any>((user, done) => {
  done(null, user.email)
})
passport.deserializeUser<User, any>(async (email, done) => {
  try {
    const user = await User.findOne({ attributes: { exclude: ['password'] }, where: { email } })
    done(null, user as User)
  } catch (error) {
    done(error)
  }
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } })
        if (user && (await verify(user.password, password))) done(null, user)
        else {
          console.log('fdsfaffsdf')
          done(null, false, { message: '이메일과 비밀번호 확인 바람' })
        }
      } catch (error) {
        done(error)
      }
    }
  )
)

// export const isLoggedin = async (req: Request, res: Response, next: NextFunction) => {
//   if (req.isAuthenticated()) next()
//   else res.status(401).json({ success: false, message: '로그인 필요' })
// }

// export const isNotLoggedin = async (req: Request, res: Response, next: NextFunction) => {
//   if (!req.isAuthenticated()) next()
//   else res.status(401).json({ success: false, message: '로그인한 사용자는 접근할 수 없음' })
// }

const passportLoginProcess = (strategy: string = 'local') => passport.authenticate(strategy)

// const loginProcess = async (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body
//   try {
//     const user = await User.findOne({ attributes: ['password', 'nickname'], where: { email } })
//     if (user && (await verify(user.password, password))) {
//       // 로그인 시켜줘도 됨
//       req.session!['is_loggedIn'] = true
//       req.session!['nickname'] = user.nickname
//       req.session!.save(() => {
//         next()
//       })
//     } else {
//       // 아이디와 비밀번호를 확인해라
//       res.status(401).json({ success: false, message: '이메일과 비밀번호 확인바람' })
//     }
//   } catch (authError) {
//     res.status(400).json({ success: false, message: authError.message })
//   }
// }

const isLoggedin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) next()
  else res.status(403).json({ success: false, message: '로그인 필요' })
}

export { isLoggedin, passportLoginProcess }
