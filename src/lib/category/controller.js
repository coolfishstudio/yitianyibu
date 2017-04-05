import log from '../../middleware/log'
import categoryManager from './manager'
import contentManager from '../content/manager'

const limit = 10

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
    let desc = req.body.desc || ''

    if (!name || !weight) {
        const err = new Error('参数不足')
        err.status = 400
        return next(err)
    }
    /* eslint-disable */
    let createdByID = req.user._id
    /* eslint-enable */
    const result = await categoryManager.addCategory({ name, weight, createdByID, desc })
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
    let desc = req.body.desc || ''

    if (!name || !weight) {
        const err = new Error('参数不足')
        err.status = 400
        return next(err)
    }
    const result = await categoryManager.updateCategoryById(req.params.categoryId, { name, weight, desc })
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
const viewListPage = async (req, res) => {
    log('category_controller').info('类别集合')
    let results = await categoryManager.findCategorys()

    let promises = results.map(async (item) => {
        /* eslint-disable */
        item.postsCount = await contentManager.countContentByCategory(item._id)
        /* eslint-enable */
        return item
    })
    let result = await Promise.all(promises)

    res.renderPage('categorys', { result })
}
const viewCategoryPage = async (req, res) => {
    log('category_controller').info('类别列表')
    let result = {}
    let currentPage = 1
    try {
        currentPage = parseInt(Number(req.query.p), 10) || 1
    } catch (err) {
        currentPage = 1
    }
    result.info = await categoryManager.getCategoryById(req.params.categoryId)
    let results = await contentManager.findContents({ category: req.params.categoryId }, { limit, skip: currentPage })
    let promises = results.map(async (item) => {
        return {
            /* eslint-disable */
            _id       : item._id,
            wordsCount: item.markdown.length,
            createdAt : item.createdAt,
            title     : item.title
            /* eslint-enable */
        }
    })
    result.list = await Promise.all(promises)
    result.currentPage = currentPage
    result.countPage = Math.ceil(await contentManager.countContentByCategory(req.params.categoryId) / limit)
    res.renderPage('category-list', { result })
}

export default {
    viewAdminCategory,
    viewAdminCreateCategory,
    viewAdminUpdateCategory,
    viewAdminRemoveCategory,
    createCategory,
    updateCategory,
    removeCategory,
    viewListPage,
    viewCategoryPage
}
