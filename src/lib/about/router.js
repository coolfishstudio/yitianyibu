import { Router } from 'express'
import aboutController from './controller'

const router = new Router()

router.get('/', aboutController.viewPage)

export default router
