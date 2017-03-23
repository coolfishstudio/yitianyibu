import { Router } from 'express'
import homepageController from './controller'

const router = new Router()

router.get('/unfinished', homepageController.viewUnfinishedPage)

export default router
