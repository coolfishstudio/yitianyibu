import { Router } from 'express'
import statController from './controller'

const router = new Router()

router.get('/', statController.recordStat)

export default router
