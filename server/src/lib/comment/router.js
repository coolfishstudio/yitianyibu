import { Router } from 'express'

const router = new Router()

router.get('/', (req, res) => {
  res.json({'status':{'code':0,'message':'success'},'data':{}})
})
router.get('/:id', (req, res) => {
  res.json({'status':{'code':0,'message':'success'},'data':{}})
})
router.post('/', (req, res) => {
  res.json({'status':{'code':0,'message':'success'},'data':{}})
})
router.put('/:id', (req, res) => {
  res.json({'status':{'code':0,'message':'success'},'data':{}})
})
router.get('/:id', (req, res) => {
  res.json({'status':{'code':0,'message':'success'},'data':{}})
})

export default router
