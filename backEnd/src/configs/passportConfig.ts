import { verify } from 'argon2'
import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import User from '../models/user'

export default () => {
  const LocalStrategy = passportLocal.Strategy
  const ExtractJwt = passportJwt.ExtractJwt
  const JwtStrategy = passportJwt.Strategy
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!,
    //
  }

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } })
          if (!user) return done(null, false, { message: '존재하는 이메일이 아닙니다' })
          if (!(await verify(user.password, password))) return done(null, false, { message: '비밀번호가 틀립니다' })
          done(null, user)
        } catch (err) {
          done(err, false)
        }
      }
    )
  )

  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const user = await User.findOne({ attributes: { exclude: ['password'] }, where: { id: payload.id } })
        if (!user) return done(null, false)
        else return done(null, user)
      } catch (err) {
        done(err, false)
      }
    })
  )
}
