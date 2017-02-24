import { Router } from 'express'
import postController from './controller'

const router = new Router()

router.get('/', postController.viewListPage)
router.get('/:pid', postController.viewPostPage)

export default router
