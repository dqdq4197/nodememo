import User from '../models/user'
import * as argon2 from 'argon2'

class UserService {
  constructor() {}

  // /**
  //  * * 로그인
  //  * @param {email, password}
  //  */
  // public async login({ email, password }: { email: string; password: string }) {
  //   let result: any
  //   try {
  //     const user = await User.findOne({ attributes: ['email', 'password'], where: { email } })
  //     if (!user) result = { success: false, message: '존재하지 않음', statusCode: 404 }
  //     else if (await argon2.verify(user.password, password)) result = { success: true, message: '로그인 성공', statusCode: 200 }
  //     else result = { success: false, message: '비밀번호 틀림', statusCode: 404 }
  //   } catch (loginErr) {
  //     result = { success: false, message: loginErr.message, statusCode: 400 }
  //   } finally {
  //     return result!
  //   }
  // }

  /**
   * * 회원가입
   * @param {nickname, email, password}
   */
  public async register({ nickname, email, password }: { nickname: string; email: string; password: string }) {
    let result: any
    try {
      const hashPassword = await argon2.hash(password)
      await User.create({ nickname, email, password: hashPassword })
      result = { success: true, message: '가입 성공', statusCode: 200 }
    } catch (registerErr) {
      if (registerErr.message == 'Validation error') registerErr.message = '이미 가입된 이메일'
      result = { success: false, message: registerErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }
  public async account() {}
  public async accountModify() {}
  public async secession() {}
}

export default new UserService()
