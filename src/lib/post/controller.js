import log from '../../middleware/log'

const viewListPage = (req, res) => {
    log('post_controller').info('列表页')
    const applications = [
        { name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' },
        { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' },
        { name: '在线编辑器', title: '猿Coding', icon: 'app_06', url: 'http://www.yuancoding.com', desc: '在线编程、交流、学习网站' }
    ]
    res.renderPage('post-list', { applications })
}
const viewPostPage = (req, res) => {
    log('post_controller').info('详情页')
    const applications = [
        { name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' },
        { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' },
        { name: '在线编辑器', title: '猿Coding', icon: 'app_06', url: 'http://www.yuancoding.com', desc: '在线编程、交流、学习网站' }
    ]
    res.renderPage('post', { applications })
}

export default {
    viewListPage,
    viewPostPage
}
