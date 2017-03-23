import log from '../../middleware/log'
import settingManager from './manager'

const viewAdminSetting = async (req, res) => {
    log('setting_controller').info('设置')
    const result = await settingManager.getSetting()
    res.renderAdminPage('setting/index', { result })
}

const viewAdminUpdateSetting = async (req, res) => {
    log('setting_controller').info('修改设置')
    const result = await settingManager.getSetting()
    res.renderAdminPage('setting/update', { result })
}

const updateSetting = async (req, res, next) => {
    log('setting_controller').info('修改配置')
    let slogan = req.body.slogan || ''
    if (slogan === '') {
        slogan = []
    } else {
        slogan = slogan.split('｜')
    }
    const result = await settingManager.updateSetting({ slogan })
    if (!result) {
        const err = new Error('修改失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/setting')
}

const initSetting = async () => {
    log('setting_controller').info('检测配置')
    let result = await settingManager.getSetting()
    if (!result) {
        log('setting_controller').info('初始化配置')
        result = await settingManager.addSetting()
    }
    return result
}

const createSetting = async (req, res) => {
    log('setting_controller').info('创建配置')
    await initSetting()
    res.redirect('/admin/setting')
}

export default {
    viewAdminSetting,
    viewAdminUpdateSetting,
    updateSetting,
    initSetting,
    createSetting
}
