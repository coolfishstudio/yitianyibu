import { Router } from 'express'
import messageController from './controller'

const router = new Router()

router.get('/', messageController.viewPage)

export default router
