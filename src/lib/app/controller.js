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
        log('app_controller').error(err)
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
const viewAdminUpdateApp = async (req, res) => {
    log('app_controller').info('修改应用')
    const result = await appManager.getAppById(req.params.appId)
    res.renderAdminPage('app/update', { result })
}
const viewAdminRemoveApp = async (req, res) => {
    log('app_controller').info('删除应用')
    const result = await appManager.getAppById(req.params.appId)
    res.renderAdminPage('app/remove', { result })
}

const updateApp = async (req, res, next) => {
    log('app_controller').info('修改应用')
    const title = (req.body.title || '').trim()
    const name = (req.body.name || '').trim()
    const url = (req.body.url || '').trim()
    const desc = (req.body.desc || '').trim()
    const type = (req.body.type || '0').trim()
    // 校验
    let createError = ''
    if (title === '') {
        createError = '标题不能为空'
    } else if (name === '') {
        createError = '名称不能为空'
    } else if (url === '') {
        createError = '链接不能为空'
    }
    // 校验结果
    if (createError) {
        const err = new Error(createError)
        err.status = 400
        return next(err)
    }
    const option = {
        title,
        name,
        url,
        desc,
        type
    }
    const result = await appManager.updateAppById(req.params.appId, option)
    if (!result) {
        const err = new Error('修改失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/app')
}
const removeApp = async (req, res, next) => {
    log('content_controller').info('删除应用')
    const result = await appManager.removeAppById(req.params.appId)
    if (!result) {
        const err = new Error('删除失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/app')
}

export default {
    viewAdminApp,
    viewAdminCreateApp,
    createApp,
    topApp,
    untopApp,
    viewAdminRemoveApp,
    viewAdminUpdateApp,
    updateApp,
    removeApp
}
