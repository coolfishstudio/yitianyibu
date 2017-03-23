import log from '../../middleware/log'
import contentManager from '../content/manager'
import categoryManager from '../category/manager'
import tagManager from '../tag/manager'

const viewListPage = async (req, res) => {
    log('post_controller').info('贴子列表页')
    let posts = await contentManager.findContents()
    posts = posts.map((item) => {
        item.html = item.html.replace(/<\/?.+?>/g, '').replace(/\r\n/g, ' ').replace(/\n/g, ' ')
        if (item.html.length > 100) {
            item.html = item.html.substr(0, 100)
            item.html += '...'
        }
        return item
    })
    res.renderPage('post-list', { posts })
}
const viewPostPage = async (req, res) => {
    log('post_controller').info('详情页')
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
    res.renderPage('post', { post })
}

export default {
    viewListPage,
    viewPostPage
}
