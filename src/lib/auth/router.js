import { Router } from 'express'
import authController from './controller'

const router = new Router()

router.post('/signin', authController.signin)
router.get('/signout', authController.signout)

export default router
