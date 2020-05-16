import { Router } from 'express'

import personal from './personal'
import general from './general'
import contents from './contents'

const router = Router()

export default (app: Router) => {
  app.use('/posts', router)
  personal(router)
  general(router)
  contents(router)
}
