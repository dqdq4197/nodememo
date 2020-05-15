import { Service, Inject } from 'typedi'
import Post from '../models/post'
import Logger from '../utils/logger'

@Service()
export default class PostService {
  constructor() {}

  public async getList({ userId, page }: { userId: number; page: number }): Promise<any> {
    let result: { success: boolean; message: string; statusCode: number; data?: any }
    try {
      let offset = 0
      if (page > 1) offset = 10 * (page - 1)

      const list = await Post.findAll({ attributes: ['id', 'main_title'], where: { UserId: userId }, offset, limit: 10 })
      result = { success: true, message: '포스트 불러오기 성공', statusCode: 200, data: { list } }
    } catch (getListErr) {
      result = { success: false, message: getListErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }

  public async getPost({ postId, userId }: { postId: number; userId: number }): Promise<any> {
    let result: { success: boolean; message: string; statusCode: number; data?: any }
    try {
      const post = await Post.findOne({ where: { id: postId, UserId: userId } })
      if (post) result = { success: true, message: '포스트 불러오기 성공', statusCode: 200, data: { post } }
      else result = { success: false, message: '포스트 불러오기 실패', statusCode: 400 }
    } catch (getListErr) {
      result = { success: false, message: getListErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }

  /**
   * * 포스트 추가
   * @param {title, userId} 포스트의 title 작성자 id
   * @return {success, message, statusCode, data?}
   */
  public async add({ title, userId }: { title: string; userId: number }): Promise<any> {
    let result: { success: boolean; message: string; statusCode: number; data?: any }
    try {
      await Post.create({ main_title: title, UserId: userId })
      result = { success: true, message: '추가 성공', statusCode: 200 }
    } catch (addErr) {
      result = { success: false, message: addErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }

  /**
   * * 포스트 삭제
   * @param {id} 포스트의 id
   * @return {success, message, statusCode, data?}
   */
  public async delete({ id, userId }: { id: number; userId: number }): Promise<any> {
    let result: { success: boolean; message: string; statusCode: number; data?: any }
    try {
      const destroy = await Post.destroy({ where: { id, UserId: userId } })
      if (destroy) result = { success: true, message: '삭제 성공', statusCode: 200 }
      else result = { success: false, message: '없는 포스트', statusCode: 404 } // 410?
    } catch (deleteErr) {
      result = { success: false, message: deleteErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }

  /**
   * * 포스트 수정
   * @param {id, title} 포스트의 id와 수정할 title
   * @return {success, message, statusCode, data?}
   */
  public async modify({ id, userId, title }: { id: number; userId: number; title: string }): Promise<any> {
    let result: { success: boolean; message: string; statusCode: number; data?: any }
    try {
      const update = await Post.update({ main_title: title }, { where: { id, UserId: userId } })
      Logger.info(update.toString())
      if (update[0]) result = { success: true, message: '수정 성공', statusCode: 200 }
      else result = { success: false, message: '없는 포스트', statusCode: 404 }
    } catch (modifyErr) {
      result = { success: false, message: modifyErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }
}
