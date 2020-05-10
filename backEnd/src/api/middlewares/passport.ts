import { verify } from 'argon2'
import * as passport from 'passport'
import * as passportLocal from 'passport-local'
import {} from 'passport-jwt'

import User from '../../models/user'

export default () => {
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
            done(null, false, { message: '이메일과 비밀번호 확인 바람' })
          }
        } catch (error) {
          done(error)
        }
      }
    )
  )

  return passport
}
