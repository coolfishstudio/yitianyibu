import { Router } from 'express'
import appController from './controller'
import auth from '../../middleware/auth'

const router = new Router()

router.post('/', auth().authenticate(), appController.insert)
router.get('/', appController.findAll)
router.get('/:id([0-9a-f]{24})/record', appController.recordById)

export default router
