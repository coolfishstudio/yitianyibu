import { Router } from 'express'
import log from './middleware/log'

const router = new Router()

router.get('/', (req, res) => {
    log('router').info('访问首页')
    res.renderPage('index', { title: '一天一步网', message: '模版测试' })
})

export default router
