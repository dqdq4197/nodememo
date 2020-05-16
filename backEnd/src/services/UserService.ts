import { Service } from 'typedi'
import User from '../models/user'
import argon2 from 'argon2'
import crypto from 'crypto'

@Service()
export default class UserService {
  constructor() {}

  /**
   * * 회원가입
   * @param {nickname, email, password}
   */
  public async register({ nickname, email, password }: { nickname: string; email: string; password: string }) {
    let result: any
    try {
      const salt = crypto.randomBytes(8)
      const hashPassword = await argon2.hash(password, { salt })
      await User.create({ nickname, email, password: hashPassword })
      result = { success: true, message: '가입 성공', statusCode: 200 }
    } catch (registerErr) {
      if (registerErr.message == 'Validation error') registerErr.message = '이미 가입된 이메일'
      result = { success: false, message: registerErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }

  /**
   * * 계정 정보 수정
   * @param {id, nickname, provider, snsid}
   */
  public async modifyAccount({ id, nickname, provider, snsid }: { id: number; nickname: string; provider: string; snsid: string }) {
    let result: any
    try {
      const update = await User.update({ nickname, provider, snsid }, { where: { id } })
      if (update[0]) result = { success: true, message: '수정 성공', statusCode: 200 }
      else result = { success: false, message: '수정 실패', statusCode: 400 }
    } catch (modifyEmailErr) {
      result = { success: false, message: modifyEmailErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }

  /**
   * * 이메일 수정
   * TODO: 이메일 인증
   * @param {id, email}
   */
  public async modifyEmail({ id, email }: { id: number; email: string }) {
    let result: any
    try {
      const update = await User.update({ email }, { where: { id } })
      if (update[0]) result = { success: true, message: '수정 성공', statusCode: 200 }
      else result = { success: false, message: '수정 실패', statusCode: 400 }
    } catch (modifyEmailErr) {
      if (modifyEmailErr.message === 'Validation error') modifyEmailErr.message = '이미 가입된 이메일'
      result = { success: false, message: modifyEmailErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }

  /**
   * * 비밀번호 수정
   * TODO: 비밀번호 암호화
   * @param {id, password}
   */
  public async modifyPassword({ id, password }: { id: number; password: string }) {
    let result: any
    try {
      const salt = crypto.randomBytes(8)
      const hashPassword = await argon2.hash(password, { salt })
      const update = await User.update({ password: hashPassword }, { where: { id } })
      if (update[0]) result = { success: true, message: '수정 성공', statusCode: 200 }
      else result = { success: false, message: '수정 실패', statusCode: 400 }
    } catch (modifyPasswordErr) {
      result = { success: false, message: modifyPasswordErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }

  /**
   * * 회원 탈퇴
   * TODO: 탈퇴 시 인증 방법 고안
   * @param {id, password}
   */
  public async secession({ id, rawPassword }: { id: number; rawPassword: string }) {
    let result: any
    try {
      const user = await User.findOne({ attributes: ['password'], where: { id } })
      if (!user) result = { success: false, message: '존재하지 않는 계정입니다', statusCode: 403 }
      else if (await argon2.verify(user.password, rawPassword)) {
        const destroy = await User.destroy({ where: { id } })
        if (destroy) result = { success: true, message: '탈퇴 성공', statusCode: 200 }
        else result = { success: false, message: '탈퇴 실패', statusCode: 400 }
      } else result = { success: false, message: '비밀번호가 틀립니다', statusCode: 403 }
    } catch (secessionErr) {
      result = { success: false, message: secessionErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }
}
