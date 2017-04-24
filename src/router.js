import { Router } from 'express'

import adminRouter from './lib/admin/router'
import authRouter from './lib/auth/router'

import messageRouter from './lib/message/router'
import aboutRouter from './lib/about/router'
import labsRouter from './lib/labs/router'
import postRouter from './lib/post/router'
import homepageRouter from './lib/homepage/router'
import categoryRouter from './lib/category/router'
import statRouter from './lib/stat/router'

const router = new Router()

router.get('/ping', (req, res) => {
    res.end('OK')
})

router.use(homepageRouter) // 未完成
router.get('/', postRouter)
router.use('/post', postRouter) // 帖子详情页、帖子列表页
router.use('/labs', labsRouter) // 实验室
router.use('/about', aboutRouter) // 关于
router.use('/message', messageRouter) // 留言
router.use('/category', categoryRouter) // 分类
router.use('/stat', statRouter) // 分类
/* 后台管理 */
router.use('/admin/auth', authRouter)
router.use('/admin', adminRouter)

export default router
