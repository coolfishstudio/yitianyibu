import { Router } from 'express'
import log from './middleware/log'

const router = new Router()

router.get('/ping', (req, res) => {
    res.end('OK')
})

router.get('/', (req, res) => {
    log('router').info('访问首页')
    const applications = [
        { name: 'ANIMATE.CSS', icon: 'animate', url: 'http://animate.coolfishstudio.com' },
        { name: 'SNOW.JS', icon: 'snow', url: 'http://snow.coolfishstudio.com' }
    ]
    res.renderPage('index', { applications })
})
// 帖子详情页
router.get('/post/:pid', (req, res) => {
    const applications = [
        { name: 'ANIMATE.CSS', icon: 'animate', url: 'http://animate.coolfishstudio.com' },
        { name: 'SNOW.JS', icon: 'snow', url: 'http://snow.coolfishstudio.com' }
    ]
    res.renderPage('post', { applications })
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
