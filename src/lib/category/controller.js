import log from '../../middleware/log'
import categoryManager from './manager'

const viewAdminCategory = async (req, res) => {
    log('category_controller').info('类别')
    const result = await categoryManager.findCategorys()
    res.renderAdminPage('category/list', { result })
}

const viewAdminCreateCategory = (req, res) => {
    log('category_controller').info('创建类别页面')
    res.renderAdminPage('category/create')
}
const viewAdminUpdateCategory = async (req, res) => {
    log('category_controller').info('修改类别页面')
    const result = await categoryManager.getCategoryById(req.params.categoryId)
    res.renderAdminPage('category/update', { result })
}
const viewAdminRemoveCategory = async (req, res) => {
    log('category_controller').info('删除类别页面')
    const result = await categoryManager.getCategoryById(req.params.categoryId)
    res.renderAdminPage('category/remove', { result })
}
const createCategory = async (req, res, next) => {
    log('category_controller').info('创建类别')
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
    const result = await categoryManager.addCategory({ name, weight, createdByID })
    if (!result) {
        const err = new Error('创建失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/category')
}
const updateCategory = async (req, res, next) => {
    log('category_controller').info('修改类别')
    let name = req.body.name || ''
    let weight = req.body.weight || ''

    if (!name || !weight) {
        const err = new Error('参数不足')
        err.status = 400
        return next(err)
    }
    const result = await categoryManager.updateCategoryById(req.params.categoryId, { name, weight })
    if (!result) {
        const err = new Error('修改失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/category')
}
const removeCategory = async (req, res, next) => {
    log('category_controller').info('删除类别')
    const result = await categoryManager.removeCategoryById(req.params.categoryId)
    if (!result) {
        const err = new Error('删除失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/category')
}

export default {
    viewAdminCategory,
    viewAdminCreateCategory,
    viewAdminUpdateCategory,
    viewAdminRemoveCategory,
    createCategory,
    updateCategory,
    removeCategory
}
