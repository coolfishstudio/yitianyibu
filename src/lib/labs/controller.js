import log from '../../middleware/log'

const viewPage = (req, res) => {
    log('labs_controller').info('实验室')
    const applications = [
        { name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' },
        { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' },
        { name: '微信摇一摇', title: '微信摇一摇', icon: 'app_02', url: 'http://shake.coolfishstudio.com/', desc: '基于HTML5的运动传感器，模拟摇一摇被触发才执行的事件效果。' },
        { name: '小球称重', title: '小球称重', icon: 'app_03', url: 'http://weigh.coolfishstudio.com/', desc: '基于js实现找出用天秤找出异常小球，并指出它是偏轻还是偏重的游戏案例。' },
        { name: '捕鱼达人', title: '捕鱼达人', icon: 'app_04', url: 'http://fishing.coolfishstudio.com/', desc: '基于canvas的做的仿制捕鱼达人小游戏DEMO。' },
        { name: '卡通飞行', title: '打飞机', icon: 'app_05', url: 'http://flight.coolfishstudio.com/', desc: '使用Egret游戏引擎做的一个打飞机游戏，这是我学习egret所写的第一个小游戏。' },
        { name: '在线编辑器', title: '猿Coding', icon: 'app_06', url: 'http://www.yuancoding.com', desc: '在线编程、交流、学习网站' }
    ]
    res.renderPage('labs', { applications })
}

export default {
    viewPage
}
