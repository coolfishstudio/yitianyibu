import { Router } from 'express'
import postController from './controller'
import commentController from '../comment/controller'

const router = new Router()

router.get('/', postController.viewListPage)
router.get('/:pid', postController.viewPostPage)
router.post('/:pid/comment', commentController.createComment)

export default router
