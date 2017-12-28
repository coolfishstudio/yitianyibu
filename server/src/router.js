import userRouter from './lib/user/router'
import articleRouter from './lib/article/router'
import categoryRouter from './lib/category/router'
import tagRouter from './lib/tag/router'
import appRouter from './lib/app/router'
import noticeRouter from './lib/notice/router'
import messageRouter from './lib/message/router'
import commentRouter from './lib/comment/router'
import statRouter from './lib/stat/router'
import logRouter from './lib/log/router'
import fileRouter from './lib/file/router'

import { handler404, handlerError } from './middleware/error'

const router = (app) => {
  app.get('/ping', (req, res) => {
    res.send('ok')
  })
  // api
  app.use('/api/user', userRouter)
  app.use('/api/article', articleRouter)
  app.use('/api/category', categoryRouter)
  app.use('/api/tag', tagRouter)
  app.use('/api/app', appRouter)
  app.use('/api/notice', noticeRouter)
  app.use('/api/message', messageRouter)
  app.use('/api/comment', commentRouter)
  app.use('/api/stat', statRouter)
  app.use('/api/log', logRouter)
  app.use('/api/file', fileRouter)
  // error
  app.use(handler404)
  app.use(handlerError)
}

export default router
