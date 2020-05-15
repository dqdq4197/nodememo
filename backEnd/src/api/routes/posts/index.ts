import { Router } from 'express'

import personal from './personal'
import general from './general'

const router = Router()

export default (app: Router) => {
  app.use('/posts', router)
  personal(router)
  general(router)
}
