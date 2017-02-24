import log from '../../middleware/log'

const viewAdminPage = (req, res) => {
    log('admin_controller').info('管理首页')
    res.renderAdminPage('index')
}

export default {
    viewAdminPage
}
