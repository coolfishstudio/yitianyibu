import log from '../../middleware/log'
import { md, xss } from '../../util/helper'
import fileManager from '../file/manager'
import categoryManager from '../category/manager'
import tagManager from '../tag/manager'
import contentManager from '../content/manager'

const viewAdminContent = async (req, res) => {
    log('content_controller').info('内容列表')
    const result = await contentManager.findContents()
    res.renderAdminPage('content/list', { result })
}

const viewAdminCreateContent = async (req, res) => {
    log('content_controller').info('创建内容')
    const result = {
        category: await categoryManager.findCategorys(),
        tag     : await tagManager.findTags()
    }
    res.renderAdminPage('content/create', { result })
}
const uploadImage = (req, res, next) => {
    let isFileLimit = false
    req.busboy.on('file', (fieldname, file, filename) => {
        file.on('limit', () => {
            isFileLimit = true
            res.json({
                success: false,
                msg    : 'File size too large. Max is 1Mb'
            })
        })
        fileManager.uploadContentImage(file, { filename }, (err, result) => {
            if (err) {
                return next(err)
            }
            if (isFileLimit) {
                return false
            }
            res.json({
                success: true,
                url    : result.url
            })
        })
    })
    req.pipe(req.busboy)
}
const createContent = async (req, res, next) => {
    const title = (req.body.title || '').trim()
    const content = (req.body.content || '').trim()
    const category = (req.body.category || '').trim()
    const tag = (req.body.tag || '').trim()
    const status = (req.body.status || 'published').trim()
    const featured = !!Number((req.body.featured || '1').trim())
    const time = req.body.time || ''
    // 校验
    let createError = ''
    if (title === '') {
        createError = '标题不能为空'
    } else if (content === '') {
        createError = '内容不能为空'
    }
    // 校验结果
    if (createError) {
        const err = new Error(createError)
        err.status = 400
        return next(err)
    }
    const html = `<div class="markdown-text">${xss.process(md.render(content || ''))}</div>`
    const reg = new RegExp('!\\[.*?\\]\\((.*?)\\)', 'g')
    let images = []
    content.replace(reg, () => {
        images.push(RegExp.$1)
        return RegExp.$1
    })
    const option = {
        title,
        html,
        images,
        markdown: content,
        status,
        featured
    }
    if (tag) {
        option.tag = [ tag ]
    }
    if (category) {
        option.category = category
    }
    if (time) {
        option.createdAt = (new Date(time)).getTime()
    }
    /* eslint-disable */
    let createdByID = req.user._id
    /* eslint-enable */
    option.createdByID = createdByID
    const result = await contentManager.addContent(option)
    if (!result) {
        const err = new Error('创建失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/content')
}
const viewAdminUpdateContent = async (req, res) => {
    log('content_controller').info('修改内容')
    const result = {
        category: await categoryManager.findCategorys(),
        tag     : await tagManager.findTags(),
        content : await contentManager.getContentById(req.params.contentId)
    }
    res.renderAdminPage('content/update', { result })
}

const viewAdminRemoveContent = async (req, res) => {
    log('content_controller').info('删除内容')
    const result = {
        category: await categoryManager.findCategorys(),
        tag     : await tagManager.findTags(),
        content : await contentManager.getContentById(req.params.contentId)
    }
    res.renderAdminPage('content/remove', { result })
}

const updateContent = async (req, res, next) => {
    const title = (req.body.title || '').trim()
    const content = (req.body.content || '').trim()
    const category = (req.body.category || '').trim()
    const tag = (req.body.tag || '').trim()
    const status = (req.body.status || 'published').trim()
    const featured = !!Number((req.body.featured || '1').trim())
    const time = req.body.time || ''
    // 校验
    let createError = ''
    if (title === '') {
        createError = '标题不能为空'
    } else if (content === '') {
        createError = '内容不能为空'
    }
    // 校验结果
    if (createError) {
        const err = new Error(createError)
        err.status = 400
        return next(err)
    }
    const html = `<div class="markdown-text">${xss.process(md.render(content || ''))}</div>`
    const reg = new RegExp('!\\[.*?\\]\\((.*?)\\)', 'g')
    let images = []
    content.replace(reg, () => {
        images.push(RegExp.$1)
        return RegExp.$1
    })
    const option = {
        title,
        html,
        images,
        markdown: content,
        status,
        featured
    }
    if (tag) {
        option.tag = [ tag ]
    }
    if (category) {
        option.category = category
    }
    if (time) {
        option.createdAt = (new Date(time)).getTime()
    }
    const result = await contentManager.updateContentById(req.params.contentId, option)
    if (!result) {
        const err = new Error('修改失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/content')
}
const removeContent = async (req, res, next) => {
    log('content_controller').info('删除内容')
    const result = await contentManager.removeContentById(req.params.contentId)
    if (!result) {
        const err = new Error('删除失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/content')
}

export default {
    viewAdminContent,
    viewAdminCreateContent,
    uploadImage,
    createContent,
    viewAdminUpdateContent,
    updateContent,
    viewAdminRemoveContent,
    removeContent
}
