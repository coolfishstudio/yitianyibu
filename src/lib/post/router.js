import { Router } from 'express'
import postController from './controller'
import commentController from '../comment/controller'

const router = new Router()

router.get('/', postController.viewListPage)
router.get('/:pid', postController.viewPostPage)
router.post('/:pid/comment', commentController.createComment)
router.get('/:pid/share', postController.viewPostSharePage)
router.get('/:pid/qr', postController.getQrImage)

export default router
