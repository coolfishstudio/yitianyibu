import log from '../../middleware/log'
import tagManager from './manager'

const viewAdminTag = async (req, res) => {
    log('tag_controller').info('标签')
    const result = await tagManager.findTags()
    res.renderAdminPage('tag/list', { result })
}

const viewAdminCreateTag = (req, res) => {
    log('tag_controller').info('创建标签页面')
    res.renderAdminPage('tag/create')
}

const viewAdminUpdateTag = async (req, res) => {
    log('tag_controller').info('修改标签页面')
    const result = await tagManager.getTagById(req.params.tagId)
    res.renderAdminPage('tag/update', { result })
}

const viewAdminRemoveTag = async (req, res) => {
    log('tag_controller').info('删除标签页面')
    const result = await tagManager.getTagById(req.params.tagId)
    res.renderAdminPage('tag/remove', { result })
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

const updateTag = async (req, res, next) => {
    log('tag_controller').info('修改标签')
    let name = req.body.name || ''
    let weight = req.body.weight || ''

    if (!name || !weight) {
        const err = new Error('参数不足')
        err.status = 400
        return next(err)
    }
    const result = await tagManager.updateTagById(req.params.tagId, { name, weight })
    if (!result) {
        const err = new Error('修改失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/tag')
}

const removeTag = async (req, res, next) => {
    log('tag_controller').info('删除标签')
    const result = await tagManager.removeTagById(req.params.tagId)
    if (!result) {
        const err = new Error('删除失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/tag')
}

export default {
    viewAdminTag,
    viewAdminCreateTag,
    createTag,
    viewAdminUpdateTag,
    updateTag,
    viewAdminRemoveTag,
    removeTag
}
