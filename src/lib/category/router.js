import { Router } from 'express'
import categoryController from './controller'

const router = new Router()

router.get('/', categoryController.viewListPage)
router.get('/:categoryId', categoryController.viewCategoryPage)

export default router
