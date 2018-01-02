import { Router } from 'express'
import contentController from './controller'

const router = new Router()

router.get('/', contentController.findAll)
router.get('/by/category/:id', contentController.findAllByCategory)
router.get('/:id([0-9a-f]{24})', contentController.getById)
// router.post('/', (req, res) => {
//   res.json({'status':{'code':0,'message':'success'},'data':{}})
// })
// router.put('/:id', (req, res) => {
//   res.json({'status':{'code':0,'message':'success'},'data':{}})
// })
// router.get('/:id', (req, res) => {
//   res.json({'status':{'code':0,'message':'success'},'data':{}})
// })

export default router
