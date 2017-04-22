import log from '../../middleware/log'

const viewAdminPage = (req, res) => {
    log('stat_controller').info('统计')
    res.renderAdminPage('stat')
}

// 获取某人今天第几次访问
// 获取某人一共访问几次
// 获取今天的pv
// 获取今天的uv
// 获取所有的pv
// 获取所有的uv

export default {
    viewAdminPage
}
