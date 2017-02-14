import { Router } from 'express'
import log from './middleware/log'

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
        { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' }
    ]
    res.renderPage('labs', { applications })
})
// 关于
router.get('/about', (req, res) => {
    const applications = [
        { name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' },
        { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' }
    ]
    res.renderPage('about', { applications })
})

router.get('/admin/login', (req, res) => {
    log('router').info('访问后台登录页')
    res.renderAdminPage('login', { title: '一天一步网', message: '模版测试' })
})
/* 后台管理 */
router.get('/admin/', (req, res) => { res.renderAdminPage('index') })// 基础平台
router.get('/admin/app', (req, res) => { res.renderAdminPage('app') })// 应用管理
router.get('/admin/content', (req, res) => { res.renderAdminPage('content') })// 内容管理
router.get('/admin/message', (req, res) => { res.renderAdminPage('message') })// 留言管理
router.get('/admin/category', (req, res) => { res.renderAdminPage('category') })// 类别管理
router.get('/admin/tag', (req, res) => { res.renderAdminPage('tag') })// 标签管理
router.get('/admin/stat', (req, res) => { res.renderAdminPage('stat') })// 统计分析
router.get('/admin/system', (req, res) => { res.renderAdminPage('system') })// 系统管理

export default router
