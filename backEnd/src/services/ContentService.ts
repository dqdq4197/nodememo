import { Service, Inject } from 'typedi'
import Content from '../models/content'

type params = {
  title: string
  content: string
  code: string
  postId?: number
  userId?: number
}

@Service()
export default class ContentService {
  constructor() {}

  /**
   * * 컨텐츠 저장
   * @param data as params
   */
  public async save(data: params) {
    let result: any
    try {
      const { title, content, code, postId, userId } = data
      await Content.create({ title, content, code, PostId: postId!, UserId: userId! })
      result = { success: true, message: '추가 성공', statusCode: 200 }
    } catch (saveErr) {
      result = { success: false, message: saveErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }
  public async modify(data: params) {
    let result: any
    try {
      const { title, content, code, userId } = data
      const update = await Content.update({ title, content, code }, { where: { UserId: userId! } })
      if (update[0]) result = { success: true, message: '수정 성공', statusCode: 200 }
      else result = { success: false, message: '없는 포스트', statusCode: 404 }
    } catch (modifyErr) {
      result = { success: false, message: modifyErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }
  public async delete({ contentId, userId }: { contentId: number; userId: number }) {
    let result: any
    try {
      const destroy = await Content.destroy({ where: { id: contentId, UserId: userId } })
    } catch (deleteErr) {
      result = { success: false, message: deleteErr.message, statusCode: 400 }
    } finally {
      return result!
    }
  }
}
