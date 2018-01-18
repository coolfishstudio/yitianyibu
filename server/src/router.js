import userRouter from './lib/user/router'
import contentRouter from './lib/content/router'
import categoryRouter from './lib/category/router'
import tagRouter from './lib/tag/router'
import appRouter from './lib/app/router'
import messageRouter from './lib/message/router'
import commentRouter from './lib/comment/router'
import fileRouter from './lib/file/router'

import { handler404, handlerError } from './middleware/error'

const router = (app) => {
  app.get('/ping', (req, res) => {
    res.send('ok')
  })
  // file
  app.get('/i/:id([0-9a-f]{24})', (req, res) => {
    res.redirect(`/api/file/${req.params.id}`)
  })
  // api
  app.use('/api/user', userRouter)
  app.use('/api/content', contentRouter)
  app.use('/api/category', categoryRouter)
  app.use('/api/tag', tagRouter)
  app.use('/api/app', appRouter)
  app.use('/api/message', messageRouter)
  app.use('/api/comment', commentRouter)
  app.use('/api/file', fileRouter)
  app.use('/api/wechat', fileRouter)
  // error
  app.use(handler404)
  app.use(handlerError)
}

export default router
