import { Router } from 'express'
import appController from './controller'

const router = new Router()

// router.post('/', appController.insert)
router.get('/', appController.findAll)
// router.get('/:id([0-9a-f]{24})', appController.getById)
// router.put('/:id([0-9a-f]{24})', appController.updateById)
// router.delete('/:id([0-9a-f]{24})', appController.removeById)

export default router
