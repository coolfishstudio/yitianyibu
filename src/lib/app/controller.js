import log from '../../middleware/log'
import appManager from './manager'
import fileManager from '../file/manager'

const viewAdminApp = async (req, res) => {
    log('app_controller').info('应用')
    const result = await appManager.findApps()
    res.renderAdminPage('app/list', { result })
}
const viewAdminCreateApp = async (req, res) => {
    log('app_controller').info('创建应用')
    res.renderAdminPage('app/create')
}

const createApp = async (req, res, next) => {
    try {
        let imageResult = await fileManager.uploadImage(req, res)
        /* eslint-disable */
        imageResult.createdByID = req.user._id
        /* eslint-enable */
        await appManager.addApp(imageResult)
        res.redirect('/admin/app')
    } catch (err) {
        console.error(err)
        return next(err)
    }
}

const topApp = async (req, res) => {
    await appManager.updateAppById(req.params.appId, { isTop: true })
    res.redirect('/admin/app')
}
const untopApp = async (req, res) => {
    await appManager.updateAppById(req.params.appId, { isTop: false })
    res.redirect('/admin/app')
}

export default {
    viewAdminApp,
    viewAdminCreateApp,
    createApp,
    topApp,
    untopApp
}
