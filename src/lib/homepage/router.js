import { Router } from 'express'
import homepageController from './controller'
import postController from '../post/controller'

const router = new Router()

router.get('/unfinished', homepageController.viewUnfinishedPage)
router.get('/search', postController.searchKeywords)

export default router
