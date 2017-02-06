import { Router } from 'express'
import log from './middleware/log'

const router = new Router()

router.get('/ping', (req, res) => {
    res.end('OK')
})

router.get('/', (req, res) => {
    log('router').info('访问首页')
    res.renderPage('index', { title: '一天一步网', message: '模版测试' })
})

router.get('/admin/login', (req, res) => {
    log('router').info('访问后台登录页')
    res.renderAdminPage('login', { title: '一天一步网', message: '模版测试' })
})

router.get('/admin/', (req, res) => {
    log('router').info('访问后台首页')
    res.renderAdminPage('index', { title: '一天一步网', message: '模版测试' })
})

export default router
