import log from '../../middleware/log'
import contentManager from '../content/manager'
import categoryManager from '../category/manager'
import tagManager from '../tag/manager'

const viewListPage = async (req, res) => {
    log('post_controller').info('贴子列表页')
    const applications = [
        { name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' },
        { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' },
        { name: '在线编辑器', title: '猿Coding', icon: 'app_06', url: 'http://www.yuancoding.com', desc: '在线编程、交流、学习网站' }
    ]
    let posts = await contentManager.findContents()
    posts = posts.map((item) => {
        item.html = item.html.replace(/<\/?.+?>/g, '').replace(/\r\n/g, ' ').replace(/\n/g, ' ')
        if (item.html.length > 100) {
            item.html = item.html.substr(0, 100)
            item.html += '...'
        }
        return item
    })
    res.renderPage('post-list', { applications, posts })
}
const viewPostPage = async (req, res) => {
    log('post_controller').info('详情页')
    const applications = [
        { name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' },
        { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' },
        { name: '在线编辑器', title: '猿Coding', icon: 'app_06', url: 'http://www.yuancoding.com', desc: '在线编程、交流、学习网站' }
    ]
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
    res.renderPage('post', { applications, post })
}

export default {
    viewListPage,
    viewPostPage
}
