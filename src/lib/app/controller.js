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

const createApp = (req, res) => {
    fileManager.uploadImage(req, res, (error, fields) => {
        console.log('>>>>', error, fields)
    })
}

export default {
    viewAdminApp,
    viewAdminCreateApp,
    createApp
}
