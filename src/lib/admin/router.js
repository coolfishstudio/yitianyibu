import { Router } from 'express'

import authController from '../auth/controller'
import appController from '../app/controller'
import categoryController from '../category/controller'
import commentController from '../comment/controller'
import contentController from '../content/controller'
import messageController from '../message/controller'
import settingController from '../setting/controller'
import statController from '../stat/controller'
import tagController from '../tag/controller'
import adminController from './controller'
import authMiddleware from '../../middleware/auth'

const router = new Router()

router.get('/login', authMiddleware.auth2Home, authController.viewAdminLogin)
router.get('/app', authMiddleware.notAuth2Login, appController.viewAdminPage)
router.get('/category', authMiddleware.notAuth2Login, categoryController.viewAdminPage)
router.get('/comment', authMiddleware.notAuth2Login, commentController.viewAdminPage)
router.get('/content', authMiddleware.notAuth2Login, contentController.viewAdminPage)
router.get('/message', authMiddleware.notAuth2Login, messageController.viewAdminPage)
router.get('/setting', authMiddleware.notAuth2Login, settingController.viewAdminPage)
router.get('/stat', authMiddleware.notAuth2Login, statController.viewAdminPage)

router.get('/tag', authMiddleware.notAuth2Login, tagController.viewAdminTag)
router.get('/tag/create', authMiddleware.notAuth2Login, tagController.viewAdminCreateTag)
router.post('/tag/create', authMiddleware.notAuth2Login, tagController.createTag)
router.get('/tag/:tagId/update', authMiddleware.notAuth2Login, tagController.viewAdminUpdateTag)
router.post('/tag/:tagId/update', authMiddleware.notAuth2Login, tagController.updateTag)
router.get('/tag/:tagId/remove', authMiddleware.notAuth2Login, tagController.viewAdminRemoveTag)
router.post('/tag/:tagId/remove', authMiddleware.notAuth2Login, tagController.removeTag)

router.get('/', authMiddleware.notAuth2Login, adminController.viewAdminPage)

export default router
