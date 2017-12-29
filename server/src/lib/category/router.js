import { Router } from 'express'
import categoryController from './controller'

const router = new Router()

router.get('/', categoryController.findAll)

export default router
