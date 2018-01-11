import { Router } from 'express'
import messageController from './controller'
import auth from '../../middleware/auth'

const router = new Router()

router.post('/', messageController.insert)
router.get('/', messageController.findAll)
router.delete('/:id([0-9a-f]{24})', auth().authenticate(), messageController.removeById)

export default router
