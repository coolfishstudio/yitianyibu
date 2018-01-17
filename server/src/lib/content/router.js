import { Router } from 'express'
import contentController from './controller'
import auth from '../../middleware/auth'

const router = new Router()

router.get('/', contentController.findAll)
router.get('/by/category/:id', contentController.findAllByCategory)
router.get('/:id([0-9a-f]{24})', contentController.getById)
router.post('/', auth().authenticate(), contentController.insert)
router.put('/', auth().authenticate(), contentController.update)

export default router
