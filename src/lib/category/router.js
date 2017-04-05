import { Router } from 'express'
import categoryController from './controller'

const router = new Router()

router.get('/', categoryController.viewListPage)
router.get('/:categoryid', categoryController.viewCategoryPage)

export default router
