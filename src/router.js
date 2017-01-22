import { Router } from 'express'

const router = new Router()

router.get('/', (req, res) => {
    res.renderPage('index', { title: '一天一步网', message: '模版测试' })
})

export default router
