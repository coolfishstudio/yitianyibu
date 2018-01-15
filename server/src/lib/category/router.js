import { Router } from 'express'
import categoryController from './controller'
import auth from '../../middleware/auth'

const router = new Router()

router.get('/', categoryController.findAll)
router.post('/', auth().authenticate(), categoryController.insert)

export default router
