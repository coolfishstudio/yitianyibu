import { Router } from 'express'
import log from './middleware/log'

import adminRouter from './lib/admin/router'
import authRouter from './lib/auth/router'

import messageRouter from './lib/message/router'
import aboutRouter from './lib/about/router'
import labsRouter from './lib/labs/router'
import postRouter from './lib/post/router'


const router = new Router()

router.get('/ping', (req, res) => {
    res.end('OK')
})

router.get('/', (req, res) => {
    log('router').info('访问首页')
    const applications = [
        { name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' },
        { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' }
    ]
    res.renderPage('index', { applications })
})

router.use('/post', postRouter) // 帖子详情页、帖子列表页
router.use('/labs', labsRouter) // 实验室
router.use('/about', aboutRouter) // 关于
router.use('/message', messageRouter) // 留言
/* 后台管理 */
router.use('/admin/auth', authRouter)
router.use('/admin', adminRouter)

export default router
