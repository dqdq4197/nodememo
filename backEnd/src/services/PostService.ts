import Post from '../models/post'
import Logger from '../utils/logger'
class PostService {
  constructor() {}

  /**
   * * 포스트 추가
   * @param {title, userId}
   */
  public async add({ title, userId }: { title: string; userId: number }) {
    let result: any
    try {
      const post = await Post.create({ main_title: title, UserId: userId })
      Logger.info(JSON.stringify(post))
      result = true
    } catch (addErr) {
      Logger.error(addErr.message)
      result = false
    } finally {
      return result
    }
  }
  public async remove() {}
}

export default new PostService()
