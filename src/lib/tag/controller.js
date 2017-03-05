import log from '../../middleware/log'
import tagManager from './manager'

const viewAdminPage = async (req, res) => {
    log('tag_controller').info('标签')
    const result = await tagManager.findTags()
    res.renderAdminPage('tag/list', { result })
}

const viewAdminCreatePage = (req, res) => {
    log('tag_controller').info('创建标签页面')
    res.renderAdminPage('tag/create')
}

const createTag = async (req, res, next) => {
    log('tag_controller').info('创建标签')
    let name = req.body.name || ''
    let weight = req.body.weight || ''

    if (!name || !weight) {
        const err = new Error('参数不足')
        err.status = 400
        return next(err)
    }
    /* eslint-disable */
    let createdByID = req.user._id
    /* eslint-enable */
    const result = await tagManager.addTag({ name, weight, createdByID })
    if (!result) {
        const err = new Error('创建失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/tag')
}

export default {
    viewAdminPage,
    viewAdminCreatePage,
    createTag
}
