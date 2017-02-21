import { Router } from 'express'
import messageController from '../message/controller'

const router = new Router()

router.get('/message', messageController.viewAdminPage)

export default router
