import { Router } from 'express'
import log from './middleware/log'

import adminRouter from './lib/admin/router'
import messageRouter from './lib/message/router'
import authRouter from './lib/auth/router'
import authMiddleware from './middleware/auth'


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
// 列表页
router.get('/posts', (req, res) => {
    const applications = [
        { name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' },
        { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' }
    ]
    res.renderPage('post-list', { applications })
})
// 帖子详情页
router.get('/post/:pid', (req, res) => {
    const applications = [
        { name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' },
        { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' }
    ]
    res.renderPage('post', { applications })
})
// 实验室
router.get('/labs', (req, res) => {
    const applications = [
        { name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' },
        { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' },
        { name: '微信摇一摇', title: '微信摇一摇', icon: 'app_02', url: 'http://shake.coolfishstudio.com/', desc: '基于HTML5的运动传感器，模拟摇一摇被触发才执行的事件效果。' },
        { name: '小球称重', title: '小球称重', icon: 'app_03', url: 'http://weigh.coolfishstudio.com/', desc: '基于js实现找出用天秤找出异常小球，并指出它是偏轻还是偏重的游戏案例。' },
        { name: '捕鱼达人', title: '捕鱼达人', icon: 'app_04', url: 'http://fishing.coolfishstudio.com/', desc: '基于canvas的做的仿制捕鱼达人小游戏DEMO。' },
        { name: '卡通飞行', title: '打飞机', icon: 'app_05', url: 'http://flight.coolfishstudio.com/', desc: '使用Egret游戏引擎做的一个打飞机游戏，这是我学习egret所写的第一个小游戏。' }
    ]
    res.renderPage('labs', { applications })
})
// 关于
router.get('/about', (req, res) => {
    res.renderPage('about')
})

// 留言
router.use('/message', messageRouter)

router.get('/admin/login', authMiddleware.auth2Home, (req, res) => {
    log('router').info('访问后台登录页')
    res.renderAdminPage('login', { title: '一天一步网', message: '模版测试' })
})
/* 后台管理 */
router.use('/admin/auth', authRouter)
router.get('/admin/', authMiddleware.notAuth2Login, (req, res) => { res.renderAdminPage('index') })// 基础平台
router.get('/admin/app', authMiddleware.notAuth2Login, (req, res) => { res.renderAdminPage('app') })// 应用管理
router.get('/admin/content', authMiddleware.notAuth2Login, (req, res) => { res.renderAdminPage('content') })// 内容管理
router.get('/admin/category', authMiddleware.notAuth2Login, (req, res) => { res.renderAdminPage('category') })// 类别管理
router.get('/admin/tag', authMiddleware.notAuth2Login, (req, res) => { res.renderAdminPage('tag') })// 标签管理
router.get('/admin/stat', authMiddleware.notAuth2Login, (req, res) => { res.renderAdminPage('stat') })// 统计分析
router.get('/admin/system', authMiddleware.notAuth2Login, (req, res) => { res.renderAdminPage('system') })// 系统管理
router.use('/admin', authMiddleware.notAuth2Login, authMiddleware.notAuth2Login, adminRouter)

export default router
