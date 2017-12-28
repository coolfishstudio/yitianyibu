import { Router } from 'express'
import fileController from './controller'

const router = new Router()

router.get('/:id([0-9a-f]{24})', fileController.getFileById)
router.post('/', fileController.saveFile)

export default router
