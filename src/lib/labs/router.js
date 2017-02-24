import { Router } from 'express'
import labsController from './controller'

const router = new Router()

router.get('/', labsController.viewPage)

export default router
