import log from '../../middleware/log'
import contentManager from '../content/manager'
import commentManager from '../comment/manager'
import categoryManager from '../category/manager'
import tagManager from '../tag/manager'
import { getClientIp, qrHelper } from '../../util/helper'

const limit = 10

const viewListPage = async (req, res) => {
    log('post_controller').info('贴子列表页')
    let currentPage = 1
    try {
        currentPage = parseInt(Number(req.query.p), 10) || 1
    } catch (err) {
        currentPage = 1
    }
    let results = await contentManager.findContents({}, { limit, skip: currentPage })
    let promises = results.map(async (item) => {
        item.html = item.html.replace(/<\/?.+?>/g, '').replace(/\r\n/g, ' ').replace(/\n/g, ' ')
        if (item.html.length > 100) {
            item.html = item.html.substr(0, 100)
            item.html += '...'
        }
        /* eslint-disable */
        item.commentsCount = await commentManager.countCommentByContentId(item._id)
        let category = {}
        if (item.category) {
            try {
                category = (await categoryManager.getCategoryById(item.category))
            } catch (e) {
                category = {}
            }   
        }
        /* eslint-enable */
        return {
            /* eslint-disable */
            _id             : item._id,
            /* eslint-enable */
            createdAt       : item.createdAt,
            hits            : item.hits,
            images          : item.images,
            html            : item.html,
            title           : item.title,
            comments        : item.commentsCount,
            categoryId      : item.category,
            category        : category.name || '',
            categoryPathname: category.pathname || ''
        }
    })
    let posts = await Promise.all(promises)
    const countPage = Math.ceil(await contentManager.countContent() / limit)
    res.renderPage('post-list', { posts, countPage, currentPage })
}
const viewPostPage = async (req, res) => {
    log('post_controller').info('详情页')
    await contentManager.hitContentById(req.params.pid)
    let post = await contentManager.getContentById(req.params.pid)
    let tags = []
    let category = null
    if (post.tag[ 0 ]) {
        tags.push(await tagManager.getTagById(post.tag[ 0 ]))
    }
    if (post.category) {
        category = await categoryManager.getCategoryById(post.category)
    }
    post.categoryId = post.category
    post.category = category.name
    post.categoryPathname = category.pathname || ''
    post.tag = tags
    const ip = getClientIp(req)
    post.clientIp = ip
    post.comments = await commentManager.findCommentsByContentId(req.params.pid)
    post.commentsCount = await commentManager.countCommentByContentId(req.params.pid)
    let contentNear = await contentManager.getContentNear(post.createdAt)
    post.prev = null
    post.next = null
    if (contentNear.prev) {
        post.prev = {
            /* eslint-disable */
            _id  : contentNear.prev._id,
            /* eslint-enable */
            title: contentNear.prev.title
        }
    }
    if (contentNear.next) {
        post.next = {
            /* eslint-disable */
            _id  : contentNear.next._id,
            /* eslint-enable */
            title: contentNear.next.title
        }
    }
    res.renderPage('post', { post })
}
const viewPostSharePage = async (req, res) => {
    let post = await contentManager.getContentById(req.params.pid)
    post.html = post.html.replace(/<\/?.+?>/g, '').replace(/\r\n/g, ' ').replace(/\n/g, ' ')
    if (post.html.length > 100) {
        post.html = post.html.substr(0, 100)
        post.html += '...'
    }
    post.categoryName = (await categoryManager.getCategoryById(post.category)).name || '其他'
    /* eslint-disable */
    post.shareUrl = req.get('host') + '/post/' + post._id
    /* eslint-enable */
    res.renderPage('share', { post })
}
const getQrImage = async (req, res) => {
    const url = req.query.url ? req.query.url : req.get('referrer')
    qrHelper(url, (error, qrImg) => {
        qrImg.pipe(res)
    })
}

export default {
    viewListPage,
    viewPostPage,
    viewPostSharePage,
    getQrImage
}
