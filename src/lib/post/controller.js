import log from '../../middleware/log'
import contentManager from '../content/manager'
import commentManager from '../comment/manager'
import categoryManager from '../category/manager'
import tagManager from '../tag/manager'
import { getClientIp } from '../../util/helper'

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
        let category = ''
        if (item.category) {
            try {
                category = (await categoryManager.getCategoryById(item.category)).name
            } catch (e) {
                category = '' 
            }   
        }
        /* eslint-enable */
        return {
            /* eslint-disable */
            _id      : item._id,
            /* eslint-enable */
            createdAt: item.createdAt,
            hits     : item.hits,
            images   : item.images,
            html     : item.html,
            title    : item.title,
            comments : item.commentsCount,
            category
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
    res.renderPage('share', { post })
}

export default {
    viewListPage,
    viewPostPage,
    viewPostSharePage
}
