import log from '../../middleware/log'

const viewAdminPage = (req, res) => {
    log('setting_controller').info('设置')
    res.renderAdminPage('setting')
}

export default {
    viewAdminPage
}
