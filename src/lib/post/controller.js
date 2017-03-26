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
    let posts = await contentManager.findContents({}, { limit, skip: currentPage })
    posts = posts.map((item) => {
        item.html = item.html.replace(/<\/?.+?>/g, '').replace(/\r\n/g, ' ').replace(/\n/g, ' ')
        if (item.html.length > 100) {
            item.html = item.html.substr(0, 100)
            item.html += '...'
        }
        return item
    })
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
    post.category = category.name
    post.tag = tags
    const ip = getClientIp(req)
    post.clientIp = ip
    post.comments = await commentManager.findCommentsByContentId(req.params.pid)
    post.commentsCount = await commentManager.countCommentByContentId(req.params.pid)
    res.renderPage('post', { post })
}

export default {
    viewListPage,
    viewPostPage
}
